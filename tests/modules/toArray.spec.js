/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";

describe("toArray", () => {

  it("should change the enumerable return values", () => {
    let result = [1, 2, 3].asEnumerable().toArray();
    expect(result).toEqual([1, 2, 3]);
  });

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => toArray(null).toArray()).toThrowError("source is null or undefined");
    expect(() => toArray(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => toArray({}).toArray()).toThrowError("source must be an enumerable");
  });
});