/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import last from "../../src/modules/last";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe("last", () => {
  testUtils.setPrototype('last', last);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => last(null)).toThrowError("source is null or undefined");
    expect(() => last(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => last(123)).toThrowError("source can not be enumerated");
    expect(() => last(false)).toThrowError("source can not be enumerated");
  });

  it("should throw if there is no element", () => {
    expect(() => asEnumerable([]).last()).toThrowError("Sequence contains no elements");
    expect(() => last([])).toThrowError("Sequence contains no elements");
  });

  it("should throw if there is no element passing the predicate", () => {
    expect(() => asEnumerable([1, 3, 5]).last(n => n % 2 === 0)).toThrowError("Sequence contains no matching element");
    expect(() => last([1, 3, 5], n => n % 2 === 0)).toThrowError("Sequence contains no matching element");
  });

  it("should return the last element of an enumerable", () => {
    expect(asEnumerable([1, 2, 3]).last()).toEqual(3);
    expect(last([1, 2, 3])).toEqual(3);
  });

  it("should return the last element of an enumerable passing a predicate", () => {
    expect(asEnumerable([1, 2, 3, 4, 5]).last(n => n % 2 === 0)).toEqual(4);
    expect(last([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(4);
  });
});