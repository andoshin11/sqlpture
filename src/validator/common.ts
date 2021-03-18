import { Database } from "../Schema";
import {
  BinaryExpression,
  BinaryOperator,
  Expression,
  Identifier,
  NullLiteral,
  Statement,
  UpdateStatement,
  VariableExpression,
  BooleanLiteral,
  StringLiteral,
  NumericLiteral,
  LogicalExpression,
  LogicalOperator,
} from "../AST";

export type _CheckFieldType<
  FieldType,
  Value extends Expression
> = Value extends NullLiteral
  ? FieldType extends null
    ? true
    : false
  : Value extends BooleanLiteral<infer _Bool>
  ? _Bool extends FieldType
    ? true
    : false
  : Value extends StringLiteral<infer _Str>
  ? _Str extends FieldType
    ? true
    : _Str extends `${infer YYYY}-${infer MM}-${infer DD} ${infer HH}:${infer mm}:${infer ss}`
    ? FieldType extends Date
      ? true
      : false
    : _Str extends `${infer YYYY}-${infer MM}-${infer DD}`
    ? FieldType extends Date
      ? true
      : false
    : false
  : Value extends NumericLiteral
  ? FieldType extends number
    ? true
    : false
  : Value extends VariableExpression
  ? true
  : false;

type TableNameFromNode<Node extends Statement> = Node extends UpdateStatement<
  infer TableName,
  infer Values,
  infer Where,
  infer ReturningFields
>
  ? TableName
  : never;

type WhereExpressionFromNode<
  Node extends Statement
> = Node extends UpdateStatement<
  infer TableName,
  infer Values,
  infer Where,
  infer ReturningFields
>
  ? Where
  : never;

type ValidatePrimitiveExpression<
  DB extends Database,
  Node extends UpdateStatement
> = {};

type ValidateBinaryExpression<
  DB extends Database,
  Node extends UpdateStatement,
  Exp extends BinaryExpression,
  TableName extends string = TableNameFromNode<Node>,
  Left extends Expression = Exp extends BinaryExpression<infer _Left, any, any>
    ? _Left
    : never,
  Operator extends BinaryOperator = Exp extends BinaryExpression<
    any,
    infer _Operator,
    any
  >
    ? _Operator
    : never,
  Right extends Expression = Exp extends BinaryExpression<
    any,
    any,
    infer _Right
  >
    ? _Right
    : never
> = TableName extends keyof DB["schema"]
  ? Left extends Identifier<infer Field>
    ? Field extends keyof DB["schema"][TableName]
      ? Operator extends "="
        ? true extends _CheckFieldType<DB["schema"][TableName][Field], Right>
          ? true
          : false
        : Operator extends "!="
        ? true extends _CheckFieldType<DB["schema"][TableName][Field], Right>
          ? true
          : false
        : Operator extends "LIKE"
        ? string extends DB["schema"][TableName][Field]
          ? Right extends StringLiteral
            ? true
            : false
          : false
        : false
      : false
    : true // FIXME
  : false;

type ValidateLogicalExpression<
  Left extends boolean,
  Operator extends LogicalOperator,
  Right extends boolean,
  Cond extends [boolean, boolean] = [Left, Right]
> = Operator extends "AND"
  ? Cond extends [true, true]
    ? true
    : false
  : Operator extends "OR"
  ? Cond extends [true, true]
    ? true
    : Cond extends [true, false]
    ? true
    : Cond extends [false, true]
    ? true
    : false
  : Operator extends "&&"
  ? Cond extends [true, true]
    ? true
    : false
  : Operator extends "||"
  ? Cond extends [true, true]
    ? true
    : Cond extends [true, false]
    ? true
    : Cond extends [false, true]
    ? true
    : false
  : false;

export type ValidateWhereExpression<
  DB extends Database,
  Node extends UpdateStatement,
  TableName extends string = TableNameFromNode<Node>,
  Where extends Expression = WhereExpressionFromNode<Node>
> = TableName extends keyof DB["schema"]
  ? Where extends BinaryExpression
    ? ValidateBinaryExpression<DB, Node, Where>
    : Where extends LogicalExpression<infer L0, infer O0, infer R0>
    ? L0 extends BinaryExpression
      ? O0 extends LogicalOperator
        ? R0 extends BinaryExpression
          ? ValidateLogicalExpression<
              ValidateBinaryExpression<DB, Node, L0>,
              O0,
              ValidateBinaryExpression<DB, Node, R0>
            >
          : false
        : false
      : false
    : true
  : false;
