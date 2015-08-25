/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import elementAtOrDefault from "../../src/modules/elementAtOrDefault";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("elementAtOrDefault", () => {
  testUtils.setPrototype('elementAtOrDefault', elementAtOrDefault);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => elementAtOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => elementAtOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should return null when the index is not a number", () => {
    expect(elementAtOrDefault([], null)).toEqual(null);
    expect(elementAtOrDefault([], undefined)).toEqual(null);
    expect(elementAtOrDefault([], false)).toEqual(null);
    expect(elementAtOrDefault([], '1')).toEqual(null);
    expect(elementAtOrDefault([], {})).toEqual(null);
  });

  it("should return null when the index is negetive", () => {
    expect(elementAtOrDefault([], -1)).toEqual(null);
  });

  it('should return null when the enumerable has no elements', () => {
    expect(elementAtOrDefault([], 0)).toEqual(null);
  });
  
  it('should throw an exception when the source can not be enumerated', () => {
    expect(() => elementAtOrDefault(123, 0)).toThrowError('source can not be enumerated');
    expect(() => elementAtOrDefault(false, 0)).toThrowError('source can not be enumerated');
  });

  it("should return the element at specified index", () => {
    expect(asEnumerable([1, 3, 5]).elementAtOrDefault(2)).toEqual(5);
    expect(elementAtOrDefault([1, 3, 5], 0)).toEqual(1);
    expect(asEnumerable([1, 3, 5]).elementAtOrDefault(6)).toEqual(null);
    expect(elementAtOrDefault([1, 3, 5], 6)).toEqual(null);
  });
});