/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import average from "../../src/modules/average";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("average", () => {
  testUtils.setPrototype('average', average);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => average(null)).toThrowError("source is null or undefined");
    expect(() => average(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => average(123)).toThrowError("source can not be enumerated");
    expect(() => average(false)).toThrowError("source can not be enumerated");
  });
  
  it("should throw an exception when the source is empty", () => {
    expect(() => average([])).toThrowError("sequence is empty");
    expect(() => average([])).toThrowError("sequence is empty");
  });

  it("should return average of elements inside an enumerable", () => {
    expect(asEnumerable([1, 2, 3]).average()).toEqual(2);
    expect(average([1, 2, 3])).toEqual(2);
  });

  it("should return average of elements inside an enumerable based on a selector", () => {
    expect(asEnumerable([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }]).average(o => o.a)).toEqual(3);
    expect(average([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], o => o.a)).toEqual(3);
  });
});