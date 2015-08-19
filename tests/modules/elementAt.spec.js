/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import elementAt from "../../src/modules/elementAt";

describe("elementAt", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => elementAt(null)).toThrowError("source is null or undefined");
    expect(() => elementAt(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => elementAt({})).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the index is not a number", () => {
    expect(() => elementAt([1], {})).toThrowError("index must be a number");
  });

  it("should throw an exception if there is no element", () => {
    expect(() => [].asEnumerable().elementAt(1)).toThrowError("Sequence contains no elements");
    expect(() => elementAt([], 1)).toThrowError("Sequence contains no elements");
  });

  it("should throw an exception if index is out of range", () => {
    expect(() => [1, 2].asEnumerable().elementAt(2)).toThrowError("Index was out of range. Must be non-negative and less than the size of the collection");
    expect(() => elementAt([1, 2], 2)).toThrowError("Index was out of range. Must be non-negative and less than the size of the collection");
  });

  it("should return valid item", () => {
    expect([1, 3, 5].asEnumerable().elementAt(2)).toEqual(5);
    expect([1, 2, 3, 4, 5, 6].asEnumerable().where(num => num % 2 == 0).elementAt(2)).toEqual(6);
    expect(elementAt([1, 3, 5], 0)).toEqual(1);
  });

  it("should execute where predicate as much as needed to return valid item", () => {
    let fakeObject = { fakePredicate: num => num % 2 == 0 };
    spyOn(fakeObject, 'fakePredicate').and.callThrough();
    expect([1, 2, 3, 4, 5, 6].asEnumerable().where(fakeObject.fakePredicate).elementAt(1)).toEqual(4);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1, 0);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(2, 1);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(3, 2);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(4, 3);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(5, 4);
    expect(fakeObject.fakePredicate.calls.count()).toBe(4);
  });

});