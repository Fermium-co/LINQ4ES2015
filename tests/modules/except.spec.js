/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import except from "../../src/modules/except";

describe("except", () => {
  it("should throw an exception when the first is null or undefined", () => {
    expect(() => except(null, []).toArray()).toThrowError("first is null or undefined");
    expect(() => except(undefined, []).toArray()).toThrowError("first is null or undefined");
  });

  it("should throw an exception when the second is null or undefined", () => {
    expect(() => except([], null).toArray()).toThrowError("second is null or undefined");
    expect(() => except([], undefined).toArray()).toThrowError("second is null or undefined");
  });

  it("should throw an exception when the first is not an enumerable", () => {
    expect(() => except({}, []).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second is not an enumerable", () => {
    expect(() => except([], {}).toArray()).toThrowError("source can not be enumerated");
  });

  it("should return distinct exception of two enumerables", () => {
    expect([1, 2, 2, 3, 3, 3, 4].asEnumerable().except([3, 2, 5, 5]).toArray()).toEqual([1, 4]);
    expect(except([1, 2, 2, 3, 3, 3, 4], [2, 3, 5, 5]).toArray()).toEqual([1, 4]);
  });

  it("should return distinct exception of two enumerables based on a comparer", () => {
    expect([
      { id: 1, name: "saleh" },
      { id: 2, name: "yasser" },
      { id: 1, name: "sali" },
      { id: 5, name: "iman" },
    ].asEnumerable()
      .except([
        { id: 3, name: "farshad" },
        { id: 2, name: "yasi" },
        { id: 4, name: "amin" }
      ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: "saleh" }, { id: 5, name: "iman" }]);

    expect(except([
      { id: 1, name: "saleh" },
      { id: 2, name: "yasser" },
      { id: 1, name: "sali" },
      { id: 5, name: "iman" },
    ], [
        { id: 3, name: "farshad" },
        { id: 2, name: "yasi" },
        { id: 4, name: "amin" }
      ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: "saleh" }, { id: 5, name: "iman" }]);
  });
});