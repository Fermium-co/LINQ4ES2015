/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import orderBy from "../../src/modules/orderBy";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from "../../src/modules/toArray";

describe("orderBy", () => {
  testUtils.setPrototype('orderBy', orderBy);
  
  let simpleArr = [3, 2, 6, 4];
  let complexArr = [{ firstName: 'C' }, { firstName: 'A' }, { firstName: 'B' }];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(orderBy(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(orderBy(undefined, item => item))).toThrowError("source is null or undefined");
  });
  
  it("should throw an exception when the keySelector is null or undefined", () => {
    expect(() => toArray(orderBy([], null))).toThrowError("keySelector is null or undefined");
    expect(() => toArray(orderBy([], undefined))).toThrowError("keySelector is null or undefined");
  });

  it("should throw an exception when the keySelector is not a function", () => {
    expect(() => toArray(orderBy([], {}))).toThrowError("keySelector must be a function");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(orderBy(123, item => item))).toThrowError("source can not be enumerated");
    expect(() => toArray(orderBy(false, item => item))).toThrowError("source can not be enumerated");
  });

  it("should retrn ordered items", () => {
    let orderedItems = asEnumerable(simpleArr).orderBy(num => num);
    expect(toArray(orderedItems)).toEqual([2, 3, 4, 6]);
  });

  it("should return ordered set of complex items", () => {
    let orderedItems = toArray(asEnumerable(complexArr).orderBy(item => item.firstName));
    expect(orderedItems.length).toBe(3);
    expect(orderedItems[0].firstName).toBe('A');
    expect(orderedItems[1].firstName).toBe('B');
    expect(orderedItems[2].firstName).toBe('C');
  });
});