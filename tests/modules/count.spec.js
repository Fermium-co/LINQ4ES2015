/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import count from "../../src/modules/count";

describe("count", () => {

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().count()).toEqual(3);
    expect(count([1, 2, 3])).toEqual(3);
  });

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => count(null).toArray()).toThrowError("source is null or undefined");
    expect(() => count(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => count({}).toArray()).toThrowError("source must be an enumerable");
  });
});