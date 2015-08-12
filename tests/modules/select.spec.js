/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import select from "../../src/modules/select";

describe("select", () => {

  let arr = [1, 2, 3];

  it("must retrn items with provided projection format", () => {
    let evenNumbers = arr.asEnumerable().select(num => '[' + num + ']').toArray();
    expect(evenNumbers.length).toBe(3);
    expect(evenNumbers[0]).toBe('[1]');
    expect(evenNumbers[1]).toBe('[2]');
	  expect(evenNumbers[2]).toBe('[3]');
  });

  it("must throws an exception when the source is null or undefined", () => {
    expect(() => toArray(select(null, num => num))).toThrowError("source is null or undefined");
    expect(() => toArray(select(undefined, num => num))).toThrowError("source is null or undefined");
  });

  it("must throws an exception when the source is not an enumerable", () => {
    expect(() => toArray(select({}, num => num))).toThrowError("source must be an enumerable");
  });

  it("must throws an exception when the projection format is not a function", () => {
    expect(() => toArray(select([], {}))).toThrowError("projection format must be a function");
  });
});