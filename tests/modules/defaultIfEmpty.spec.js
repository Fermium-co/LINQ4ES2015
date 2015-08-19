/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import defaultIfEmpty from "../../src/modules/defaultIfEmpty";

describe("defaultIfEmpty", () => {
  it("should throw exception when source is null or empty", () => {
    expect(() => defaultIfEmpty(null).toArray()).toThrowError("source is null or undefined");
    expect(() => defaultIfEmpty(undefined).toArray()).toThrowError("source is null or undefined");
  });
  
  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => defaultIfEmpty({}).toArray()).toThrowError("source must be an enumerable");
  });

  it("should return default value when source is empty and defaultValue of parameter is null", () => {
    expect([].asEnumerable().defaultIfEmpty().toArray()).toEqual([undefined]);
  });

  it("should return parameter defaultValue when array is empty", () => {
    expect([].asEnumerable().defaultIfEmpty("test").toArray()).toEqual(["test"]);
  });

  it("should return same array when array is not empty", () => {
    expect([1, 2, 3].asEnumerable().defaultIfEmpty(3).toArray()).toEqual([1, 2, 3]);
  });
});
