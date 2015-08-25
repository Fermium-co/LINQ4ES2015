/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import contains from "../../src/modules/contains";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("contains", () => {
  testUtils.setPrototype('contains', contains);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => contains(null)).toThrowError("source is null or undefined");
    expect(() => contains(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => contains(123)).toThrowError("source can not be enumerated");
    expect(() => contains(false)).toThrowError("source can not be enumerated");
  });

  it("should return true when enumerable contains an item", () => {
    expect(asEnumerable([1, 2, 3]).contains(2)).toEqual(true);
  });

  it("should return false when enumerable does not contain an item", () => {
    expect(asEnumerable([1, 2, 3]).contains(4)).toEqual(false);
  });
});

