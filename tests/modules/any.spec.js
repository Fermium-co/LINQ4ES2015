/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import any from "../../src/modules/any";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("any", () => {
  testUtils.setPrototype('any', any);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => any(null)).toThrowError("source is null or undefined");
    expect(() => any(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => any(123)).toThrowError("source can not be enumerated");
    expect(() => any(false)).toThrowError("source can not be enumerated");
  });

  it("should return true when enumerable has any member", () => {
    expect(asEnumerable([1, 2, 3]).any()).toEqual(true);
    expect(any([1, 2, 3])).toEqual(true);
  });
  
  it("should return false when enumerable has no member", () => {
    expect(asEnumerable([]).any()).toEqual(false);
    expect(any([])).toEqual(false);
  });

  it("should return true when enumerable has at least one item passing the predicate", () => {
    expect(asEnumerable([1, 2, 3]).any(n => n % 2 === 0)).toEqual(true);
    expect(any([1, 2, 3], n => n % 2 === 0)).toEqual(true);
  });

  it("should return false when no item passes the predicate", () => {
    expect(asEnumerable([1, 2, 3]).any(n => n > 3)).toEqual(false);
    expect(any([1, 2, 3], n => n > 3)).toEqual(false);
  });
});

