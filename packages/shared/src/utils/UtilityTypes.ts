export type TypedExtract<T, K extends T> = Extract<T, K>;

export type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

export type ValueOf<T> = T[keyof T];

/** Mark some props withing an object as required */
export type SomeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
