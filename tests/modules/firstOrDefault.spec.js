/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import firstOrDefault from "../../src/modules/firstOrDefault";

describe("firstOrDefault", () => {

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => firstOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => firstOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => firstOrDefault({})).toThrowError("source must be an enumerable");
  });

  it("should return null if there is no element", () => {
    expect([].asEnumerable().firstOrDefault()).toEqual(null);
    expect(firstOrDefault([])).toEqual(null);
  });

  it("should return null if there is no element passing the predicate", () => {
    expect([1, 3, 5].asEnumerable().firstOrDefault(n => n % 2 === 0)).toEqual(null);
    expect(firstOrDefault([1, 3, 5], n => n % 2 === 0)).toEqual(null);
  });

  it("should return the first element of an enumerable", () => {
    expect([1, 2, 3].asEnumerable().firstOrDefault()).toEqual(1);
    expect(firstOrDefault([1, 2, 3])).toEqual(1);
  });

  it("should return the first element of an enumerable passing a predicate", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().firstOrDefault(n => n % 2 === 0)).toEqual(2);
    expect(firstOrDefault([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});