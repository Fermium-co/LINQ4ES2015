/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import intersect from "../../src/modules/intersect";

describe("intersect", () => {
  it("should throw an exception when the first is null or undefined", () => {
    expect(() => intersect(null, []).toArray()).toThrowError("first is null or undefined");
    expect(() => intersect(undefined, []).toArray()).toThrowError("first is null or undefined");
  });

  it("should throw an exception when the second is null or undefined", () => {
    expect(() => intersect([], null).toArray()).toThrowError("second is null or undefined");
    expect(() => intersect([], undefined).toArray()).toThrowError("second is null or undefined");
  });

  it("should throw an exception when the first is not an enumerable", () => {
    expect(() => intersect({}, []).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second is not an enumerable", () => {
    expect(() => intersect([], {}).toArray()).toThrowError("source can not be enumerated");
  });

  it("should return distinct intersection of two enumerables", () => {
    expect([1, 2, 2, 3, 3, 3].asEnumerable().intersect([3, 2, 4, 5]).toArray()).toEqual([2, 3]);
    expect(intersect([1, 2, 2, 3, 3, 3], [2, 3, 4, 5]).toArray()).toEqual([2, 3]);
  });

  it("should return distinct intersection of two enumerables based on a comparer", () => {
    expect([
      { id: 1, name: "saleh" },
      { id: 2, name: "yasser" },
      { id: 1, name: "sali" }
    ].asEnumerable()
      .intersect([
        { id: 3, name: "farshad" },
        { id: 2, name: "yasi" },
        { id: 1, name: "salooo" }
      ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: "saleh" }, { id: 2, name: "yasser" }]);

    expect(intersect([
      { id: 1, name: "saleh" },
      { id: 2, name: "yasser" },
      { id: 1, name: "sali" }
    ], [
        { id: 3, name: "farshad" },
        { id: 2, name: "yasi" },
        { id: 1, name: "salooo" }
      ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: "saleh" }, { id: 2, name: "yasser" }]);
  });
});