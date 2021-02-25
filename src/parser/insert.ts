import { BooleanLiteral, Expression, InsertStatement, NullLiteral, NumericLiteral, StringLiteral, VariableExpression } from '../AST'
import { ParseFieldSpecifierList } from './common'
import { Trim } from '../Utils'

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
  : never

export type ParseInsertClause<T> = T extends `INSERT INTO ${infer TableName} (${infer Fields}) VALUES${infer  R0}`
  ? { tableName: TableName; fields: ParseModifyFieldList<Fields> } & ParseValuesListClause<R0>
  : never

type ParseModifyFieldList<T> =  T extends `${infer Head},${infer Tail}`
  ? [Trim<Head>, ...ParseModifyFieldList<Trim<Tail>>]
  : [Trim<T>]

type ParseValuesListClause<T, List extends Expression[][] = []> = Trim<T> extends `${infer R0}(${infer Head})${infer Tail}`
  ? ParseValuesListClause<Tail, [...List, ParseValues<Head>]>
  : { values: List } & ParseReturningClause<T>

type ParseValues<T> = T extends `${infer Head},${infer Tail}`
  ? [ParseValue<Head>, ...ParseValues<Tail>]
  : [ParseValue<T>]

type ParseValue<T> = Trim<T> extends `$${infer R0}`
  ? VariableExpression
  : Trim<T> extends 'NULL'
    ? NullLiteral
    : Trim<T> extends 'TRUE'
      ? BooleanLiteral<true>
      : Trim<T> extends 'FALSE'
        ? BooleanLiteral<false>
        : Trim<T> extends `'${infer S}'`
          ? StringLiteral<S>
          : NumericLiteral

type ParseReturningClause<T> = T extends `${infer R0}RETURNING${infer FieldNames}`
  ? FieldNames extends `${infer R1};`
    ? { returningFields: ParseFieldSpecifierList<Trim<R1>> }
    : { returningFields: ParseFieldSpecifierList<Trim<FieldNames>> }
  : { returningFields: [] }
