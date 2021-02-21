import { Trim, IntegerStrings, Merge } from '../Utils'
import { NumericLiteral, BooleanLiteral, Expression, InnerJoinSpecifier, TableSpecifier, Identifier, SelectStatement } from '../AST'
import { ParseStatementTerminator, Tokenize, ParseExpression, ParseTableSpecifier, ParseFieldSpecifierList } from './common'

export type ParseSelectStatement<T> = T extends `SELECT ${infer Rest}`
  ? ParseSelectClause<T> extends Partial<SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>>
    ? [SelectStatement<Fields, From, Joins, Where, Limit, Offset>, '']
    : never
  : never;

export type ParseSelectClause<T>= T extends `SELECT DISTINCT ${infer FieldNames} FROM ${infer R0}`
? Merge<{fields: ParseFieldSpecifierList<FieldNames>} & ParseFromClause<T>>
: T extends `SELECT ${infer FieldNames} FROM ${infer R0}`
  ? Merge<{fields: ParseFieldSpecifierList<FieldNames>} & ParseFromClause<T>>
  : never;

export type ParseFromClause<T> = Trim<T> extends `${infer Head}FROM ${infer From}`
  ? Tokenize<From> extends [infer Source, infer R0]
    ? Tokenize<R0> extends ['AS', infer R1]
      ? Tokenize<R1> extends [infer Alias, infer R2]
        ? Merge<{from: TableSpecifier<Identifier<Source & string>, Identifier<Alias & string>>} & ParseJoinClause<R2>>
        : never
      : Merge<{from: TableSpecifier<Identifier<Source & string>>} & ParseJoinClause<R0>>
    : never
  : never;

export type ParseJoinClause<T, Joins extends InnerJoinSpecifier[] = []> = Trim<T> extends `${infer Head}INNER JOIN ${infer TableName} ON ${infer R0}`
  ? ParseExpression<R0> extends [infer Exp, infer R1]
    ? Exp extends Expression
      ? ParseJoinClause<Trim<R1>, [...Joins, InnerJoinSpecifier<ParseTableSpecifier<TableName>, Exp>]>
      : never
    : never
  : Merge<ParseWhereClauseForSelect<Trim<T>> & {joins: Joins}>

export type ParseWhereClauseForSelect<T> = Trim<T> extends ''
  ? Merge<{ where: BooleanLiteral<true> } & ParseLimitClause<Trim<T>>>
  : Trim<T> extends `${infer Head}WHERE ${infer Where}`
    ? ParseExpression<Where> extends [infer Exp, infer R0]
      ? Exp extends Expression
        ? Merge<{where: Merge<Exp>} & ParseLimitClause<R0>>
        : never
      : never
    : Merge<{where: BooleanLiteral<true>} & ParseLimitClause<Trim<T>>>

export type ParseLimitClause<T> = Trim<T> extends `${infer Head}LIMIT ${infer R0}`
  ? Tokenize<R0> extends [infer Limit, infer R1]
    ? Limit extends keyof IntegerStrings
      ? Merge<{limit: NumericLiteral<number & IntegerStrings[Limit]>} & ParseOffsetClause<R1>>
      : never
    : never
  : Merge<{limit: NumericLiteral<-1>} & ParseOffsetClause<T>>;

export type ParseOffsetClause<T> = Trim<T> extends `${infer Head}OFFSET ${infer R0}`
  ? Tokenize<R0> extends [infer Offset, infer R1]
    ? Offset extends keyof IntegerStrings
      ? { offset: NumericLiteral<number & IntegerStrings[Offset]> } & ParseStatementTerminator<R1>
      : Offset extends 'NULL'
        ? { offset: NumericLiteral<0> } & ParseStatementTerminator<T>
        : never
    : never
  : { offset: NumericLiteral<0> } & ParseStatementTerminator<T>;
