/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderBy from "../../src/modules/orderBy";

describe("orderBy", () => {
  let simpleArr = [3, 2, 6, 4];
  let complexArr = [{ firstName: "C" }, { firstName: "A" }, { firstName: "B" }];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(orderBy(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(orderBy(undefined, item => item))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(orderBy({}, item => item))).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the order by column is not a function", () => {
    expect(() => toArray(orderBy([], {}))).toThrowError("order by column must be a function");
  });

  it("should retrn ordered items", () => {
    let orderedItems = simpleArr.asEnumerable().orderBy(num => num).toArray();
    expect(orderedItems).toEqual([2, 3, 4, 6]);
  });

  it("should retrn ordered set of complex items", () => {
    let orderedItems = complexArr.asEnumerable().orderBy(item => item.firstName).toArray();
    expect(orderedItems.length).toBe(3);
    expect(orderedItems[0].firstName).toBe("A");
    expect(orderedItems[1].firstName).toBe("B");
    expect(orderedItems[2].firstName).toBe("C");
  });

  it("should call order by function correctly because of where method", () => {
    let fakeObject = { fakeOrderBy: num => num };
    spyOn(fakeObject, "fakeOrderBy").and.callThrough();
    let result = simpleArr.asEnumerable().where(num => num % 2 == 0).orderBy(fakeObject.fakeOrderBy).toArray();
    expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(2);
    expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(4);
    expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(6);
    expect(fakeObject.fakeOrderBy).not.toHaveBeenCalledWith(3);
    expect(fakeObject.fakeOrderBy.calls.count()).toBe(6);
    expect(result).toEqual([2, 4, 6]);
  });

  it("should call order by function correctly because of take method", () => {
    let fakeObject = { fakeOrderBy: num => num };
    spyOn(fakeObject, "fakeOrderBy").and.callThrough();
    let result = simpleArr.asEnumerable().take(2).orderBy(fakeObject.fakeOrderBy).toArray();
    expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(3);
    expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(2);
    expect(fakeObject.fakeOrderBy).not.toHaveBeenCalledWith(6);
    expect(fakeObject.fakeOrderBy).not.toHaveBeenCalledWith(4);
    expect(fakeObject.fakeOrderBy.calls.count()).toBe(2);
    expect(result).toEqual([2, 3]);
  });
});