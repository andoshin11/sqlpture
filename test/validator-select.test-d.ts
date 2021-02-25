import { expectType } from 'tsd'
import * as select from '../src/validator/select'
import {
  ValidateSelectStatement,
  ValidateJoinClauses,
  ValidateFromClause,
  ValidateFieldList
} from '../src/validator/select'
import { Parse } from '../src/Parser'
import * as fixtures from './fixture'

type isValidSelectStatement<Query> = Parse<Query> extends select.ValidSelectStatement<fixtures.DB> ? true : false
type V1 = select.ValidSelectStatement<fixtures.DB>
type V2 = V1['joins']
type V3<S extends V2> = S
type ValidQuery<Query extends select.ValidSelectStatement<fixtures.DB>> = any

/**
 * ValidSelectStatement
 */
expectType<isValidSelectStatement<fixtures.Q27>>(true)
expectType<isValidSelectStatement<fixtures.Q28>>(true)
expectType<isValidSelectStatement<fixtures.NQ2>>(false)
expectType<isValidSelectStatement<fixtures.NQ3>>(false)

type TValidSelectStatementQ27 = ValidQuery<Parse<fixtures.Q27>>
type TValidSelectStatementQ28 = ValidQuery<Parse<fixtures.Q28>>
// @ts-expect-error
type TValidSelectStatementNQ1 = ValidQuery<Parse<fixtures.NQ1>>
// @ts-expect-error
type TValidSelectStatementNQ2 = ValidQuery<Parse<fixtures.NQ2>>
// @ts-expect-error
type TValidSelectStatementNQ3 = ValidQuery<Parse<fixtures.NQ3>>
type TValidSelectStatementQ11 = ValidQuery<Parse<fixtures.Q11>>
type TValidSelectStatementNQ4 = ValidQuery<Parse<fixtures.NQ4>> // should throw an error in future
type TValidSelectStatementQ15 = ValidQuery<Parse<fixtures.Q15>>
type TValidSelectStatementQ16 = ValidQuery<Parse<fixtures.Q16>>

type T1 = Parse<fixtures.Q11>['where']
type T3 = Parse<fixtures.Q32>['fields']

/**
 * ValidateSelectStatement
 */
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q1>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q2>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q3>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q4>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q5>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q6>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q7>>>(true)
// @ts-expect-error
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q8>>>(true) // FIXME
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q9>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q10>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q11>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q12>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q13>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q14>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q15>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q16>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q17>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q18>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q19>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q20>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q21>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q22>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q23>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q24>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q25>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q26>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q28>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q29>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q30>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q31>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q32>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q33>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q34>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q35>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q36>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q37>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q38>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q39>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.Q40>>>(true)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ1>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ2>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ3>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ4>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ5>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ6>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ7>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ8>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ9>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ10>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ11>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ12>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ13>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ14>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ15>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ16>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ17>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ18>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ19>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ20>>>(false)
// @ts-expect-error
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ21>>>(false) // FIXME
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ22>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ23>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ24>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ25>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ26>>>(false)
expectType<ValidateSelectStatement<fixtures.DB, Parse<fixtures.NQ27>>>(false)

/**
 * ValidateFieldList
 */
expectType<ValidateFieldList<fixtures.DB, Parse<fixtures.Q30>>>(true)
expectType<ValidateFieldList<fixtures.DB, Parse<fixtures.Q32>>>(true)
expectType<ValidateFieldList<fixtures.DB, Parse<fixtures.NQ6>>>(false)
expectType<ValidateFieldList<fixtures.DB, Parse<fixtures.NQ7>>>(false)
expectType<ValidateFieldList<fixtures.DB, Parse<fixtures.NQ8>>>(false)
expectType<ValidateFieldList<fixtures.DB, Parse<fixtures.NQ9>>>(false)

/**
 * ValidateFromClause
 */
expectType<ValidateFromClause<fixtures.DB, Parse<fixtures.Q3>>>(true)
expectType<ValidateFromClause<fixtures.DB, Parse<fixtures.Q32>>>(true)
expectType<ValidateFromClause<fixtures.DB, Parse<fixtures.NQ1>>>(false)
expectType<ValidateFromClause<fixtures.DB, Parse<fixtures.NQ5>>>(false)

/**
 * ValidateJoinClauses
 */
expectType<ValidateJoinClauses<fixtures.DB, Parse<fixtures.Q27>>>(true)
expectType<ValidateJoinClauses<fixtures.DB, Parse<fixtures.Q28>>>(true)
expectType<ValidateJoinClauses<fixtures.DB, Parse<fixtures.NQ2>>>(false)
expectType<ValidateJoinClauses<fixtures.DB, Parse<fixtures.NQ3>>>(false)
expectType<ValidateJoinClauses<fixtures.DB, Parse<fixtures.NQ10>>>(false)
