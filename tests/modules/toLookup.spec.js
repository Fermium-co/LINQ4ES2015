/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toLookup from "../../src/modules/toLookup";

describe("toLookup", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toLookup(null, () => { }).toArray()).toThrowError("source is null or undefined");
    expect(() => toLookup(undefined, () => { }).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the keySelector is null or undefined", () => {
    expect(() => toLookup([], null).toArray()).toThrowError("keySelector is null or undefined");
    expect(() => toLookup([], undefined).toArray()).toThrowError("keySelector is null or undefined");
  });

  it("should throw when the source is not an enumerable", () => {
    expect(() => toLookup({}, () => { }).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw when the keySelector is not Function", () => {
    expect(() => toLookup([], {}).toArray()).toThrowError("keySelector must be a Function");
  });

  it("should return a lookup of an enumerable based on a comparer", () => {
    expect([
      { first: 'saleh', last: 'yusefnejad' },
      { first: 'yasser', last: 'moradi' },
      { first: 'farshad', last: 'abdolzadeh' },
      { first: 'yass', last: 'moradi' },
      { first: 'amin', last: 'sheikhi' },
      { first: 'am', last: 'sheikhi' },
      { first: 'sali', last: 'YUSEFNEJAD' },
      { first: 'saloo', last: 'yusefnejad' },
    ].asEnumerable()
      .toLookup(p => p.last, p => p.first, (a, b) => a.toLowerCase() == b.toLowerCase()))
      .toEqual([
        { key: 'yusefnejad', elements: ['saleh', 'sali', 'saloo'] },
        { key: 'moradi', elements: ['yasser', 'yass'] },
        { key: 'abdolzadeh', elements: ['farshad'] },
        { key: 'sheikhi', elements: ['amin', 'am'] }
      ]);
  });
});