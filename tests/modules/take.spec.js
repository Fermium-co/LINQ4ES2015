/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import take from "../../src/modules/take";

describe("take", () => {
  let arr = [1, 2, 3, 4, 5, 6];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(take(null, 1))).toThrowError("source is null or undefined");
    expect(() => toArray(take(undefined, 1))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(take({}, 1))).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the take number is not a number", () => {
    expect(() => toArray(take([], {}))).toThrowError("take number must be a number");
  });

  it("should throw an exception when the take number is not a number", () => {
    expect(() => toArray(take([], null))).toThrowError("take number must be a number");
  });

  it("should retrn first two items", () => {
    let evenNumbers = arr.asEnumerable().take(2).toArray();
    expect(evenNumbers).toEqual([1, 2]);
  });

  it("should retrn first two even items", () => {
    let evenNumbers = arr.asEnumerable().where(num => num % 2 == 0).take(2).toArray();
    expect(evenNumbers).toEqual([2, 4]);
  });
});