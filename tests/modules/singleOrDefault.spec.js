/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import singleOrDefault from "../../src/modules/singleOrDefault";

describe("singleOrDefault", () => {
  it("should throws an exception when the source is null or undefined", () => {
    expect(() => singleOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => singleOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not an enumerable", () => {
    expect(() => singleOrDefault({})).toThrowError("source must be an enumerable");
  });

  it("should return null if there is no element", () => {
    expect([].asEnumerable().singleOrDefault()).toEqual(null);
    expect(singleOrDefault([])).toEqual(null);
  });

  it("should return null if there is no element passing the predicate", () => {
    expect([1, 3, 5].asEnumerable().singleOrDefault(n => n % 2 === 0)).toEqual(null);
    expect(singleOrDefault([1, 3, 5], n => n % 2 === 0)).toEqual(null);
  });

  it("should throw if there is more than one element", () => {
    expect(() => [1, 2].asEnumerable().singleOrDefault()).toThrowError("Sequence contained multiple elements");
    expect(() => singleOrDefault([1, 2])).toThrowError("Sequence contained multiple elements");
  });

  it("should throw if there is  more than one element passing the predicate", () => {
    expect(() => [1, 3, 5].asEnumerable().singleOrDefault(n => n % 2 !== 0)).toThrowError("Sequence contained multiple matching elements");
    expect(() => singleOrDefault([1, 3, 5], n => n % 2 !== 0)).toThrowError("Sequence contained multiple matching elements");
  });

  it("should return the single element of an enumerable", () => {
    expect([1].asEnumerable().singleOrDefault()).toEqual(1);
    expect(singleOrDefault([1])).toEqual(1);
  });

  it("should return the single element of an enumerable passing a predicate", () => {
    expect([1, 2, 3].asEnumerable().singleOrDefault(n => n % 2 === 0)).toEqual(2);
    expect(singleOrDefault([1, 2, 3], n => n % 2 === 0)).toEqual(2);
  });
});