import { Database } from "../Schema";
import {
  BooleanLiteral,
  Expression,
  InsertStatement,
  NullLiteral,
  NumericLiteral,
  StringLiteral,
  FieldSpecifier,
  Identifier,
  VariableExpression,
} from "../AST";

export type ValidateInsertStatement<
  DB extends Database,
  Node extends InsertStatement
> = Node extends InsertStatement<
  infer TableName,
  infer Fields,
  infer Values,
  infer ReturningFields
>
  ? true extends ValidateFields<DB, Node> &
      ValidateValues<DB, Node> &
      ValidateReturningFields<DB, Node>
    ? true
    : false
  : false;

export type ValidateFields<
  DB extends Database,
  Node extends InsertStatement
> = Node extends InsertStatement<
  infer TableName,
  infer Fields,
  infer Values,
  infer ReturningFields
>
  ? TableName extends keyof DB["schema"]
    ? Fields extends Array<keyof DB["schema"][TableName]>
      ? true
      : false
    : false
  : false;

type _GetFieldTypes<
  DB extends Database,
  Node extends InsertStatement
> = Node extends InsertStatement<
  infer TableName,
  infer Fields,
  infer Values,
  infer ReturningFields
>
  ? TableName extends keyof DB["schema"]
    ? {
        [K in keyof Fields]: Fields[K] extends keyof DB["schema"][TableName]
          ? DB["schema"][TableName][Fields[K]]
          : never;
      }
    : never
  : never;

type _CheckFieldsMatch<
  FieldTypes extends any[],
  Values extends Expression[],
  List extends boolean[] = []
> = FieldTypes extends [infer Head, ...infer Tail]
  ? Values extends [infer _Head, ...infer _Tail]
    ? _Tail extends Expression[]
      ? _Head extends NullLiteral
        ? Head extends null
          ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
          : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
        : _Head extends BooleanLiteral<infer _Bool>
        ? Head extends _Bool
          ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
          : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
        : _Head extends StringLiteral<infer _Str>
        ? _Str extends Head
          ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
          : _Str extends `${infer YYYY}-${infer MM}-${infer DD} ${infer HH}:${infer mm}:${infer ss}`
          ? Head extends Date
            ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
            : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
          : _Str extends `${infer YYYY}-${infer MM}-${infer DD}`
          ? Head extends Date
            ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
            : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
          : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
        : _Head extends NumericLiteral
        ? Head extends number
          ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
          : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
        : _Head extends VariableExpression
        ? _CheckFieldsMatch<Tail, _Tail, [...List, true]>
        : _CheckFieldsMatch<Tail, _Tail, [...List, false]>
      : false
    : false
  : Values extends [infer _Head, ...infer _Tail] // check if there's any remaining item in Values
  ? false
  : List extends true[]
  ? true
  : false;

export type ValidateValues<
  DB extends Database,
  Node extends InsertStatement,
  FieldTypes = _GetFieldTypes<DB, Node>
> = Node extends InsertStatement<
  infer TableName,
  infer Fields,
  infer Values,
  infer ReturningFields
>
  ? FieldTypes extends any[]
    ? {
        [K in keyof Values]: Values[K] extends Expression[]
          ? _CheckFieldsMatch<FieldTypes, Values[K]>
          : false;
      } extends true[]
      ? true
      : false
    : false
  : false;

export type ValidateReturningFields<
  DB extends Database,
  Node extends InsertStatement
> = Node extends InsertStatement<
  infer TableName,
  infer Fields,
  infer Values,
  infer ReturningFields
>
  ? ReturningFields extends [FieldSpecifier<Identifier<"*">, Identifier<"*">>]
    ? true
    : TableName extends keyof DB["schema"]
    ? {
        [K in keyof ReturningFields]: ReturningFields[K] extends FieldSpecifier<
          infer Source,
          Identifier<infer Alias>
        >
          ? Source extends Identifier<infer Name>
            ? Name extends keyof DB["schema"][TableName]
              ? true
              : false
            : false
          : false;
      } extends true[]
      ? true
      : false
    : false
  : false;
