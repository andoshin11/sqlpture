import { expectType } from 'tsd'
import * as AST from '../src/AST'

const Identifier: AST.Identifier<'MyKey'> = {
  type: 'Identifier',
  name: 'MyKey'
}
expectType<AST.Identifier<'MyKey'>>(Identifier)

