/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import distinct from "../../src/modules/distinct";

describe("distinct", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => distinct(null).toArray()).toThrowError("source is null or undefined");
    expect(() => distinct(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => distinct({}).toArray()).toThrowError("source must be an enumerable");
  });

  it("should return distinct elements of an enumerable", () => {
    expect([1, 2, 2, 3, 3, 3].asEnumerable().distinct().toArray()).toEqual([1, 2, 3]);
    expect(distinct([1, 2, 2, 3, 3, 3]).toArray()).toEqual([1, 2, 3]);
  });

  it("should return the distinct elements of an enumerable based on a comparer", () => {
    expect([
      { id: 1, name: "saleh" },
      { id: 2, name: "yasser" },
      { id: 1, name: "sali" }
    ].asEnumerable()
      .distinct((a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: "saleh" }, { id: 2, name: "yasser" }]);

    expect(distinct([
      { id: 1, name: "saleh" },
      { id: 2, name: "yasser" },
      { id: 1, name: "sali" }
    ], (a, b) => a.id === b.id)
      .toArray())
      .toEqual([{ id: 1, name: "saleh" }, { id: 2, name: "yasser" }]);
  });
});