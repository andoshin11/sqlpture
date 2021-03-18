import { Database } from "../Schema";
import {
  BooleanLiteral,
  Expression,
  NullLiteral,
  NumericLiteral,
  StringLiteral,
  FieldSpecifier,
  Identifier,
  VariableExpression,
  UpdateStatement,
  AssignmentExpression,
} from "../AST";
import { ValidateWhereExpression } from './common'

export type ValidateUpdateStatement<
  DB extends Database,
  Node extends UpdateStatement
> = Node extends UpdateStatement<
  infer TableName,
  infer Values,
  infer Where,
  infer ReturningFields
>
  ? true extends ValidateValues<DB, Node> &
      ValidateReturningFields<DB, Node> & ValidateWhereExpression<DB, Node>
    ? true
    : false
  : false;

type _CheckFieldType<
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
          : false

export type ValidateValues<
  DB extends Database,
  Node extends UpdateStatement
> = Node extends UpdateStatement<
  infer TableName,
  infer Values,
  infer Where,
  infer ReturningFields
>
  ? TableName extends keyof DB['schema']
    ? {
      [K in keyof Values]: Values[K] extends AssignmentExpression<Identifier<infer Field>, infer Value>
        ? Field extends keyof DB['schema'][TableName]
          ? _CheckFieldType<DB['schema'][TableName][Field], Value>
          : false
        : false
      } extends true[]
        ? true
        : false
    : false
  : false

export type ValidateReturningFields<
  DB extends Database,
  Node extends UpdateStatement
> = Node extends UpdateStatement<
  infer TableName,
  infer Values,
  infer Where,
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
