import { expectType } from 'tsd'
import * as common from '../../src/parser/common'
import * as fixtures from '../fixture'

/**
 * ParseIdentifier
 */
// type TParseIdentifier1 = common.ParseIdentifier<>

/**
 * ParseExpression
 */
type TParseExpression1 = common.ParseExpression<'WHERE id = 1'>