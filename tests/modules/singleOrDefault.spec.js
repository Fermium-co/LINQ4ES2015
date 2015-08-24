/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import singleOrDefault from "../../src/modules/singleOrDefault";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";

describe("singleOrDefault", () => {
  testUtils.setPrototype('singleOrDefault', singleOrDefault);
  
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => singleOrDefault(null)).toThrowError("source is null or undefined");
    expect(() => singleOrDefault(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => singleOrDefault(123)).toThrowError("source can not be enumerated");
    expect(() => singleOrDefault(false)).toThrowError("source can not be enumerated");
  });

  it("should return null if there is no element", () => {
    expect(asEnumerable([]).singleOrDefault()).toEqual(null);
    expect(singleOrDefault([])).toEqual(null);
  });

  it("should return null if there is no element passing the predicate", () => {
    expect(asEnumerable([1, 3, 5]).singleOrDefault(n => n % 2 === 0)).toEqual(null);
    expect(singleOrDefault([1, 3, 5], n => n % 2 === 0)).toEqual(null);
  });

  it("should throw if there is more than one element", () => {
    expect(() => asEnumerable([1, 2]).singleOrDefault()).toThrowError("Sequence contains more than one element");
    expect(() => singleOrDefault([1, 2])).toThrowError("Sequence contains more than one element");
  });

  it("should throw if there is  more than one element passing the predicate", () => {
    expect(() => asEnumerable([1, 3, 5]).singleOrDefault(n => n % 2 !== 0)).toThrowError("Sequence contains more than one matching element");
    expect(() => singleOrDefault([1, 3, 5], n => n % 2 !== 0)).toThrowError("Sequence contains more than one matching element");
  });

  it("should return the single element of an enumerable", () => {
    expect(asEnumerable([1]).singleOrDefault()).toEqual(1);
    expect(singleOrDefault([1])).toEqual(1);
  });

  it("should return the single element of an enumerable passing a predicate", () => {
    expect(asEnumerable([1, 2, 3]).singleOrDefault(n => n % 2 === 0)).toEqual(2);
    expect(singleOrDefault([1, 2, 3], n => n % 2 === 0)).toEqual(2);
  });
});