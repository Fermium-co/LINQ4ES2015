/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import defaultIfEmpty from "../../src/modules/defaultIfEmpty";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe("defaultIfEmpty", () => {
  testUtils.setPrototype('defaultIfEmpty', defaultIfEmpty);
  
  it("should throw exception when source is null or empty", () => {
    expect(() => toArray(defaultIfEmpty(null))).toThrowError("source is null or undefined");
    expect(() => toArray(defaultIfEmpty(undefined))).toThrowError("source is null or undefined");
  });
  
  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => toArray(defaultIfEmpty(123))).toThrowError("source can not be enumerated");
    expect(() => toArray(defaultIfEmpty(false))).toThrowError("source can not be enumerated");
  });

  it("should return default value when source is empty", () => {
    expect(toArray(asEnumerable([]).defaultIfEmpty('default123'))).toEqual(['default123']);
    expect(toArray(defaultIfEmpty([], 'default321'))).toEqual(['default321']);
  });

  it("should return the enumerable when it is not empty", () => {
    expect(toArray(asEnumerable([1, 2, 3]).defaultIfEmpty(456))).toEqual([1, 2, 3]);
    expect(toArray(defaultIfEmpty([1, 2, 3], 456))).toEqual([1, 2, 3]);
  });
});
