/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import takeWhile from "../../src/modules/takeWhile";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from '../../src/modules/toArray';

describe("takeWhile", () => {
  testUtils.setPrototype('takeWhile', takeWhile);
  
  let fn = () => { };
  
  it("should throw exception when source is null or undefined", () => {
    expect(() => toArray(takeWhile(null, fn))).toThrowError("source is null or undefined");
    expect(() => toArray(takeWhile(undefined, fn))).toThrowError("source is null or undefined");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => toArray(takeWhile([1, 2], null))).toThrowError("predicate is null or undefined");
    expect(() => toArray(takeWhile([1, 2], undefined))).toThrowError("predicate is null or undefined");
  });

  it('should throw an exception when source can not be enumerated', () => {
    expect(() => toArray(takeWhile(123, fn))).toThrowError('source can not be enumerated');
    expect(() => toArray(takeWhile(false, fn))).toThrowError('source can not be enumerated');
  });

  it("should throw exception when predicate is not a function", () => {
    expect(() => toArray(takeWhile([1, 2], {}))).toThrowError("predicate must be a function");
  });

  it("should take elements till elements are matched the specified predicate", () => {
    expect(toArray(asEnumerable([2, 4, 6, 7, 8, 9, 3]).takeWhile(n => n % 2 == 0))).toEqual([2, 4, 6])
  });
});