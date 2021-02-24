import { expectType, expectNotType } from 'tsd'
import * as select from '../../src/parser/select'
import * as fixtures from '../fixture'
import { Print } from '../../src/Printer'

/**
 * ParseSelectStatement
 */
type TParseSelectStatement1 = select.ParseSelectStatement<fixtures.Q4>
type PParseSelectStatement1 = Print<TParseSelectStatement1[0]>
type TParseSelectStatement2 = select.ParseSelectStatement<fixtures.Q16>
type PParseSelectStatement2 = Print<TParseSelectStatement2[0]>

/**
 * ParseSelectClause
 */
type TParseSelectClause1 = select.ParseSelectClause<fixtures.Q4>
const VParseSelectClause1: TParseSelectClause1 = {
  fields: [
    { type: 'FieldSpecifier', source: { type: 'Identifier', name: 'first_name' }, alias: { type: 'Identifier', name: 'first_name' } },
    { type: 'FieldSpecifier', source: { type: 'Identifier', name: 'last_name' }, alias: { type: 'Identifier', name: 'surname' } }
  ],
  from: { type: 'TableSpecifier', source: { type: 'Identifier', name: 'customer' }, alias: { type: 'Identifier', name: 'customer' } },
  where: { type: 'BooleanLiteral', value: true },
  limit: { type: 'NumericLiteral', value: -1 },
  offset: { type: 'NumericLiteral', value: 0 },
  joins: []
}
expectType<TParseSelectClause1>(VParseSelectClause1)
type TParseSelectClause2 = select.ParseSelectClause<fixtures.Q27>
const VParseSelectClause2: TParseSelectClause2 = {
  fields: [
    { type: 'FieldSpecifier', source: { type: 'MemberExpression', object: 'customer', property: 'first_name' }, alias: { type: 'Identifier', name: 'first_name' } },
    { type: 'FieldSpecifier', source: { type: 'MemberExpression', object: 'customer', property: 'last_name' }, alias: { type: 'Identifier', name: 'last_name' } },
    { type: 'FieldSpecifier', source: { type: 'MemberExpression', object: 'rental', property: 'rental_date' }, alias: { type: 'Identifier', name: 'rental_date' } },
  ],
  from: { type: 'TableSpecifier', source: { type: 'Identifier', name: 'rental' }, alias: { type: 'Identifier', name: 'rental' } },
  where: { type: 'BooleanLiteral', value: true },
  limit: { type: 'NumericLiteral', value: -1 },
  offset: { type: 'NumericLiteral', value: 0 },
  joins: [
    {
      type: 'InnerJoinSpecifier',
      from: { type: 'TableSpecifier', source: { type: 'Identifier', name: 'customer' }, alias: { type: 'Identifier', name: 'customer' } },
      where: {
        type: 'BinaryExpression',
        left: { type: 'MemberExpression', object: 'rental', property: 'customer_id' },
        operator: '=',
        right: { type: 'MemberExpression', object: 'customer', property: 'customer_id' }
      }
    }
  ]
}
expectType<TParseSelectClause2>(VParseSelectClause2)

/**
 * ParseFromClause
 */
type TParseFromClause1 = select.ParseFromClause<fixtures.Q4>
const VParseFromClause1: TParseFromClause1 = {
  from: { type: 'TableSpecifier', source: { type: 'Identifier', name: 'customer' }, alias: { type: 'Identifier', name: 'customer' } },
  where: { type: 'BooleanLiteral', value: true },
  limit: { type: 'NumericLiteral', value: -1 },
  offset: { type: 'NumericLiteral', value: 0 },
  joins: []
}
expectType<TParseFromClause1>(VParseFromClause1)

/**
 * ParseJoinClause
 */

/**
 * ParseWhereClauseForSelect
 */
type TParseWhereClauseForSelect1 = select.ParseWhereClauseForSelect<fixtures.Q17>
const VParseWhereClauseForSelect1: TParseWhereClauseForSelect1 = {
  where: {
    type: 'LogicalExpression',
    left: {
      type: 'BinaryExpression',
      left: {
        type: 'Identifier',
        name: 'first_name'
      },
      operator: '=',
      right: {
        type: 'StringLiteral',
        value: 'Jamie'
      }
    },
    operator: 'OR',
    right: {
      type: 'BinaryExpression',
      left: {
        type: 'Identifier',
        name: 'last_name'
      },
      operator: '=',
      right: {
        type: 'StringLiteral',
        value: 'Rice'
      }
    }
  },
  limit: { type: 'NumericLiteral', value: 4 },
  offset: { type: 'NumericLiteral', value: 3 }
}
expectType<TParseWhereClauseForSelect1>(VParseWhereClauseForSelect1)

/**
 * ParseLimitClause
 */
type TParseLimitClause1 = select.ParseLimitClause<fixtures.Q15>
const VParseLimitClause1: TParseLimitClause1 = { limit: { type: 'NumericLiteral', value: -1 }, offset: { type: 'NumericLiteral', value: 0 } }
expectType<TParseLimitClause1>(VParseLimitClause1)

type TParseLimitClause2 = select.ParseLimitClause<fixtures.Q16>
const VParseLimitClause2: TParseLimitClause2 = { limit: { type: 'NumericLiteral', value: 4 }, offset: { type: 'NumericLiteral', value: 3 } }
expectType<TParseLimitClause2>(VParseLimitClause2)

/**
 * ParseOffsetClause
 */
type TParseOffsetClause1 = select.ParseOffsetClause<fixtures.Q15>
const VParseOffsetClause1: TParseOffsetClause1 = { offset: { type: 'NumericLiteral', value: 0 } }
expectType<TParseOffsetClause1>(VParseOffsetClause1)
expectNotType<TParseOffsetClause1>({ offset: { type: 'NumericLiteral', value: 1 } })

type TParseOffsetClause2 = select.ParseOffsetClause<fixtures.Q16>
const VParseOffsetClause2: TParseOffsetClause2 = { offset: { type: 'NumericLiteral', value: 3 } }
expectType<TParseOffsetClause2>(VParseOffsetClause2)
expectNotType<TParseOffsetClause2>({ offset: { type: 'NumericLiteral', value: 3 } })
