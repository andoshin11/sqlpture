type _<T> = T;
export type Merge<T> = _<{ [k in keyof T]: T[k] }>;

export type Joint<T, P> = Merge<{
  [K in keyof T]: K extends keyof P ? T[K] | P[K] : T[K]
} & {
  [_K in Exclude<keyof P, keyof T>]: P[_K]
}>

export type UnionizeValue<U> = U[keyof U]

export type TupleToUnion<T> = T extends { [K in keyof T]: infer U } ? U : never

export type PairToObject<P extends readonly [PropertyKey, any]> = P extends any
  ? {
      [k in P[0]]: P[1];
    }
  : never;

export type ToUnaryFunctionUnion<U> = U extends any ? (arg: U) => void : never;

export type UnionToIntersection<U> = ToUnaryFunctionUnion<U> extends (
  arg: infer I
) => void
  ? I
  : never;

export type AssembleEntries<
  Entries extends Iterable<readonly [PropertyKey, any]>
> = Merge<UnionToIntersection<TupleToUnion<{
  [P in keyof Entries]: Entries[P] extends readonly [PropertyKey, any]
    ? PairToObject<Entries[P]>
    : never
}>>>

export type PushItemToTuple<T, I> = T extends any[] ? [...T, I] : never
