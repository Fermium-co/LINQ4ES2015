/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import first from "../../src/modules/first";

describe("first", () => {
  it("should throws an exception when the source is null or undefined", () => {
    expect(() => first(null)).toThrowError("source is null or undefined");
    expect(() => first(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not an enumerable", () => {
    expect(() => first({})).toThrowError("source must be an enumerable");
  });

  it("should throw if there is no element", () => {
    expect(() => [].asEnumerable().first()).toThrowError("Sequence is empty");
    expect(() => first([])).toThrowError("Sequence is empty");
  });

  it("should throw if there is no element passing the predicate", () => {
    expect(() => [1, 3, 5].asEnumerable().first(n => n % 2 === 0)).toThrowError("No items matched the predicate");
    expect(() => first([1, 3, 5], n => n % 2 === 0)).toThrowError("No items matched the predicate");
  });

  it("should return the first element of an enumerable", () => {
    expect([1, 2, 3].asEnumerable().first()).toEqual(1);
    expect(first([1, 2, 3])).toEqual(1);
  });

  it("should return the first element of an enumerable passing a predicate", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().first(n => n % 2 === 0)).toEqual(2);
    expect(first([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});