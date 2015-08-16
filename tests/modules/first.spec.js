/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import first from "../../src/modules/first";

describe("first", () => {

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => first(null).toArray()).toThrowError("source is null or undefined");
    expect(() => first(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => first({}).toArray()).toThrowError("source must be an enumerable");
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