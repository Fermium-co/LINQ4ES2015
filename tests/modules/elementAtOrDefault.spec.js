/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import elementAtOrDefault from "../../src/modules/elementAtOrDefault";

describe("elementAtOrDefault", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => elementAtOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => elementAtOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => elementAtOrDefault({})).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the index is not a number", () => {
    expect(() => elementAtOrDefault([1], {})).toThrowError("index must be a number");
  });

  it("should return valid item", () => {
    expect([1, 3, 5].asEnumerable().elementAtOrDefault(2)).toEqual(5);
    expect([1, 2, 3, 4, 5, 6].asEnumerable().where(num => num % 2 == 0).elementAtOrDefault(2)).toEqual(6);
    expect(elementAtOrDefault([1, 3, 5], 0)).toEqual(1);
    expect([1, 3, 5].asEnumerable().elementAtOrDefault(6)).toEqual(null);
    expect([1, 2, 3, 4, 5, 6].asEnumerable().where(num => num % 2 == 0).elementAtOrDefault(6)).toEqual(null);
    expect(elementAtOrDefault([1, 3, 5], 6)).toEqual(null);
  });

  it("should execute where predicate as much as needed to return valid item", () => {
    let fakeObject = { fakePredicate: num => num % 2 == 0 };
    spyOn(fakeObject, "fakePredicate").and.callThrough();
    expect([1, 2, 3, 4, 5, 6].asEnumerable().where(fakeObject.fakePredicate).elementAtOrDefault(1)).toEqual(4);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1, 0);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(2, 1);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(3, 2);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(4, 3);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(5, 4);
    expect(fakeObject.fakePredicate.calls.count()).toBe(4);
  });

});