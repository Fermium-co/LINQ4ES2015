/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import toArray from "../../src/modules/toArray";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";

describe("toArray", () => {
  testUtils.setPrototype('toArray', toArray);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(null)).toThrowError("source is null or undefined");
    expect(() => toArray(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(123)).toThrowError("source can not be enumerated");
    expect(() => toArray(false)).toThrowError("source can not be enumerated");
  });
  
  it("should change the enumerable return values", () => {
    expect(asEnumerable([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
  });
});