/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import firstOrDefault from "../../src/modules/firstOrDefault";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("firstOrDefault", () => {
  testUtils.setPrototype('firstOrDefault', firstOrDefault);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => firstOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => firstOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => firstOrDefault(123)).toThrowError("source can not be enumerated");
    expect(() => firstOrDefault(false)).toThrowError("source can not be enumerated");
  });

  it("should return null if there is no element", () => {
    expect(asEnumerable([]).firstOrDefault()).toEqual(null);
    expect(firstOrDefault([])).toEqual(null);
  });

  it("should return null if there is no element passing the predicate", () => {
    expect(asEnumerable([1, 3, 5]).firstOrDefault(n => n % 2 === 0)).toEqual(null);
    expect(firstOrDefault([1, 3, 5], n => n % 2 === 0)).toEqual(null);
  });

  it("should return the first element of an enumerable", () => {
    expect(asEnumerable([1, 2, 3]).firstOrDefault()).toEqual(1);
    expect(firstOrDefault([1, 2, 3])).toEqual(1);
  });

  it("should return the first element of an enumerable passing a predicate", () => {
    expect(asEnumerable([1, 2, 3, 4, 5]).firstOrDefault(n => n % 2 === 0)).toEqual(2);
    expect(firstOrDefault([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});