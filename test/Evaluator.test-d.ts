import { expectType, expectNotType } from 'tsd'
import * as Evaluate from '../src/Evaluator'
import * as Parser from '../src/Parser'
import * as AST from '../src/AST'
import { DB, query1, query2, query3, Q2, Q3 } from './fixture'
import { Merge } from '../src/Utils'

// type TExtractJoinAlias = Parser.Parse<query1> extends AST.SelectStatement<infer Fields, infer From, infer Join> ? Evaluate.ExtractJoinAlias<Join[0]> : never
// const VExtractJoinAlias: TExtractJoinAlias = 'team'
// expectType<TExtractJoinAlias>(VExtractJoinAlias)

/**
 * FilterUndefined
 */
type TFilterUndefined = Evaluate.FilterUndefined<[1, undefined, '2', true, undefined]>
const VFilterUndefined: TFilterUndefined = [1, '2', true]
expectType<TFilterUndefined>(VFilterUndefined)

/**
 * ExtractFields
 */
// type TExtractFields = Parser.Parse<Q2> extends AST.SelectStatement<infer Fields, infer From, infer Join>
//   ? From extends AST.TableSpecifier<AST.Identifier<infer Source>, AST.Identifier<infer Alias>>
//     ? Source extends keyof DB['schema']
//       ? Evaluate.ExtractFields<
//           Evaluate.CollectInputRows<DB, From, Join>,
//           Fields,
//           Merge<Evaluate.UnionToIntersection<Evaluate.AssembleEntries<[[Alias & string, DB['schema'][Source]]]>>>
//         >
//       : never
//     : never
//   : never
// const VExtractFields: TExtractFields = ['John', 'Smith', null]
// expectType<TExtractFields>(VExtractFields)

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
