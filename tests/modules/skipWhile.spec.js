/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import skipWhile from "../../src/modules/skipWhile";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from '../../src/modules/toArray';

describe("skipWhile", () => {
  testUtils.setPrototype('skipWhile', skipWhile);
  
  let fn = () => { };
  
  it("should throw exception when source is null or undefined", () => {
    expect(() => toArray(skipWhile(null, fn))).toThrowError("source is null or undefined");
    expect(() => toArray(skipWhile(undefined, fn))).toThrowError("source is null or undefined");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => toArray(skipWhile([1, 2], null))).toThrowError("predicate is null or undefined");
    expect(() => toArray(skipWhile([1, 2], undefined))).toThrowError("predicate is null or undefined");
  });

  it('should throw an exception when source can not be enumerated', () => {
    expect(() => toArray(skipWhile(123, fn))).toThrowError('source can not be enumerated');
    expect(() => toArray(skipWhile(false, fn))).toThrowError('source can not be enumerated');
  });

  it("should throw exception when predicate is not a function", () => {
    expect(() => toArray(skipWhile([1, 2], {}))).toThrowError("predicate must be a function");
  });

  it("should skip elements of an enumerable till the first match to the specified predicate", () => {
    expect(toArray(asEnumerable([2, 4, 6, 7, 8, 9, 3]).skipWhile(n => n % 2 == 0))).toEqual([7, 8, 9, 3])
  });
});