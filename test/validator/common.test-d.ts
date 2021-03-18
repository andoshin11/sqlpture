import { expectType } from 'tsd'
import { ValidateWhereExpression } from '../../src/validator/common'
import { Parse } from '../../src/Parser'
import * as fixtures from '../fixture'

/**
 * ValidateWhereExpression
 */
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.Q300>>>(true)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.Q301>>>(true)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.Q302>>>(true)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.Q303>>>(true)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.NQ303>>>(false)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.NQ304>>>(false)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.NQ305>>>(false)
expectType<ValidateWhereExpression<fixtures.DB, Parse<fixtures.NQ306>>>(false)
