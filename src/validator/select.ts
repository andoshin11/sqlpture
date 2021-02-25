import { Database } from '../Schema'
import { SelectStatement, TableSpecifier, Identifier, JoinSpecifier, InnerJoinSpecifier, LogicalExpression, BinaryExpression, NullLiteral, BooleanLiteral, NumericLiteral, Expression, FieldSpecifier, MemberExpression, StringLiteral } from '../AST'
import { ExtractJoinSource, ExtractAllFieldNames, ToJoinedSchema } from '../Utils'
import { JoinedSchema } from '../Schema'

export type ValidateSelectStatement<
  DB extends Database,
  Node extends SelectStatement
> = Node extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
  ? true extends (ValidateFieldList<DB, Node> & ValidateFromClause<DB, Node> & ValidateJoinClauses<DB, Node> & ValidateWhereClause<DB, Node>)
    ? true
    : false
  : false

// WIP
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
          ? Name extends "*"
           ? true
           : Name extends keyof _JoinedSchema['public']
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

type _CheckExpressionValidity<
  DB extends Database,
  Node extends SelectStatement,
  EXP extends Expression,
  _JoinedSchema = _GetJoinedSchema<DB, Node>
> = _JoinedSchema extends JoinedSchema<DB>
  ? EXP extends NullLiteral
    ? true
    : EXP extends BooleanLiteral
      ? true
      : EXP extends NumericLiteral
        ? true
        : EXP extends StringLiteral
          ? true
          : EXP extends Identifier<infer Name>
            ? Name extends keyof _JoinedSchema['public']
              ? true
              : false
            : EXP extends MemberExpression<infer O, infer P>
              ? O extends _JoinedSchema['from']['alias']
                ? P extends keyof _JoinedSchema['from']['schema']
                  ? true
                  : false
                : O extends keyof _JoinedSchema['joins']
                  ? P extends keyof _JoinedSchema['joins'][O]
                    ? true
                    : false
                  : false
              : EXP extends BinaryExpression<infer Left, any, infer Right>
                ? [_CheckExpressionValidity<DB, Node, Left>, _CheckExpressionValidity<DB, Node, Right>] extends [true, true]
                  ? true
                  : false
                : EXP extends LogicalExpression<infer Left, any, infer Right>
                  ? [_CheckExpressionValidity<DB, Node, Left>, _CheckExpressionValidity<DB, Node, Right>] extends [true, true]
                    ? true
                    : false
                  : false
  : false

type _CheckJoinConnecter<
  DB extends Database,
  Node extends SelectStatement,
  _JoinedSchema = _GetJoinedSchema<DB, Node>
> = _JoinedSchema extends JoinedSchema<DB>
  ? Node extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
    ? {
      [K in keyof Joins]: Joins[K] extends InnerJoinSpecifier<any, infer Where>
        ? _CheckExpressionValidity<DB, Node, Where>
        : false
    }
    : [false]
  : [false]

// TODO: ensure join sources' uniqueness
export type ValidateJoinClauses<
  DB extends Database,
  Node extends SelectStatement
> = Node extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
  ? ToJoinSourceList<Joins> extends Array<keyof DB['schema']>
    ? _CheckJoinConnecter<DB, Node> extends true[] ? true : false
    : false
  : false

export type ValidJoinClauses<
  DB extends Database
> = { joins: Array<InnerJoinSpecifier<TableSpecifier<Identifier<string & keyof DB['schema']>, any>, any>> }

export type ValidateWhereClause<
  DB extends Database,
  Node extends SelectStatement
> = Node extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
? _CheckExpressionValidity<DB, Node, Where>
: false

export type ValidWhereClause<
  DB extends Database,
  FieldNames = ExtractAllFieldNames<DB>
> = FieldNames extends string ? { where: Expression } : never

export type ValidLimitClause<
  DB extends Database
> = { limit: NumericLiteral | NullLiteral }
