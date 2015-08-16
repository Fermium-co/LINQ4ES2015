/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import lastOrDefault from "../../src/modules/lastOrDefault";

describe("lastOrDefault", () => {

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => lastOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => lastOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => lastOrDefault({})).toThrowError("source must be an enumerable");
  });

  it("should return null if there is no element", () => {
    expect([].asEnumerable().lastOrDefault()).toEqual(null);
    expect(lastOrDefault([])).toEqual(null);
  });

  it("should return null if there is no element passing the predicate", () => {
    expect([1, 3, 5].asEnumerable().lastOrDefault(n => n % 2 === 0)).toEqual(null);
    expect(lastOrDefault([1, 3, 5], n => n % 2 === 0)).toEqual(null);
  });

  it("should return the last element of an enumerable", () => {
    expect([1, 2, 3].asEnumerable().lastOrDefault()).toEqual(3);
    expect(lastOrDefault([1, 2, 3])).toEqual(3);
  });

  it("should return the last element of an enumerable passing a predicate", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().lastOrDefault(n => n % 2 === 0)).toEqual(4);
    expect(lastOrDefault([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(4);
  });
});