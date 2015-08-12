/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import select from "../../src/modules/select";

describe("select", () => {

  let arr = [1, 2, 3, 4];

  it("must retrn items with provided projection format", () => {
    let evenNumbers = arr.asEnumerable().select(num => '[' + num + ']').toArray();
    expect(evenNumbers.length).toBe(4);
    expect(evenNumbers[0]).toBe('[1]');
    expect(evenNumbers[1]).toBe('[2]');
    expect(evenNumbers[2]).toBe('[3]');
    expect(evenNumbers[3]).toBe('[4]');
  });

  it("must call projection 2 times because of where method", () => {
    let fakeObject = { fakeProjection: num => '[' + num + ']' };
    spyOn(fakeObject, 'fakeProjection').and.callThrough();
    let result = arr.asEnumerable().where(num => num % 2 == 0).select(fakeObject.fakeProjection).toArray();
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(2);
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(4);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(1);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(3);
    expect(fakeObject.fakeProjection.calls.count()).toBe(2);
    expect(result[0]).toBe('[2]');
    expect(result[1]).toBe('[4]');
    expect(result.length).toBe(2);
  });
  
  it("must call projection 2 times because of take method", () => {
    let fakeObject = { fakeProjection: num => '[' + num + ']' };
    spyOn(fakeObject, 'fakeProjection').and.callThrough();
    let result = arr.asEnumerable().take(2).select(fakeObject.fakeProjection).toArray();
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(1);
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith(2);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(3);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith(4);
    expect(fakeObject.fakeProjection.calls.count()).toBe(2);
    expect(result[0]).toBe('[1]');
    expect(result[1]).toBe('[2]');
    expect(result.length).toBe(2);
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