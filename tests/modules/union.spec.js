/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import union from "../../src/modules/union";

describe("union", () => {
  it("should throw an exception when the first is null or undefined", () => {
    expect(() => union(null, []).toArray()).toThrowError("first is null or undefined");
    expect(() => union(undefined, []).toArray()).toThrowError("first is null or undefined");
  });

  it("should throw an exception when the second is null or undefined", () => {
    expect(() => union([], null).toArray()).toThrowError("second is null or undefined");
    expect(() => union([], undefined).toArray()).toThrowError("second is null or undefined");
  });

  it("should throw an exception when the first is not an enumerable", () => {
    expect(() => union({}, []).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second is not an enumerable", () => {
    expect(() => union([], {}).toArray()).toThrowError("source can not be enumerated");
  });

  it("should return union elements of two enumerables", () => {
    expect([1, 2, 2, 3, 3, 3].asEnumerable().union([3, 4, 5, 6]).toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(union([1, 2, 2, 3, 3, 3], [3, 4, 5, 6]).toArray()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("should return union and distinct elements of two enumerables based on a comparer", () => {
    expect([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ].asEnumerable()
      .union([
        { id: 3, name: 'farshad' },
        { id: 2, name: 'yasi' },
        { id: 1, name: 'salooo' }
      ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }, { id: 3, name: 'farshad' }]);

    expect(union([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ], [
        { id: 3, name: 'farshad' },
        { id: 2, name: 'yasi' },
        { id: 1, name: 'salooo' }
      ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }, { id: 3, name: 'farshad' }]);
  });
});