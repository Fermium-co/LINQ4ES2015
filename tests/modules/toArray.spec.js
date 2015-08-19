/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";

describe("toArray", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(null).toArray()).toThrowError("source is null or undefined");
    expect(() => toArray(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => toArray({}).toArray()).toThrowError("source must be an enumerable");
  });
  
  it("should change the enumerable return values", () => {
    let result = [1, 2, 3].asEnumerable().toArray();
    expect(result).toEqual([1, 2, 3]);
  });
});