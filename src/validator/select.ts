import { Database } from '../Schema'
import { SelectStatement, TableSpecifier, Identifier, JoinSpecifier, InnerJoinSpecifier, LogicalExpression, BinaryExpression, NullLiteral, BooleanLiteral, NumericLiteral, Expression, FieldSpecifier, MemberExpression } from '../AST'
import { ExtractJoinSource, ExtractAllFieldNames, AliasMap, UnionizeValue, ToJoinedSchema } from '../Utils'
import { JoinedSchema } from '../Schema'

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

type _GetJoinedSchema<
  DB extends Database,
  Node extends SelectStatement
> = Node extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
  ? ToJoinedSchema<DB, From, Joins>
  : never

export type ValidateFieldList<
  DB extends Database,
  Node extends SelectStatement,
  _JoinedSchema = _GetJoinedSchema<DB, Node>
> = Node extends SelectStatement<infer Fields, any, any, any, any, any>
  ? _JoinedSchema extends JoinedSchema<DB>
    ? {
      [K in keyof Fields]: Fields[K] extends FieldSpecifier<infer Source, any>
        ? Source extends Identifier<infer Name> // if true, search from public schema
          ? Name extends keyof _JoinedSchema['public']
            ? true
            : false
          : Source extends MemberExpression<infer O, infer P>
            ? O extends _JoinedSchema['from']['alias'] // if true, search from from table
              ? P extends keyof _JoinedSchema['from']['schema']
                ? true
                : false
              : O extends keyof _JoinedSchema['joins'] // if true, search from joined tables
                ? P extends keyof _JoinedSchema['joins'][O]
                  ? true
                  : false
                : false
            : false
        : false
      } extends true[] ? true : false
    : false
  : false

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
