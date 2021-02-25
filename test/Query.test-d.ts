import { expectType } from 'tsd'
import { Query } from '../src/Query'
import { Parse } from '../src/Parser'
import * as fixtures from './fixture'

type T1 = Query<fixtures.Q1, fixtures.DB>
const V1: T1 = [{ first_name: 'John' }]
expectType<T1>(V1)

type T2 = Query<fixtures.Q2, fixtures.DB>
const V2: T2 = [{ first_name: 'John', last_name: 'Smith', email: null }]
expectType<T2>(V2)

type T3 = Query<fixtures.Q3, fixtures.DB>
const V3: T3 = [
  {
    customer_id: 1,
    store_id: 100,
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    address_id: 10,
    activebool: true,
    create_date: new Date('2021-02-21'),
    last_update: new Date('2021-02-21'),
    active: null
  }
]
expectType<T3>(V3)

type T4 = Query<fixtures.Q4, fixtures.DB>
const V4: T4 = [{ first_name: 'John', surname: 'Smith' }]
expectType<T4>(V4)

type T5 = Query<fixtures.Q5, fixtures.DB>
const V5: T5 = [{ first_name: 'John', surname: 'Smith' }]
expectType<T5>(V5)

type T6 = Query<fixtures.Q6, fixtures.DB>
const V6: T6 = [{ full_name: 'John Smith' }]
expectType<T6>(V6)

type T7 = Query<fixtures.Q7, fixtures.DB>
const V7: T7 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T7>(V7)

// type T8 = Query<fixtures.Q8, fixtures.DB>

type T9 = Query<fixtures.Q9, fixtures.DB>
const V9: T9 = [{ release_year: 1992 }]
expectType<T9>(V9)

type T10 = Query<fixtures.Q10, fixtures.DB>
const V10: T10 = [{ release_year: 1992, rental_rate: 5 }]
expectType<T10>(V10)

type T11 = Query<fixtures.Q11, fixtures.DB>
const V11: T11 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T11>(V11)

type T12 = Query<fixtures.Q12, fixtures.DB>
const V12: T12 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T12>(V12)

type T13 = Query<fixtures.Q13, fixtures.DB>
const V13: T13 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T13>(V13)

type T14 = Query<fixtures.Q14, fixtures.DB>
const V14: T14 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T14>(V14)

type T18 = Query<fixtures.Q18, fixtures.DB>
const V18: T18 = [{ customer_id: 1, rental_id: 10, return_date: null }]
expectType<T18>(V18)

type T19 = Query<fixtures.Q19, fixtures.DB>
const V19: T19 = [{ customer_id: 1, rental_id: 10, return_date: null }]
expectType<T19>(V19)

type T20 = Query<fixtures.Q20, fixtures.DB>
const V20: T20 = [{ customer_id: 1, rental_id: 10, return_date: null }]
expectType<T20>(V20)

type T21 = Query<fixtures.Q21, fixtures.DB>
const V21: T21 = [{ customer_id: 1, payment_id: 10, amount: 100 }]
expectType<T21>(V21)

type T22 = Query<fixtures.Q22, fixtures.DB>
const V22: T22 = [{ customer_id: 1, payment_id: 10, amount: 100 }]
expectType<T22>(V22)

type T23 = Query<fixtures.Q23, fixtures.DB>
const V23: T23 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T23>(V23)

type T24 = Query<fixtures.Q24, fixtures.DB>
const V24: T24 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T24>(V24)

type T25 = Query<fixtures.Q25, fixtures.DB>
const V25: T25 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T25>(V25)

type T26 = Query<fixtures.Q26, fixtures.DB>
const V26: T26 = [{ first_name: 'John', last_name: 'Smith' }]
expectType<T26>(V26)

type T27 = Query<fixtures.Q27, fixtures.DB>
const V27: T27 = [{ first_name: 'John', last_name: 'Smith', rental_date: new Date() }]
expectType<T27>(V27)

type T28 = Query<fixtures.Q28, fixtures.DB>
const V28: T28 = [{ first_name: 'John', last_name: 'Smith', rental_date: new Date(), return_date: null, film_title: 'Avengers' }]
expectType<T28>(V28)

type T29 = Query<fixtures.Q29, fixtures.DB>
const V29: T29 = [{ first_name: 'John' }]
expectType<T29>(V29)

type T30 = Query<fixtures.Q30, fixtures.DB>
const V30: T30 = [{ first_name: 'John', last_name: 'Smith', rented: new Date() }]
expectType<T30>(V30)

type T31 = Query<fixtures.Q31, fixtures.DB>
const V31: T31 = [{
  store_id: 20,
  first_name: 'John',
  last_name: 'Smith',
  email: 'john.smith@example.com',
  address_id: 40,
  activebool: true,
  create_date: new Date(),
  active: 1,
  rental_id: 10,
  rental_date: new Date(),
  inventory_id: 50,
  customer_id: 1,
  return_date: null,
  staff_id: 30,
  last_update: new Date(),
}]
expectType<T31>(V31)

type T33 = Query<fixtures.Q33, fixtures.DB>
const V33: T33 = [{ first_name: 'John', _first_name: 'John', last_name: 'Smith', rental_date: new Date(), return_date: null, film_title: 'Avengers' }]
expectType<T33>(V33)

type T34 = Query<fixtures.Q34, fixtures.DB>
const V34: T34 = [{ first_name: 'John', last_name: 'Smith', rental_date: new Date() }]
expectType<T34>(V34)
