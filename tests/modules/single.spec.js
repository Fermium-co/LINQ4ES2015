/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import single from "../../src/modules/single";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";

describe("single", () => {
  testUtils.setPrototype('single', single);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => single(null)).toThrowError("source is null or undefined");
    expect(() => single(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => single(123)).toThrowError("source can not be enumerated");
    expect(() => single(false)).toThrowError("source can not be enumerated");
  });

  it("should throw if there is no element", () => {
    expect(() => asEnumerable([]).single()).toThrowError("Sequence contains no elements");
    expect(() => single([])).toThrowError("Sequence contains no elements");
  });

  it("should throw if there is no element passing the predicate", () => {
    expect(() => asEnumerable([1, 3, 5]).single(n => n % 2 === 0)).toThrowError("Sequence contains no matching element");
    expect(() => single([1, 3, 5], n => n % 2 === 0)).toThrowError("Sequence contains no matching element");
  });

  it("should throw if there is more than one element", () => {
    expect(() => asEnumerable([1, 2]).single()).toThrowError("Sequence contains more than one element");
    expect(() => single([1, 2])).toThrowError("Sequence contains more than one element");
  });

  it("should throw if there is  more than one element passing the predicate", () => {
    expect(() => asEnumerable([1, 3, 5]).single(n => n % 2 !== 0)).toThrowError("Sequence contains no matching element");
    expect(() => single([1, 3, 5], n => n % 2 !== 0)).toThrowError("Sequence contains no matching element");
  });

  it("should return the single element of an enumerable", () => {
    expect(asEnumerable([1]).single()).toEqual(1);
    expect(single([1])).toEqual(1);
  });

  it("should return the single element of an enumerable passing a predicate", () => {
    expect(asEnumerable([1, 2, 3]).single(n => n % 2 === 0)).toEqual(2);
    expect(single([1, 2, 3], n => n % 2 === 0)).toEqual(2);
  });
});