/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import intersect from "../../src/modules/intersect";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe("intersect", () => {
  testUtils.setPrototype('intersect', intersect);

  it("should throw an exception when the first is null or undefined", () => {
    expect(() => toArray(intersect(null, []))).toThrowError("first is null or undefined");
    expect(() => toArray(intersect(undefined, []))).toThrowError("first is null or undefined");
  });

  it("should throw an exception when the second is null or undefined", () => {
    expect(() => toArray(intersect([], null))).toThrowError("second is null or undefined");
    expect(() => toArray(intersect([], undefined))).toThrowError("second is null or undefined");
  });

  it("should throw an exception when the first is not an enumerable", () => {
    expect(() => toArray(intersect(123, []))).toThrowError("source can not be enumerated");
    expect(() => toArray(intersect(false, []))).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second is not an enumerable", () => {
    expect(() => toArray(intersect([], 123))).toThrowError("source can not be enumerated");
    expect(() => toArray(intersect([], false))).toThrowError("source can not be enumerated");
  });

  it("should return distinct intersection of two enumerables", () => {
    expect(toArray(asEnumerable([1, 2, 2, 3, 3, 3]).intersect([3, 2, 4, 5]))).toEqual([2, 3]);
    expect(toArray(intersect([1, 2, 2, 3, 3, 3], [2, 3, 4, 5]))).toEqual([2, 3]);
  });

  it("should return distinct intersection of two enumerables based on a comparer", () => {
    expect(toArray(asEnumerable([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ])
      .intersect([
        { id: 3, name: 'farshad' },
        { id: 2, name: 'yasi' },
        { id: 1, name: 'salooo' }
      ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }]);

    expect(toArray(intersect([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ], [
        { id: 3, name: 'farshad' },
        { id: 2, name: 'yasi' },
        { id: 1, name: 'salooo' }
      ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }]);
  });
});