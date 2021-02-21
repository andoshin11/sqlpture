import { expectType, expectNotType } from 'tsd'
import * as Evaluate from '../src/Evaluator'
import * as Parser from '../src/Parser'
import * as AST from '../src/AST'
import { DB, query1, query2, query3, Q2, Q3 } from './fixture'
import { Merge } from '../src/Utils'

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

// type TCollectJoinedArrayForRow = Evaluate.CollectJoinedArrayForRow

/**
 * CollectAllInputRows
 */
type TCollectAllInputRows = Parser.Parse<Q3> extends AST.SelectStatement<infer Fields, infer From, infer Join>
  ? Evaluate.CollectAllInputRows<DB, From, Join>
  : never
const VCollectAllInputRows: TCollectAllInputRows = [
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
expectType<TCollectAllInputRows>(VCollectAllInputRows)


type TFirstElementOrNull = Evaluate.FirstElementOrNull<[{ id: 1 }, { id: 2 }]>
const VFirstElementOrNull: TFirstElementOrNull = { id: 1 }
expectType<TFirstElementOrNull>(VFirstElementOrNull)

type TExtractJoinAlias = Parser.Parse<query1> extends AST.SelectStatement<infer Fields, infer From, infer Join> ? Evaluate.ExtractJoinAlias<Join[0]> : never
const VExtractJoinAlias: TExtractJoinAlias = 'team'
expectType<TExtractJoinAlias>(VExtractJoinAlias)

/**
 * FilterUndefined
 */
type TFilterUndefined = Evaluate.FilterUndefined<[1, undefined, '2', true, undefined]>
const VFilterUndefined: TFilterUndefined = [1, '2', true]
expectType<TFilterUndefined>(VFilterUndefined)

/**
 * ExtractFields
 */
type TExtractFields = Parser.Parse<Q2> extends AST.SelectStatement<infer Fields, infer From, infer Join>
  ? From extends AST.TableSpecifier<AST.Identifier<infer Source>, AST.Identifier<infer Alias>>
    ? Source extends keyof DB['schema']
      ? Evaluate.ExtractFields<
          Evaluate.CollectInputRows<DB, From, Join>,
          Fields,
          Merge<Evaluate.UnionToIntersection<Evaluate.AssembleEntries<[[Alias & string, DB['schema'][Source]]]>>>
        >
      : never
    : never
  : never
const VExtractFields: TExtractFields = ['John', 'Smith', null]
expectType<TExtractFields>(VExtractFields)

/**
 * AssembleRows
 */
type TAssembleRows = Parser.Parse<Q2> extends AST.SelectStatement<infer Fields, infer From, infer Join>
? From extends AST.TableSpecifier<AST.Identifier<infer Source>, AST.Identifier<infer Alias>>
  ? Source extends keyof DB['schema']
    ? Evaluate.AssembleRows<
        Fields,
        Evaluate.ExtractFields<
          Evaluate.CollectInputRows<DB, From, Join>,
          Fields,
          Merge<Evaluate.UnionToIntersection<Evaluate.AssembleEntries<[[Alias & string, DB['schema'][Source]]]>>>
        >
      >
    : never
  : never
: never
const VAssembleRows: TAssembleRows = [ { first_name: 'John', last_name: 'Smith', email: null }]
expectType<TAssembleRows>(VAssembleRows)

/**
 * EvaluateNullLiteral
 */
type TEvaluateNullLiteral = Evaluate.EvaluateNullLiteral<any, AST.NullLiteral>
const VEvaluateNullLiteral: TEvaluateNullLiteral = null
expectType<TEvaluateNullLiteral>(VEvaluateNullLiteral)
expectNotType<TEvaluateNullLiteral>(undefined)

/**
 * EvaluateBooleanLiteral
 */
type TEvaluateBooleanLiteral = Evaluate.EvaluateBooleanLiteral<any, AST.BooleanLiteral<false>>
const VEvaluateBooleanLiteral: TEvaluateBooleanLiteral = false
expectType<TEvaluateBooleanLiteral>(VEvaluateBooleanLiteral)
expectNotType<TEvaluateBooleanLiteral>(true)

/**
 * EvaluateStringLiteral
 */
type TEvaluateStringLiteral = Evaluate.EvaluateStringLiteral<any, AST.StringLiteral<'hoge'>>
const VEvaluateStringLiteral: TEvaluateStringLiteral = 'hoge'
expectType<TEvaluateStringLiteral>(VEvaluateStringLiteral)
expectNotType<TEvaluateStringLiteral>('fuga')

/**
 * EvaluateNumericLiteral
 */
type TEvaluateNumericLiteral = Evaluate.EvaluateNumericLiteral<any, AST.NumericLiteral<7>>
const VEvaluateNumericLiteral: TEvaluateNumericLiteral = 7
expectType<TEvaluateNumericLiteral>(VEvaluateNumericLiteral)
expectNotType<TEvaluateNumericLiteral>(9)

/**
 * PairToObject
 */
type TPairToObject = Evaluate.PairToObject<readonly ['hoge', 'fuga']>
const VPairToObject: TPairToObject = {
  hoge: 'fuga'
}
expectType<TPairToObject>(VPairToObject)

/**
 * ToUnaryFunctionUnion
 */
type TToUnaryFunctionUnion = Evaluate.ToUnaryFunctionUnion<Person>
const VToUnaryFunctionUnion: TToUnaryFunctionUnion = (arg: Person) => {}
expectType<TToUnaryFunctionUnion>(VToUnaryFunctionUnion)

/**
 * UnionToIntersection
 */
type TUnionToIntersection = Evaluate.UnionToIntersection<Person | Admin>
const VUnionToIntersection: TUnionToIntersection = { id: 1, name: 'John', age: 28, isAdmin: true, title: 'CEO' }
expectType<TUnionToIntersection>(VUnionToIntersection)

/**
 * AssembleEntries
 */
type TAssembleEntries = Evaluate.AssembleEntries<[['id', 1]]>
const VAssembleEntries: TAssembleEntries = { id: 1 }
expectType<TAssembleEntries>(VAssembleEntries)
