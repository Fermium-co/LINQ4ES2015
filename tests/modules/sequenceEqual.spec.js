/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import sequenceEqual from "../../src/modules/sequenceEqual";

describe("sequenceEqual", () => {
  it("should throw an exception when the first source is null or undefined", () => {
    expect(() => sequenceEqual(null, []).toArray()).toThrowError("first source is null or undefined");
    expect(() => sequenceEqual(undefined, []).toArray()).toThrowError("first source is null or undefined");
  });

  it("should throw an exception when the second source is null or undefined", () => {
    expect(() => sequenceEqual([], null).toArray()).toThrowError("second source is null or undefined");
    expect(() => sequenceEqual([], undefined).toArray()).toThrowError("second source is null or undefined");
  });

  it("should throw an exception when the first source is not either an array or an enumerable", () => {
    expect(() => sequenceEqual({}, []).toArray()).toThrowError("first source must be either an enumerable or an array");
  });

  it("should throw an exception when the second source is not either an array or an enumerable", () => {
    expect(() => sequenceEqual([], {}).toArray()).toThrowError("second source must be either an enumerable or an array");
  });

  it("should check two arrays are sequence equal or not", () => {
    let result = [1, 2, 3].asEnumerable().sequenceEqual([1, 2, 3]);
    expect(result).toEqual(true);
    let result2 = [1, 2, 3].asEnumerable().sequenceEqual([4, 5, 6]);
    expect(result2).toEqual(false);
    let result3 = [1, 2, 3].asEnumerable().sequenceEqual([1, 2, 3, 4]);
    expect(result3).toEqual(false);
    let result4 = [1, 2, 3].asEnumerable().sequenceEqual([1, 2, 3, 4].asEnumerable());
    expect(result4).toEqual(false);
  });

  it("should check two arrays are sequence equal or not by custom comparer", () => {
    let result = ["A", "B", "C"].asEnumerable().sequenceEqual(["a", "b", "c"], (first, second) => first == second.toUpperCase());
    expect(result).toEqual(true);
    let result2 = ["A", "D", "C"].asEnumerable().sequenceEqual(["a", "b", "c"], (first, second) => first == second.toUpperCase());
    expect(result2).toEqual(false);
  });

  it("should check two arrays are sequence equal or not", () => {
    let result = [1, 2, 3].asEnumerable().where(num => num % 2 == 0).sequenceEqual([1, 2, 3].asEnumerable().where(num => num % 2 == 0));
    expect(result).toEqual(true);
    let result2 = [1, 2, 3, 6].asEnumerable().where(num => num % 2 == 0).sequenceEqual([1, 4, 3, 6].asEnumerable().where(num => num % 2 == 0));
    expect(result2).toEqual(false);
  });

  it("should call where predicate as much as sequence equals needs", () => {
    let fakeObject = { fakePredicate: (num) => num % 2 == 0 };
    spyOn(fakeObject, "fakePredicate").and.callThrough();
    let result2 = [1, 2, 3, 6].asEnumerable().where(fakeObject.fakePredicate).sequenceEqual([1, 4, 3, 6].asEnumerable().where(fakeObject.fakePredicate));
    expect(result2).toEqual(false);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1, 0);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(2, 1);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1, 0);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(4, 1);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(3, 2);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(6, 3);
    expect(fakeObject.fakePredicate.calls.count()).toBe(4);
  });

  it("should call custom comparer as much as sequence equals needs", () => {
    let fakeObject = { fakeCustomComparer: (first, second) => first - second < 1 };
    spyOn(fakeObject, "fakeCustomComparer").and.callThrough();
    let result = [1, 6, 3, 4].asEnumerable().sequenceEqual([1, 2, 3, 4].asEnumerable(), fakeObject.fakeCustomComparer);
    expect(result).toBe(false);
    expect(fakeObject.fakeCustomComparer.calls.count()).toBe(2);
  });
});