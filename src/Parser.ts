import {
  BinaryOperator,
  BinaryExpression,
  BooleanLiteral,
  Identifier,
  LogicalOperator,
  LogicalExpression,
  NullLiteral,
  NumericLiteral,
  StringLiteral,
  Expression,
  UpdateStatement,
  AssignmentExpression,
  InsertStatement,
  DeleteStatement,
  MemberExpression,
} from "./AST";
import { IntegerStrings, Trim } from "./Utils";
import { ParseSelectStatement } from "./parser/select";

export type Parse<T> = ParseStatement<T> extends [infer Statement, infer Rest]
  ? Trim<Rest> extends ";"
    ? Statement
    : Trim<Rest> extends ""
    ? Statement
    : never
  : never;

type ParseStatement<T> =
  | ParseSelectStatement<T>
  | ParseInsertStatement<T>
  | ParseUpdateStatement<T>
  | ParseDeleteStatement<T>;

type ParseInsertStatement<
  T
> = T extends `INSERT INTO ${infer TableName} SET ${infer Fields}`
  ? [InsertStatement<TableName, ParseAssignmentExpressionList<Fields>>, ""]
  : never;

type ParseUpdateStatement<
  T
> = T extends `UPDATE ${infer TableName} SET ${infer Fields} WHERE ${infer Where}`
  ? ParseExpression<Where> extends [infer Exp, string]
    ? Exp extends Expression
      ? [
          UpdateStatement<
            TableName,
            ParseAssignmentExpressionList<Fields>,
            Exp
          >,
          ""
        ]
      : never
    : never
  : T extends `UPDATE ${infer TableName} SET ${infer Fields}`
  ? [
      UpdateStatement<
        TableName,
        ParseAssignmentExpressionList<Fields>,
        BooleanLiteral<true>
      >,
      ""
    ]
  : never;

type ParseDeleteStatement<
  T
> = T extends `DELETE FROM ${infer TableName} WHERE ${infer Where}`
  ? ParseExpression<Where> extends [infer Exp, string]
    ? Exp extends Expression
      ? [DeleteStatement<TableName, Exp>, ""]
      : never
    : never
  : T extends `DELETE FROM ${infer TableName}`
  ? [DeleteStatement<TableName, BooleanLiteral<true>>, ""]
  : never;

type ParseIdentifier<T> = T extends ""
  ? never
  : Tokenize<T> extends [infer Head, infer Tail]
  ? Head extends ""
    ? never
    : Head extends "null"
    ? [NullLiteral, Tail]
    : Head extends "true"
    ? [BooleanLiteral<true>, Tail]
    : Head extends "false"
    ? [BooleanLiteral<false>, Tail]
    : Head extends keyof IntegerStrings
    ? [NumericLiteral<IntegerStrings[Head] & number>, Tail]
    : [Identifier<Head & string>, Tail]
  : [Identifier<T & string>, ""];

type ParseMemberExpression<T> = Tokenize<T> extends [
  `${infer O}.${infer P}`,
  infer Tail
]
  ? [MemberExpression<O, P>, Tail]
  : ParseIdentifier<T>;

type ParseStringLiteral<T> = T extends `"${infer Value}"${infer Rest}`
  ? [StringLiteral<Value>, Rest]
  : T extends `'${infer Value}'${infer Rest}`
  ? [StringLiteral<Value>, Rest]
  : ParseMemberExpression<T>;

type ParseCallExpression<T> = Trim<T> extends ""
  ? never
  : ParseStringLiteral<Trim<T>> | ParseParenthesizedExpression<T>;

type ParseBinaryExpression<T> = ParseCallExpression<T> extends [
  infer Left,
  infer R1
]
  ? Left extends Expression
    ? Tokenize<R1> extends [infer Op, infer R2]
      ? Op extends BinaryOperator
        ? ParseCallExpression<R2> extends [infer Right, infer R3]
          ? Right extends Expression
            ? [BinaryExpression<Left, Op, Right>, R3]
            : never
          : never
        : [Left, R1]
      : [Left, R1]
    : never
  : never;

type ParseLogicalExpression<T> = ParseBinaryExpression<T> extends [
  infer Left,
  infer R1
]
  ? Tokenize<R1> extends [infer Op, infer R2]
    ? Op extends LogicalOperator
      ? ParseExpression<R2> extends [infer Right, infer R3]
        ? Left extends Expression
          ? Right extends Expression
            ? [LogicalExpression<Left, Op, Right>, R3]
            : never
          : never
        : never
      : [Left, R1]
    : [Left, R1]
  : never;

type ParseExpression<T> = Trim<T> extends ""
  ? never
  : ParseLogicalExpression<Trim<T>> | ParseParenthesizedExpression<T>;

type ParseParenthesizedExpression<
  T
> = T extends `(${infer Content})${infer Rest}`
  ? [ParseExpression<Content>, Rest]
  : never;

type ParseAssignmentExpressionList<T> = T extends `${infer Head},${infer Tail}`
  ? [
      ParseAssignmentExpression<Trim<Head>>,
      ...ParseAssignmentExpressionList<Trim<Tail>>
    ]
  : T extends `${infer Head} = ${infer Value} ${infer Tail}`
  ? [
      AssignmentExpression<
        Identifier<Trim<Head>>,
        ParseExpression<Trim<Value>>[0] & Expression
      >,
      Tail
    ]
  : T extends `${infer Head} = ${infer Value}`
  ? [
      AssignmentExpression<
        Identifier<Trim<Head>>,
        ParseExpression<Trim<Value>>[0] & Expression
      >
    ]
  : T extends `${infer Head} ${infer Tail}`
  ? [ParseAssignmentExpression<Trim<Head>>, Tail]
  : [ParseAssignmentExpression<Trim<T>>];

type ParseAssignmentExpression<T> = T extends `${infer Key} = ${infer Value}`
  ? AssignmentExpression<
      Identifier<Key>,
      ParseExpression<Value>[0] & Expression
    >
  : never;

type Tokenize<T> = Trim<T> extends `${infer Head} ${infer Tail}`
  ? [Head, Tail]
  : Trim<T> extends `${infer Head},${infer Tail}`
  ? [Head, Tail]
  : Trim<T> extends `${infer Head}(${infer Tail}`
  ? [Head, Tail]
  : Trim<T> extends `${infer Head})${infer Tail}`
  ? [Head, Tail]
  : Trim<T> extends `${infer Head};${infer Tail}`
  ? [Head, Tail]
  : Trim<T> extends `${infer Head})`
  ? [Head, ")"]
  : Trim<T> extends `${infer Head};`
  ? [Head, ";"]
  : [Trim<T>, ""];
