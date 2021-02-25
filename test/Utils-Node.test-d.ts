import * as Utils from '../src/Utils/Node'
import * as fixtures from './fixture'
import { Parse } from '../src/Parser'
import { SelectStatement } from '../src/AST'

type T1 = Utils.ExtractAllFieldNames<fixtures.DB>
type T2 = Parse<fixtures.NQ10> extends SelectStatement<infer Fields, infer From, infer Joins, infer Where, infer Limit, infer Offset>
  ? Utils.ToJoinedSchema<fixtures.DB, From, Joins>['joins']
  : never