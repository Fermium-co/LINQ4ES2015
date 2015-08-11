/* global describe it expect spyOn */
"use strict";

import linq from "../../src/linq";
import utils from "../../src/modules/utils";

describe("where", () => {

  let arr = [1, 2, 3, 4, 5, 6];

  it("must retrn an array with valid child count", () => {
    let evenNumbers = arr.asEnumerable().where(num => num % 2 == 0).toArray();
    expect(evenNumbers.length).toBe(3);
  });

  it("must not call predicate when result is not get enumerated", () => {
    let fakePredicate = jasmine.createSpy();
    let evenNumbers = arr.asEnumerable().where(fakePredicate);
    expect(fakePredicate).not.toHaveBeenCalled();
  });

  it("must call predicate when result is get enumerated", () => {
    let fakePredicate = jasmine.createSpy();
    let evenNumbers = arr.asEnumerable().where(fakePredicate).toArray();
    expect(fakePredicate).toHaveBeenCalledWith(1);
    expect(fakePredicate).toHaveBeenCalledWith(2);
    expect(fakePredicate).toHaveBeenCalledWith(3);
    expect(fakePredicate).toHaveBeenCalledWith(4);
    expect(fakePredicate).toHaveBeenCalledWith(5);
    expect(fakePredicate).toHaveBeenCalledWith(6);
    expect(fakePredicate.calls.count()).toBe(6);
  });

  it("must call predicate 2 times when result is get enumerated", () => {
    let fakeObject = { fakePredicate: num => { return num % 2 == 0; } };
    spyOn(fakeObject, 'fakePredicate').and.callThrough();
    let evenNumbers = arr.asEnumerable().where(fakeObject.fakePredicate).take(1).toArray();
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(1);
    expect(fakeObject.fakePredicate).toHaveBeenCalledWith(2);
    expect(fakeObject.fakePredicate).not.toHaveBeenCalledWith(3);
    expect(fakeObject.fakePredicate.calls.count()).toBe(2);
  });

});