/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import aggregate from "../../src/modules/aggregate";

describe("aggregate", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => aggregate(null)).toThrowError("source is null or undefined");
    expect(() => aggregate(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => aggregate({})).toThrowError("source can not be enumerated");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => [1, 2, 3].asEnumerable().aggregate()).toThrowError("aggregation is not a function");
    expect(() => [1, 2, 3].asEnumerable().aggregate(null)).toThrowError("aggregation is not a function");
  });

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().aggregate("", (result, current) => result += current + ",")).toEqual("1,2,3,");
    expect(aggregate([1, 2, 3], 0, (result, current) => result += current)).toEqual(6);
  });
});