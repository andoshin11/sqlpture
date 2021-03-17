import {
  AssignmentExpression,
  BooleanLiteral,
  Expression,
  Identifier,
  UpdateStatement,
} from "../AST";
import { ParseReturningClause, ParseValue, ParseExpression } from "./common";
import { Trim, TrimRight, TrimSemicolon } from "../Utils";

export type ParseUpdateStatement<T> = T extends `UPDATE ${infer R0}`
  ? ParseUpdateClause<T> extends Partial<
      UpdateStatement<
        infer TableName,
        infer Values,
        infer Where,
        infer ReturningFields
      >
    >
    ? [UpdateStatement<TableName, Values, Where, ReturningFields>, ""]
    : never
  : never;

export type ParseUpdateClause<
  T,
  _T = TrimSemicolon<T>
> = _T extends `UPDATE ${infer TableName} SET ${infer Values}`
  ? Values extends `${infer R0}RETURNING${infer R1}`
    ? { tableName: TableName } & ParseReturningClause<_T> & ParseSetClause<TrimRight<R0>>
    : { tableName: TableName } & { returningFields: [] } & ParseSetClause<Values>
  : never;

type ParseSetClause<T> = Trim<T> extends `${infer R1}WHERE ${infer WHERE}`
  ? { values: ParseAssignmentExpressionList<TrimRight<R1>> } & ParseWhereClause<WHERE>
  : { values: ParseAssignmentExpressionList<T> } & { where: BooleanLiteral<true> }

type ParseWhereClause<T> = ParseExpression<T> extends [infer Exp, infer R1]
    ? Exp extends Expression
      ? { where: Exp }
      : never
    : never

type ParseAssignmentExpressionList<T> = T extends `${infer Head},${infer Tail}`
  ? [
      ParseAssignmentExpression<Trim<Head>>,
      ...ParseAssignmentExpressionList<Trim<Tail>>
    ]
  : T extends `${infer Head} = ${infer Value} ${infer Tail}`
  ? [
      AssignmentExpression<
        Identifier<Trim<Head>>,
        ParseValue<Trim<Value>>
      >,
      Tail
    ]
  : T extends `${infer Head} = ${infer Value}`
  ? [
      AssignmentExpression<
        Identifier<Trim<Head>>,
        ParseValue<Trim<Value>>
      >
    ]
  : T extends `${infer Head} ${infer Tail}`
  ? [ParseAssignmentExpression<Trim<Head>>, Tail]
  : [ParseAssignmentExpression<Trim<T>>];

type ParseAssignmentExpression<T> = T extends `${infer Key} = ${infer Value}`
  ? AssignmentExpression<
      Identifier<Key>,
      ParseValue<Trim<Value>>
    >
  : never;
