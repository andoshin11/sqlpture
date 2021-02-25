import { expectType } from 'tsd'
import * as select from '../../src/parser/insert'
import * as fixtures from '../fixture'

/**
 * ParseInsertClause
 */
type TParseInsertClause1 = select.ParseInsertClause<fixtures.Q200>
const VParseInsertClause1: TParseInsertClause1 = {
  tableName: 'rental',
  fields: ['rental_date', 'inventory_id', 'customer_id', 'staff_id'],
  values: [
    [
      { type: 'StringLiteral', value: '2021-02-25' },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 }
    ]
  ],
  returningFields: []
}
expectType<TParseInsertClause1>(VParseInsertClause1)

type TParseInsertClause2 = select.ParseInsertClause<fixtures.Q201>
const VParseInsertClause2: TParseInsertClause2 = {
  tableName: 'rental',
  fields: ['rental_date', 'inventory_id', 'customer_id', 'staff_id'],
  values: [
    [
      { type: 'StringLiteral', value: '2021-02-25' },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 }
    ],
    [
      { type: 'StringLiteral', value: '2021-02-26' },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 }
    ]
  ],
  returningFields: [
    { type: 'FieldSpecifier', alias: { type: 'Identifier', name: '*' }, source: { type: 'Identifier', name: '*' } }
  ]
}
expectType<TParseInsertClause2>(VParseInsertClause2)

type TParseInsertClause3 = select.ParseInsertClause<fixtures.Q202>
const VParseInsertClause3: TParseInsertClause3 = {
  tableName: 'rental',
  fields: ['rental_date', 'inventory_id', 'customer_id', 'staff_id'],
  values: [
    [
      { type: 'StringLiteral', value: '2021-02-25' },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 },
      { type: 'NumericLiteral', value: -100 }
    ]
  ],
  returningFields: [
    {
      type: 'FieldSpecifier',
      source: { type: 'Identifier', name: 'rental_date' },
      alias: { type: 'Identifier', name: 'rental_date' }
    },
    {
      type: 'FieldSpecifier',
      source: { type: 'Identifier', name: 'inventory_id' },
      alias: { type: 'Identifier', name: 'inventory' }
    }
  ]
}
expectType<TParseInsertClause3>(VParseInsertClause3)