/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import where from "../../src/modules/where";

describe("where", () => {

  let arr = [1, 2, 3, 4, 5, 6];

  it("should retrn an array with valid child count", () => {
    let evenNumbers = arr.asEnumerable().where(num => num % 2 == 0).toArray();
    expect(evenNumbers).toEqual([2, 4, 6]);
  });

  it("should not call predicate when result is not get enumerated", () => {
    let fakePredicate = jasmine.createSpy();
    arr.asEnumerable().where(fakePredicate);
    expect(fakePredicate).not.toHaveBeenCalled();
  });

  it("should enumerate again when toArray is called again", () => {
    let variable = 2;
    let firstResult = arr.asEnumerable().where(num => num % variable == 0).toArray();
    variable = 3;
    let anotherResult = arr.asEnumerable().where(num => num % variable == 0).toArray();
    expect(firstResult).toEqual([2, 4, 6]);
    expect(anotherResult).toEqual([3, 6]);
  });

  it("should use latest variable values while enumerating", () => {
    let variable = 2;
    let query = arr.asEnumerable().where(num => num % variable == 0);
    variable = 3;
    let results = query.toArray();
    expect(results).toEqual([3, 6]);
  });

  it("should call predicate when result is get enumerated", () => {
    let fakePredicate = jasmine.createSpy();
    arr.asEnumerable().where(fakePredicate).toArray();
    expect(fakePredicate).toHaveBeenCalledWith(1);
    expect(fakePredicate).toHaveBeenCalledWith(2);
    expect(fakePredicate).toHaveBeenCalledWith(3);
    expect(fakePredicate).toHaveBeenCalledWith(4);
    expect(fakePredicate).toHaveBeenCalledWith(5);
    expect(fakePredicate).toHaveBeenCalledWith(6);
    expect(fakePredicate.calls.count()).toBe(6);
  });

  it("should call predicate 2 times when result is get enumerated", () => {
    let fakeObject = { fakePredicate: num => num % 2 == 0 };
    spyOn(fakeObject, 'fakePredicate').and.callThrough();
    let firstTwoEvenNumbers = arr.asEnumerable().where(fakeObject.fakePredicate).take(2).toArray();
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(2);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(3);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(4);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(5);
    expect(fakeObject.fakePredicate.calls.count()).toBe(4);
    expect(firstTwoEvenNumbers).toEqual([2, 4]);
  });

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => toArray(where(null, () => true))).toThrowError("source is null or undefined");
    expect(() => toArray(where(undefined, () => true))).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not an enumerable", () => {
    expect(() => toArray(where({}, () => true))).toThrowError("source must be an enumerable");
  });

  it("should throws an exception when the predicate is not a function", () => {
    expect(() => toArray(where([], null))).toThrowError("predicate must be a function");
  });

});