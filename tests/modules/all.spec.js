/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import all from "../../src/modules/all";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("all", () => {
  testUtils.setPrototype('all', all);
  let fn = () => { };
  
  it("should throw exception when source is null or undefined", () => {
    expect(() => all(null, fn).toThrowError("source is null or undefined"));
    expect(() => all(undefined, fn)).toThrowError("source is null or undefined");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => all([], undefined)).toThrowError("predicate is null or undefined");
    expect(() => all([], null)).toThrowError("predicate is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => all(123, fn)).toThrowError("source can not be enumerated");
    expect(() => all(false, fn)).toThrowError("source can not be enumerated");
  });

  it("should return true when enumerable is empty", () => {
    expect(asEnumerable([]).all(fn)).toEqual(true);
    expect(all([], fn)).toEqual(true);
  });

  it("should return true when all items in enumerable passing the predicate", () => {
    expect(asEnumerable([1, 2, 3]).all(n => n < 4)).toEqual(true);
    expect(all([1, 2, 3], n => n < 4)).toEqual(true);
  });

  it("should return false when at least one item doesn't pass the predicate", () => {
    expect(asEnumerable([1, 2, 3, 4]).all(n => n < 4)).toEqual(false);
    expect(all([1, 2, 3, 4], n => n < 4)).toEqual(false);
  });
});