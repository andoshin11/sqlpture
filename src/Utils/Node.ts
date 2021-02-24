import { InnerJoinSpecifier, TableSpecifier, Identifier } from '../AST'
import { Database } from '../Schema'
import { UnionizeValue } from './ObjectUtils'

export type ExtractAllFieldNames<DB extends Database> = UnionizeValue<{ [K in keyof DB['schema']]: keyof DB['schema'][K] }>

export type ExtractJoinAlias<Join> = Join extends InnerJoinSpecifier<
TableSpecifier<Identifier<any>, Identifier<infer Alias>>
>
  ? Alias
  : never;

export type ExtractJoinSource<Join> = Join extends InnerJoinSpecifier<TableSpecifier<Identifier<infer Source>, Identifier<any>>>
 ? Source
 : never
