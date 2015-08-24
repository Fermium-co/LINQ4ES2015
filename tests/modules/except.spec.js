/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import except from "../../src/modules/except";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe("except", () => {
  testUtils.setPrototype('except', except);

  it("should throw an exception when the first is null or undefined", () => {
    expect(() => toArray(except(null, []))).toThrowError("first is null or undefined");
    expect(() => toArray(except(undefined, []))).toThrowError("first is null or undefined");
  });

  it("should throw an exception when the second is null or undefined", () => {
    expect(() => toArray(except([], null))).toThrowError("second is null or undefined");
    expect(() => toArray(except([], undefined))).toThrowError("second is null or undefined");
  });

  it("should throw an exception when the first is not an enumerable", () => {
    expect(() => toArray(except(123, []))).toThrowError("source can not be enumerated");
    expect(() => toArray(except(false, []))).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second is not an enumerable", () => {
    expect(() => toArray(except([], 123))).toThrowError("source can not be enumerated");
    expect(() => toArray(except([], false))).toThrowError("source can not be enumerated");
  });

  it("should return distinct exception of two enumerables", () => {
    expect(toArray(asEnumerable([1, 2, 2, 3, 3, 3, 4]).except([3, 2, 5, 5]))).toEqual([1, 4]);
    expect(toArray(except([1, 2, 2, 3, 3, 3, 4], [2, 3, 5, 5]))).toEqual([1, 4]);
  });

  it("should return distinct elements of two enumerables based on a comparer", () => {
    expect(toArray(asEnumerable([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' },
      { id: 5, name: 'iman' },
    ]).except([
      { id: 3, name: 'farshad' },
      { id: 2, name: 'yasi' },
      { id: 4, name: 'amin' }
    ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 5, name: 'iman' }]);

    expect(toArray(except([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' },
      { id: 5, name: 'iman' },
    ], [
        { id: 3, name: 'farshad' },
        { id: 2, name: 'yasi' },
        { id: 4, name: 'amin' }
      ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 5, name: 'iman' }]);
  });
});