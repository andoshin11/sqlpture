import { expectType } from 'tsd'
import { Merge } from '../../src/Utils/ObjectUtils'

interface Person {
  id: number
  name: string
  age: number
}

type Admin = {
  name: string
  isAdmin: true
  title: string
}

type TMerge = Merge<Person & Admin>
const VMerge: TMerge = { id: 1, name: 'John', age: 28, isAdmin: true, title: 'CEO' }
expectType<TMerge>(VMerge)
