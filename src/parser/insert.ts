import {
  BooleanLiteral,
  Expression,
  InsertStatement,
  NullLiteral,
  NumericLiteral,
  StringLiteral,
  VariableExpression,
} from "../AST";
import { ParseFieldSpecifierList, ParseReturningClause, ParseValue } from "./common";
import { Trim } from "../Utils";

export type ParseInsertStatement<T> = T extends `INSERT INTO ${infer R0}`
  ? ParseInsertClause<T> extends Partial<
      InsertStatement<
        infer TableName,
        infer Fields,
        infer Values,
        infer ReturningFields
      >
    >
    ? [InsertStatement<TableName, Fields, Values, ReturningFields>, ""]
    : never
  : never;

export type ParseInsertClause<
  T
> = T extends `INSERT INTO ${infer TableName} (${infer Fields}) VALUES${infer R0}`
  ? {
      tableName: TableName;
      fields: ParseModifyFieldList<Fields>;
    } & ParseValuesListClause<R0>
  : never;

type ParseModifyFieldList<T> = T extends `${infer Head},${infer Tail}`
  ? [Trim<Head>, ...ParseModifyFieldList<Trim<Tail>>]
  : [Trim<T>];

type ParseValuesListClause<
  T,
  List extends Expression[][] = []
> = Trim<T> extends `${infer R0}(${infer Head})${infer Tail}`
  ? ParseValuesListClause<Tail, [...List, ParseValues<Head>]>
  : { values: List } & ParseReturningClause<T>;

type ParseValues<T> = T extends `${infer Head},${infer Tail}`
  ? [ParseValue<Head>, ...ParseValues<Tail>]
  : [ParseValue<T>];
