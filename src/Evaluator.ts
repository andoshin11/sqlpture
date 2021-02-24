import {
  AssignmentExpression,
  BinaryExpression,
  BooleanLiteral,
  DeleteStatement,
  FieldSpecifier,
  Identifier,
  InnerJoinSpecifier,
  InsertStatement,
  JoinSpecifier,
  LogicalExpression,
  MemberExpression,
  NullLiteral,
  NumericLiteral,
  SelectStatement,
  Statement,
  StringLiteral,
  TableSpecifier,
  UpdateStatement,
} from "./AST";
import { Database, JoinedSchema } from "./Schema";
import { MatchStringLike, Merge, UnionToIntersection, AssembleEntries, ToJoinedSchema } from "./Utils";

type EvaluateStatement<
  DB extends Database,
  Node extends Statement
> = Node extends SelectStatement ? EvaluateSelectStatement<DB, Node> : never;

// TBD
// type EvaluateStatement<
//   DB extends Database,
//   Node extends Statement
// > = Node extends SelectStatement
//   ? EvaluateSelectStatement<DB, Node>
//   : Node extends InsertStatement
//   ? EvaluateInsertStatement<DB, Node>
//   : Node extends UpdateStatement
//   ? EvaluateUpdateStatement<DB, Node>
//   : Node extends DeleteStatement
//   ? EvaluateDeleteStatement<DB, Node>
//   : never;

type EvaluateInsertStatement<
  DB extends Database,
  Node extends InsertStatement
> = Node extends InsertStatement<infer TableName, infer Assignments>
  ? {
      [K in keyof DB]: K extends TableName
        ? InsertRow<
            TableName extends keyof DB["schema"]
              ? DB["schema"][TableName]
              : never,
            Assignments
          >
        : DB[K];
    }
  : never;

type InsertRow<
  Table extends readonly any[],
  Assignments extends readonly AssignmentExpression[]
> = [
  Merge<
    UnionToIntersection<
      AllReadonly<AssembleEntries<ApplyAssignments<Assignments>>>
    >
  >,
  ...Table
];

type AllReadonly<T> = { readonly [K in keyof T]: T[K] };

type EvaluateUpdateStatement<
  DB extends Database,
  Node extends UpdateStatement
> = Node extends UpdateStatement<
  infer TableName,
  infer Assignments,
  infer Where
>
  ? {
      [K in keyof DB]: K extends TableName
        ? UpdateRows<
            TableName extends keyof DB ? DB[TableName] : never,
            Assignments,
            Where
          >
        : DB[K];
    }
  : never;

type UpdateRows<
  Table,
  Assignments extends readonly AssignmentExpression[],
  Where
> = {
  [Index in keyof Table]: EvaluateExpression<Table[Index], Where> extends true
    ? UpdateRow<Table[Index], Assignments>
    : Table[Index];
};

type UpdateRow<
  Row,
  Assignments extends readonly AssignmentExpression[]
> = MergeValues<Row, AssembleEntries<ApplyAssignments<Assignments>>>;

type MergeValues<T, U> = Merge<
  { [K in keyof T]: K extends keyof U ? U[K] : T[K] }
>;

type ApplyAssignments<Assignments extends readonly AssignmentExpression[]> = {
  [K in keyof Assignments]: Assignments[K] extends AssignmentExpression<
    Identifier<infer Key>,
    infer Value
  >
    ? [
        Key,
        NullLiteral extends Value ? null : Exclude<ExtractValue<Value>, null>
      ]
    : never;
};

type ExtractValue<T> = T extends NullLiteral
  ? null
  : T extends BooleanLiteral<infer Value>
  ? Value
  : T extends NumericLiteral<infer Value>
  ? Value
  : T extends StringLiteral<infer Value>
  ? Value
  : never;

type EvaluateDeleteStatement<
  DB extends Database,
  Node extends DeleteStatement
> = Node extends DeleteStatement<infer TableName, infer Where>
  ? {
      [K in keyof DB]: K extends TableName
        ? DeleteRows<TableName extends keyof DB ? DB[TableName] : never, Where>
        : DB[K];
    }
  : never;

type DeleteRows<Table, Where> = FilterUndefined<
  {
    [Index in keyof Table]: EvaluateExpression<Table[Index], Where> extends true
      ? undefined
      : Table[Index];
  }
>;

export type EvaluateSelectStatement<
  DB extends Database,
  Node extends SelectStatement
> = Node extends SelectStatement<infer Fields, infer From, infer Joins>
  ? From extends TableSpecifier<
      Identifier<infer Source>,
      Identifier<infer Alias>
    >
    ? Source extends keyof DB["schema"]
      ? Fields extends [FieldSpecifier<Identifier<"*">, Identifier<"*">>]
        ? Array<ToJoinedSchema<DB, From, Joins>['public']>
        : Array<ExtractFields<ToJoinedSchema<DB, From, Joins>, Fields>>
      : never
    : never
  : never;

export type ExtractFieldAlias<Field> = Field extends FieldSpecifier<Identifier<any>, Identifier<infer Alias>>
 ? Alias
 : never;

export type FilterUndefined<T> = T extends Readonly<[infer Head, ...infer Tail]>
  ? Head extends undefined
    ? FilterUndefined<Tail>
    : [Head, ...FilterUndefined<Tail>]
  : [];

export type ExtractFields<
  Schema extends JoinedSchema<any>,
  Fields extends FieldSpecifier<any>[]
> = AssembleEntries<{
  [K in keyof Fields]: Fields[K] extends FieldSpecifier<infer Source, Identifier<infer Alias>>
    ? Source extends Identifier<infer Name>
      ? Name extends keyof Schema['public']
        ? [ExtractFieldAlias<Fields[K]>, Schema['public'][Name]]
        : never
      : Source extends MemberExpression<infer O, infer P>
        ? O extends keyof Schema['joins']
          ? P extends keyof Schema['joins'][O]
            ? [Alias, Schema['joins'][O][P]]
            : never
          : O extends Schema['from']['alias']
            ? P extends keyof Schema['from']['schema']
              ? [Alias, Schema['from']['schema'][P]]
              : never
            : never
        : never
    : never
}>

type EvaluateExpression<Row, Exp> =
  | EvaluateLogicalExpression<Row, Exp>
  | EvaluateBinaryExpression<Row, Exp>
  | EvaluateMemberExpression<Row, Exp>
  | EvaluateIdentifier<Row, Exp>
  | EvaluateNullLiteral<Row, Exp>
  | EvaluateBooleanLiteral<Row, Exp>
  | EvaluateNumericLiteral<Row, Exp>
  | EvaluateStringLiteral<Row, Exp>;

type EvaluateBinaryExpression<Row, Exp> = Exp extends BinaryExpression<
  infer Left,
  infer Op,
  infer Right
>
  ? Op extends "="
    ? EvaluateBinaryEquals<
        EvaluateExpression<Row, Left>,
        EvaluateExpression<Row, Right>
      >
    : Op extends "!="
    ? EvaluateBinaryNotEquals<
        EvaluateExpression<Row, Left>,
        EvaluateExpression<Row, Right>
      >
    : Op extends "LIKE"
    ? EvaluateBinaryLike<
        EvaluateExpression<Row, Left>,
        EvaluateExpression<Row, Right>
      >
    : never
  : never;

type EvaluateBinaryEquals<Left, Right> = Left extends Right
  ? Right extends Left
    ? true
    : false
  : false;

type EvaluateBinaryNotEquals<Left, Right> = EvaluateBinaryEquals<
  Left,
  Right
> extends true
  ? false
  : true;

type EvaluateBinaryLike<Left, Right> = MatchStringLike<Left, Right>;

type EvaluateLogicalExpression<Row, Exp> = Exp extends LogicalExpression<
  infer Left,
  infer Op,
  infer Right
>
  ? Op extends "AND"
    ? EvaluateLogicalAND<
        EvaluateExpression<Row, Left>,
        EvaluateExpression<Row, Right>
      >
    : Op extends "OR"
    ? EvaluateLogicalOR<
        EvaluateExpression<Row, Left>,
        EvaluateExpression<Row, Right>
      >
    : never
  : never;

type EvaluateLogicalAND<Left, Right> = Left extends true
  ? Right extends true
    ? true
    : false
  : false;

type EvaluateLogicalOR<Left, Right> = Left extends true
  ? true
  : Right extends true
  ? true
  : false;

type EvaluateMemberExpression<Row, Exp> = Exp extends MemberExpression<
  infer O,
  infer P
>
  ? O extends keyof Row
    ? EvaluateIdentifier<Row[O], Identifier<P>>
    : never
  : never;

type EvaluateIdentifier<Row, Exp> = Exp extends Identifier<infer Name>
  ? Name extends keyof Row
    ? Row[Name]
    : never
  : never;

export type EvaluateNullLiteral<Row, Exp> = Exp extends NullLiteral
  ? null
  : never;

export type EvaluateBooleanLiteral<Row, Exp> = Exp extends BooleanLiteral<
  infer Value
>
  ? Value
  : never;

export type EvaluateStringLiteral<Row, Exp> = Exp extends StringLiteral<
  infer Value
>
  ? Value
  : never;

export type EvaluateNumericLiteral<Row, Exp> = Exp extends NumericLiteral<
  infer Value
>
  ? Value
  : never;

export type Evaluate<
  DB extends Database,
  S extends Statement
> = EvaluateStatement<DB, S>;
