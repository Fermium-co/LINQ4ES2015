/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import contains from "../../src/modules/contains";

describe("contains", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => contains(null)).toThrowError("source is null or undefined");
    expect(() => contains(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => contains({})).toThrowError("source must be an enumerable");
  });

  it("should return true when enumerable contains an item", () => {
    expect([1, 2, 3].asEnumerable().contains(2)).toEqual(true);
  });

  it("should return false when enumerable contains an item", () => {
    expect([1, 2, 3].asEnumerable().contains(4)).toEqual(false);
  });

  it("should call predicate 6 times when result is get enumerated because of contains method", () => {
    let fakeObject = { fakePredicate: num => num % 3 == 0 };
    spyOn(fakeObject, 'fakePredicate').and.callThrough();
    let result = [1, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable().where(fakeObject.fakePredicate).contains(6);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1, 0);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(2, 1);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(3, 2);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(4, 3);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(5, 4);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(6, 5);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(7, 6);
    expect(fakeObject.fakePredicate.calls.count()).toBe(6);
    expect(result).toEqual(true);
  });
});

