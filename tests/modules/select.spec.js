/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import select from "../../src/modules/select";

describe("select", () => {
  let arr = [1, 2, 3, 4];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(select(null, num => num))).toThrowError("source is null or undefined");
    expect(() => toArray(select(undefined, num => num))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(select({}, num => num))).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the projection format is not a function", () => {
    expect(() => toArray(select([], {}))).toThrowError("projection format must be a function");
  });

  it("should retrn items with provided projection format", () => {
    let evenNumbers = arr.asEnumerable().select(num => "[" + num + "]").toArray();
    expect(evenNumbers.length).toBe(4);
    expect(evenNumbers[0]).toBe("[1]");
    expect(evenNumbers[1]).toBe("[2]");
    expect(evenNumbers[2]).toBe("[3]");
    expect(evenNumbers[3]).toBe("[4]");
  });

  it("should call projection 2 times because of where method", () => {
    let fakeObject = { fakeProjection: num => "[" + num + "]" };
    spyOn(fakeObject, "fakeProjection").and.callThrough();
    let result = arr.asEnumerable().where(num => num % 2 == 0).select(fakeObject.fakeProjection).toArray();
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(2, 0);
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(4, 1);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(1, 2);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(3, 3);
    expect(fakeObject.fakeProjection.calls.count()).toBe(2);
    expect(result).toEqual(["[2]", "[4]"]);
  });

  it("should call projection 2 times because of take method", () => {
    let fakeObject = { fakeProjection: num => "[" + num + "]" };
    spyOn(fakeObject, "fakeProjection").and.callThrough();
    let result = arr.asEnumerable().take(2).select(fakeObject.fakeProjection).toArray();
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(1, 0);
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(2, 1);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(3, 2);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(4, 3);
    expect(fakeObject.fakeProjection.calls.count()).toBe(2);
    expect(result).toEqual(["[1]", "[2]"]);
  });
});