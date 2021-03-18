import { expectType } from 'tsd'
import * as update from '../../src/parser/update'
import * as fixtures from '../fixture'

/**
 * ParseUpdateClause
 */
type TParseUpdateClause0 = update.ParseUpdateClause<fixtures.Q300>
const VParseUpdateClause0: TParseUpdateClause0 = {
  tableName: 'customer',
  values: [
    {
      type: 'AssignmentExpression',
      key: { type: 'Identifier', name: 'activebool' },
      value: { type: 'BooleanLiteral', value: true  }
    }
  ],
  where: { type: 'BooleanLiteral', value: true },
  returningFields: []
}
expectType<TParseUpdateClause0>(VParseUpdateClause0)

type TParseUpdateClause1 = update.ParseUpdateClause<fixtures.Q301>
const VParseUpdateClause1: TParseUpdateClause1 = {
  tableName: 'customer',
  values: [
    {
      type: 'AssignmentExpression',
      key: { type: 'Identifier', name: 'activebool' },
      value: { type: 'BooleanLiteral', value: true  }
    }
  ],
  where: { type: 'BooleanLiteral', value: true },
  returningFields: [
    {
      type: 'FieldSpecifier',
      source: { type: 'Identifier', name: '*' },
      alias: { type: 'Identifier', name: '*' }
    }
  ]
}
expectType<TParseUpdateClause1>(VParseUpdateClause1)

type TParseUpdateClause2 = update.ParseUpdateClause<fixtures.Q302>
const VParseUpdateClause2: TParseUpdateClause2 = {
  tableName: 'customer',
  values: [
    {
      type: 'AssignmentExpression',
      key: { type: 'Identifier', name: 'activebool' },
      value: { type: 'BooleanLiteral', value: true  }
    }
  ],
  where: {
    type: 'BinaryExpression',
    left: { type: 'Identifier', name: 'customer_id' },
    operator: '=',
    right: { type: 'NumericLiteral', value: 1 }
  },
  returningFields: []
}
expectType<TParseUpdateClause2>(VParseUpdateClause2)

type TParseUpdateClause3 = update.ParseUpdateClause<fixtures.Q303>
const VParseUpdateClause3: TParseUpdateClause3 = {
  tableName: 'customer',
  values: [
    {
      type: 'AssignmentExpression',
      key: { type: 'Identifier', name: 'activebool' },
      value: { type: 'BooleanLiteral', value: true  }
    }
  ],
  where: {
    type: 'LogicalExpression',
    left: {
      type: 'BinaryExpression',
      left: { type: 'Identifier', name: 'first_name' },
      operator: '=',
      right: { type: 'StringLiteral', value: 'John' }
    },
    operator: 'AND',
    right: {
      type: 'BinaryExpression',
      left: { type: 'Identifier', name: 'last_name' },
      operator: '=',
      right: { type: 'StringLiteral', value: 'Smith' }
    }
  },
  returningFields: [
    {
      type: 'FieldSpecifier',
      source: { type: 'Identifier', name: 'customer_id' },
      alias: { type: 'Identifier', name: 'id' }
    },
    {
      type: 'FieldSpecifier',
      source: { type: 'Identifier', name: 'email' },
      alias: { type: 'Identifier', name: 'email' }
    }
  ]
}
expectType<TParseUpdateClause3>(VParseUpdateClause3)
