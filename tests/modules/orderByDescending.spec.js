/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderByDescending from "../../src/modules/orderByDescending";

describe("orderByDescending", () => {
  let simpleArr = [3, 2, 6, 4];
  let complexArr = [{ firstName: 'C' }, { firstName: 'A' }, { firstName: 'B' }];

  it("should retrn ordered items", () => {
    let orderedItems = simpleArr.asEnumerable().orderByDescending(num => num).toArray();
    expect(orderedItems).toEqual([6, 4, 3, 2]);
  });

  it("should retrn ordered set of complex items", () => {
    let orderedItems = complexArr.asEnumerable().orderByDescending(item => item.firstName).toArray();
    expect(orderedItems.length).toBe(3);
    expect(orderedItems[0].firstName).toBe('C');
    expect(orderedItems[1].firstName).toBe('B');
    expect(orderedItems[2].firstName).toBe('A');
  });

  it("should call order by descending function correctly because of where method", () => {
    let fakeObject = { fakeorderByDescending: num => num };
    spyOn(fakeObject, 'fakeorderByDescending').and.callThrough();
    let result = simpleArr.asEnumerable().where(num => num % 2 == 0).orderByDescending(fakeObject.fakeorderByDescending).toArray();
    expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(2);
    expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(4);
    expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(6);
    expect(fakeObject.fakeorderByDescending).not.toHaveBeenCalledWith(3);
    expect(fakeObject.fakeorderByDescending.calls.count()).toBe(6);
    expect(result).toEqual([6, 4, 2]);
  });

  it("should call order by descending function correctly because of take method", () => {
    let fakeObject = { fakeorderByDescending: num => num };
    spyOn(fakeObject, 'fakeorderByDescending').and.callThrough();
    let result = simpleArr.asEnumerable().take(2).orderByDescending(fakeObject.fakeorderByDescending).toArray();
    expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(3);
    expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(2);
    expect(fakeObject.fakeorderByDescending).not.toHaveBeenCalledWith(6);
    expect(fakeObject.fakeorderByDescending).not.toHaveBeenCalledWith(4);
    expect(fakeObject.fakeorderByDescending.calls.count()).toBe(2);
    expect(result).toEqual([3, 2]);
  });

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => toArray(orderByDescending(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(orderByDescending(undefined, item => item))).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not an enumerable", () => {
    expect(() => toArray(orderByDescending({}, item => item))).toThrowError("source must be an enumerable");
  });

  it("should throws an exception when the order descending by column is not a function", () => {
    expect(() => toArray(orderByDescending([], {}))).toThrowError("order by descending column must be a function");
  });
});