type _<T> = T;
export type Merge<T> = _<{ [k in keyof T]: T[k] }>;

export type Joint<T, P> = Merge<{
  [K in keyof T]: K extends keyof P ? T[K] | P[K] : T[K]
} & {
  [_K in Exclude<keyof P, keyof T>]: P[_K]
}>

export type UnionizeValue<U> = U[keyof U]
