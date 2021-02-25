import { expectType } from 'tsd'
import { ValidateInsertStatement, ValidateValues } from '../../src/validator/insert'
import { Parse } from '../../src/Parser'
import * as fixtures from '../fixture'

expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.Q200>>>(true)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.Q201>>>(true)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.Q202>>>(true)


expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ200>>>(false)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ201>>>(false)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ202>>>(false)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ203>>>(false)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ204>>>(false)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ205>>>(false)
expectType<ValidateInsertStatement<fixtures.DB, Parse<fixtures.NQ206>>>(false)

/**
 * ValidateValues
 */
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q200>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q201>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.Q202>>>(true)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ202>>>(false)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ203>>>(false)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ204>>>(false)
expectType<ValidateValues<fixtures.DB, Parse<fixtures.NQ205>>>(false)
