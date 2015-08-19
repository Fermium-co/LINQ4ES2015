/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import skip from "../../src/modules/skip";

describe("skip", () => {
  let arr = [1, 2, 3, 4, 5, 6];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(skip(null, 1))).toThrowError("source is null or undefined");
    expect(() => toArray(skip(undefined, 1))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(skip({}, 1))).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the skip number is not a number", () => {
    expect(() => toArray(skip([], {}))).toThrowError("skip number must be a number");
  });

  it("should throw an exception when the skip number is not a number", () => {
    expect(() => toArray(skip([], null))).toThrowError("skip number must be a number");
  });

  it("should retrn first two items", () => {
    let evenNumbers = arr.asEnumerable().skip(2).toArray();
    expect(evenNumbers).toEqual([3, 4, 5, 6]);
  });

  it("should retrn first two even items", () => {
    let evenNumbers = arr.asEnumerable().where(num => num % 2 == 0).skip(2).toArray();
    expect(evenNumbers).toEqual([6]);
  });
});