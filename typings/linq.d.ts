declare module 'linq4es2015/linq' {
  export default class Linq {
    static setExtensions(): void;
    static repeat<T>(element: T, count: number): Enumerable<T>;
    static range(start: number, count: number): Enumerable<number>;
    static empty<T>(): Enumerable<T>;
    static asEnumerable<T>(source: T[]): Enumerable<T>;

    static aggregate(): any;
    static all(): any;
    static any(): any;
    static average(): any;
    static concat(): any;
    static contains(): any;
    static count(): any;
    static defaultIfEmpty(): any;
    static distinct(): any;
    static elementAt(): any;
    static elementAtOrDefault(): any;
    static except(): any;
    static first(): any;
    static firstOrDefault(): any;
    static groupBy(): any;
    static groupJoin(): any;
    static intersect(): any;
    static join(): any;
    static last(): any;
    static lastOrDefault(): any;
    static max(): any;
    static min(): any;
    static orderBy(): any;
    static orderByDescending(): any;
    static reverse(): any;
    static select(): any;
    static selectMany(): any;
    static sequenceEqual(): any;
    static single(): any;
    static singleOrDefault(): any;
    static skip(): any;
    static skipWhile(): any;
    static sortBy(): any;
    static sum(): any;
    static take(): any;
    static takeWhile(): any;
    static thenBy(): any;
    static thenByDescending(): any;
    static toArray(): any;
    static toLookup(): any;
    static union(): any;
    static where(): any;
    static zip(): any;
  }
}

interface Enumerable<T> {
  concat(enumerable: Enumerable<T>): Enumerable<T>;
  all(predicate: (i: T) => boolean): Enumerable<T>;
  where(predicate: (i: T) => boolean): Enumerable<T>;
  select<T2>(transformation: (i: T) => T2): Enumerable<T2>;
  selectMany<T2>(collectionSelector: (c: Enumerable<T>) => T2, resultSelector?): Enumerable<T2>;
  reverse(): Enumerable<T>;
  take(count: number): Enumerable<T>;
  skip(count: number): Enumerable<T>;
  contains(value, comparer?: (a, b) => boolean): boolean;
  except(other: T[], comparer?: (a, b) => boolean): Enumerable<T>;
  toArray(): T[];
}

interface Array<T> {
  asEnumerable(): Enumerable<T>;
}
interface String {
  asEnumerable(): Enumerable<string>;
}
