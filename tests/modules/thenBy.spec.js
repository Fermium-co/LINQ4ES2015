/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderBy from "../../src/modules/orderBy";
import thenBy from "../../src/modules/thenBy";

describe("thenBy", () => {
  let simpleArr = [3, 2, 6, 4];
  let complexArr = [{ firstName: "C", lastName: "D" }, { firstName: "A", lastName: "C" }, { firstName: "A", lastName: "B" }];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(thenBy(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(thenBy(undefined, item => item))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(thenBy({}, item => item))).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the then by column is not a function", () => {
    expect(() => toArray(thenBy([], {}))).toThrowError("then by column must be a function");
  });

  it("should throw an exception even with valid arguments, if no orderBy or orderByDescending is called before", () => {
    expect(() => simpleArr.asEnumerable().thenBy(num => num).toArray()).toThrowError("thenBy must be called after orderBy or orderByDescending");
  });

  it("should retrn ordered set of complex items", () => {
    let orderedItems = complexArr.asEnumerable()
      .orderBy(item => item.firstName)
      .thenBy(item => item.lastName)
      .toArray();

    expect(orderedItems.length).toBe(3);
    expect(orderedItems[0]).toEqual({ firstName: "A", lastName: "B" });
    expect(orderedItems[1]).toEqual({ firstName: "A", lastName: "C" });
    expect(orderedItems[2]).toEqual({ firstName: "C", lastName: "D" });
  });

  it("should call then by comparer function correctly because of order by method", () => {
    let fakeObject = { fakeThenBy: item => item.lastName };
    spyOn(fakeObject, "fakeThenBy").and.callThrough();
    complexArr.asEnumerable()
      .orderBy(item => item.firstName)
      .thenBy(item => fakeObject.fakeThenBy)
      .toArray();
    
    expect(fakeObject.fakeThenBy).toHaveBeenCalledWith("B");
    expect(fakeObject.fakeThenBy).toHaveBeenCalledWith("C");
    expect(fakeObject.fakeThenBy).not.toHaveBeenCalledWith("D");
    expect(fakeObject.fakeThenBy.calls.count()).toBe(2);    
  });
});