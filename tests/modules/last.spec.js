/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import last from "../../src/modules/last";

describe("last", () => {

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => last(null)).toThrowError("source is null or undefined");
    expect(() => last(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => last({})).toThrowError("source must be an enumerable");
  });

  it("should throw if there is no element", () => {
    expect([].asEnumerable().last()).toThrowError("Sequence is empty");
    expect(last([])).toThrowError("Sequence is empty");
  });

  it("should throw if there is no element passing the predicate", () => {
    expect([1, 3, 5].asEnumerable().last(n => n % 2 === 0)).toThrowError("No items matched the predicate");
    expect(last([1, 3, 5], n => n % 2 === 0)).toThrowError("No items matched the predicate");
  });

  it("should return the last element of an enumerable", () => {
    expect([1, 2, 3].asEnumerable().last()).toEqual(3);
    expect(last([1, 2, 3])).toEqual(3);
  });

  it("should return the last element of an enumerable passing a predicate", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().last(n => n % 2 === 0)).toEqual(4);
    expect(last([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(4);
  });
});