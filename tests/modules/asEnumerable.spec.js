/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from "../../src/modules/asEnumerable";

describe("asEnumerable", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => asEnumerable(null).toArray()).toThrowError("source is null or undefined");
    expect(() => asEnumerable(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source can not be enumerated", () => {
    expect(() => asEnumerable({}).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the source is enumerable", () => {
    expect(() => asEnumerable((function* () { })()).toArray()).toThrowError("enumerable may not be enumerated twice");
  });

  it("should enumerate an enumerable correctly", () => {
    expect("Test".asEnumerable().toArray()).toEqual(["T", "e", "s", "t"]);
    expect([1, 2, 3].asEnumerable().toArray()).toEqual([1, 2, 3]);
  });

});