/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import groupBy from "../../src/modules/groupBy";

describe("groupBy", () => {
  let fn = () => { };

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => groupBy(null, fn, fn).toArray()).toThrowError("source is null or undefined");
    expect(() => groupBy(undefined, fn, fn).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the keySelector is null or undefined", () => {
    expect(() => groupBy([], null, fn).toArray()).toThrowError("keySelector is null or undefined");
    expect(() => groupBy([], undefined, fn).toArray()).toThrowError("keySelector is null or undefined");
  });

  it("should throw an exception when the elementSelector is null or undefined", () => {
    expect(() => groupBy([], fn, null).toArray()).toThrowError("elementSelector is null or undefined");
    expect(() => groupBy([], fn, undefined).toArray()).toThrowError("elementSelector is null or undefined");
  });

  it("should throw when the source is not an enumerable", () => {
    expect(() => groupBy({}, fn, fn).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw when the keySelector is not Function", () => {
    expect(() => groupBy([], {}, fn).toArray()).toThrowError("keySelector must be a Function");
  });
  
  it("should throw when the elementSelector is not Function", () => {
    expect(() => groupBy([], fn, {}).toArray()).toThrowError("elementSelector must be a Function");
  });

  it("should return a grouped result of an enumerable based on a comparer", () => {
    expect(["abc", "hello", "def", "there", "four"]
      .asEnumerable()
      .groupBy(x => x.length, x=> x[0], (key, elements) => key + ':' + elements.join(';'))
      .toArray())
      .toEqual(["3:a;d", "5:h;t", "4:f"]);
  });
});