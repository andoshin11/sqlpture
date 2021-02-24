import { Database } from '../Schema'
import { SelectStatement, TableSpecifier, Identifier, JoinSpecifier, InnerJoinSpecifier, LogicalExpression, BinaryExpression, NullLiteral, BooleanLiteral, NumericLiteral, Expression } from '../AST'
import { ExtractJoinSource, ExtractAllFieldNames } from '../Utils'

export type ValidateSelectStatement<
  DB extends Database,
  Node extends SelectStatement
> = Node extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
  ? any
  : never

export type ValidSelectStatement<DB extends Database> =
  ValidFromClause<DB> &
  ValidJoinClauses<DB> &
  ValidWhereClause<DB> &
  ValidLimitClause<DB>

export type ValidFields<DB extends Database> = {
  fields: any
}

export type ValidateFromClause<
  DB extends Database,
  Node extends SelectStatement
> = Node extends { from: TableSpecifier<Identifier<infer Source>, Identifier<any>> }
  ? Source extends keyof DB['schema']
    ? true
    : false
  : false

export type ValidFromClause<
  DB extends Database
> = { from: TableSpecifier<Identifier<string & keyof DB['schema']>, any> }

type ToJoinSourceList<Joins extends JoinSpecifier[], List extends string[] = []> = Joins extends [infer Head, ...infer Tail]
 ? Tail extends JoinSpecifier[]
  ? ToJoinSourceList<Tail, [...List, ExtractJoinSource<Head>]>
  : List
 : List

// TODO: ensure join sources' uniqueness
// TODO: validate ON field
export type ValidateJoinClauses<
  DB extends Database,
  Node extends SelectStatement
> = Node extends { joins: JoinSpecifier[] }
  ? ToJoinSourceList<Node['joins']> extends Array<keyof DB['schema']>
    ? true
    : false
  : false

export type ValidJoinClauses<
  DB extends Database
> = { joins: Array<InnerJoinSpecifier<TableSpecifier<Identifier<string & keyof DB['schema']>, any>, any>> }

// TODO: validate identifiers & fields
export type ValidWhereClause<
  DB extends Database,
  FieldNames = ExtractAllFieldNames<DB>
> = FieldNames extends string ? { where: Expression } : never

export type ValidLimitClause<
  DB extends Database
> = { limit: NumericLiteral | NullLiteral }
