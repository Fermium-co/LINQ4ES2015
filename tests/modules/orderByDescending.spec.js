/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import orderByDescending from "../../src/modules/orderByDescending";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from "../../src/modules/toArray";

describe("orderByDescending", () => {
  testUtils.setPrototype('orderByDescending', orderByDescending);

  let simpleArr = [3, 2, 6, 4];
  let complexArr = [{ firstName: "C" }, { firstName: "A" }, { firstName: "B" }];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(orderByDescending(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(orderByDescending(undefined, item => item))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the keySelector is null or undefined", () => {
    expect(() => toArray(orderByDescending([], null))).toThrowError("keySelector is null or undefined");
    expect(() => toArray(orderByDescending([], undefined))).toThrowError("keySelector is null or undefined");
  });

  it("should throw an exception when the keySelector is not a function", () => {
    expect(() => toArray(orderByDescending([], {}))).toThrowError("keySelector must be a function");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(orderByDescending(123, item => item))).toThrowError("source can not be enumerated");
    expect(() => toArray(orderByDescending(false, item => item))).toThrowError("source can not be enumerated");
  });

  it("should retrn ordered items", () => {
    let orderedItems = asEnumerable(simpleArr).orderByDescending(num => num);
    expect(toArray(orderedItems)).toEqual([6, 4, 3, 2]);
  });

  it("should retrn ordered set of complex items", () => {
    let orderedItems = toArray(asEnumerable(complexArr).orderByDescending(item => item.firstName));
    expect(orderedItems.length).toBe(3);
    expect(orderedItems[0].firstName).toBe("C");
    expect(orderedItems[1].firstName).toBe("B");
    expect(orderedItems[2].firstName).toBe("A");
  });
});