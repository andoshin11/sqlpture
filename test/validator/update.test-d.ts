import { expectType } from 'tsd'
import { ValidateValues, ValidateUpdateStatement } from '../../src/validator/update'
import { Parse } from '../../src/Parser'
import * as fixtures from '../fixture'

/**
 * ValidateUpdateStatement
 */
type T1 = ValidateUpdateStatement<fixtures.DB, Parse<fixtures.Q300>>
expectType<ValidateUpdateStatement<fixtures.DB, Parse<fixtures.Q300>>>(true)
expectType<ValidateUpdateStatement<fixtures.DB, Parse<fixtures.Q301>>>(true)


/**
 * ValidateValues
 */
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q300>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q301>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q302>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q303>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ300>>>(false)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ301>>>(false)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ302>>>(false)
