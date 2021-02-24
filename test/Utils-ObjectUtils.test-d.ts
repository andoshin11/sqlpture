import { expectType, expectAssignable } from 'tsd'
import * as Utils from '../src/Utils/ObjectUtils'

interface Person {
  id: number
  name: string
  email: string
  age: number
}

type Admin = {
  name: string
  isAdmin: true
  title: string
}

/**
 * Merge
 */
type TMerge = Utils.Merge<Person & Admin>
const VMerge: TMerge = { id: 1, name: 'John', age: 28, email: 'john@example.com', isAdmin: true, title: 'CEO' }
expectType<TMerge>(VMerge)

interface SpecialPerson {
  id: number
  name: number
  age: number
  address: string
}

/**
 * Joint
 */
type TJoint = Utils.Joint<Person, SpecialPerson>
const VJoint: TJoint = { id: 1, name: 'John', age: 28, email: 'john@example.com', address: '' }
expectType<TJoint>(VJoint)

type TUnionizeValue = Utils.UnionizeValue<Person>
expectAssignable<TUnionizeValue>('John')
expectAssignable<TUnionizeValue>(2)

/**
 * TupleToUnion
 */
type TTupleToUnion = Utils.TupleToUnion<[1, 'hoge', true]>
expectAssignable<TTupleToUnion>(1)
expectAssignable<TTupleToUnion>('hoge')
expectAssignable<TTupleToUnion>(true)

/**
 * PairToObject
 */
type TPairToObject = Utils.PairToObject<readonly ['hoge', 'fuga']>
const VPairToObject: TPairToObject = {
  hoge: 'fuga'
}
expectType<TPairToObject>(VPairToObject)

/**
 * ToUnaryFunctionUnion
 */
type TToUnaryFunctionUnion = Utils.ToUnaryFunctionUnion<Person>
const VToUnaryFunctionUnion: TToUnaryFunctionUnion = (arg: Person) => {}
expectType<TToUnaryFunctionUnion>(VToUnaryFunctionUnion)

/**
 * UnionToIntersection
 */
type TUnionToIntersection = Utils.UnionToIntersection<Person | Admin>
const VUnionToIntersection: TUnionToIntersection = { id: 1, name: 'John', age: 28, email: 'john@example.com', isAdmin: true, title: 'CEO' }
expectType<TUnionToIntersection>(VUnionToIntersection)

/**
 * AssembleEntries
 */
type TAssembleEntries = Utils.AssembleEntries<[['id', 1], ['name', 'John']]>
const VAssembleEntries: TAssembleEntries = { id: 1, name: 'John' }
expectType<TAssembleEntries>(VAssembleEntries)
