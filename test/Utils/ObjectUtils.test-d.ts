import { expectType } from 'tsd'
import { Merge, Joint, UnionizeValue } from '../../src/Utils/ObjectUtils'

interface Person {
  id: number
  name: string
  age: number
  email: string
}

type Admin = {
  name: string
  isAdmin: true
  title: string
}

type TMerge = Merge<Person & Admin>
const VMerge: TMerge = { id: 1, name: 'John', age: 28, email: 'john@example.com', isAdmin: true, title: 'CEO' }
expectType<TMerge>(VMerge)

interface SpecialPerson {
  id: number
  name: number
  age: number
  address: string
}

type TJoint = Joint<Person, SpecialPerson>
const VJoint: TJoint = { id: 1, name: 'John', age: 28, email: 'john@example.com', address: '' }
expectType<TJoint>(VJoint)

type TUnionizeValue = UnionizeValue<Person>
