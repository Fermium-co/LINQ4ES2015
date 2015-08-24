/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import toLookup from "../../src/modules/toLookup";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from '../../src/modules/toArray';

describe("toLookup", () => {
  testUtils.setPrototype('toLookup', toLookup);

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(toLookup(null, () => { }))).toThrowError("source is null or undefined");
    expect(() => toArray(toLookup(undefined, () => { }))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the keySelector is null or undefined", () => {
    expect(() => toArray(toLookup([], null))).toThrowError("keySelector is null or undefined");
    expect(() => toArray(toLookup([], undefined))).toThrowError("keySelector is null or undefined");
  });

  it("should throw when the source is not an enumerable", () => {
    expect(() => toArray(toLookup(123, () => { }))).toThrowError("source can not be enumerated");
    expect(() => toArray(toLookup(false, () => { }))).toThrowError("source can not be enumerated");
  });

  it("should throw when the keySelector is not Function", () => {
    expect(() => toArray(toLookup([], {}))).toThrowError("keySelector must be a function");
  });

  it("should return a lookup of an enumerable based on a comparer", () => {
    expect(asEnumerable([
      { first: 'saleh', last: 'yusefnejad' },
      { first: 'yasser', last: 'moradi' },
      { first: 'farshad', last: 'abdolzadeh' },
      { first: 'yass', last: 'moradi' },
      { first: 'amin', last: 'sheikhi' },
      { first: 'am', last: 'sheikhi' },
      { first: 'sali', last: 'YUSEFNEJAD' },
      { first: 'saloo', last: 'yusefnejad' },
    ]).toLookup(p => p.last, p => p.first, (a, b) => a.toLowerCase() == b.toLowerCase()))
      .toEqual([
        { key: "yusefnejad", elements: ["saleh", "sali", "saloo"] },
        { key: "moradi", elements: ["yasser", "yass"] },
        { key: "abdolzadeh", elements: ["farshad"] },
        { key: "sheikhi", elements: ["amin", "am"] }
      ]);
  });
});