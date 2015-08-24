/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import join from "../../src/modules/join";
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe("join", () => {
  testUtils.setPrototype('join', join);
  let fn = () => { };

  it("should throw when the outer is null or undefined", () => {
    expect(() => toArray(join(null, [], fn, fn, fn))).toThrowError("outer is null or undefined");
    expect(() => toArray(join(undefined, [], fn, fn, fn))).toThrowError("outer is null or undefined");
  });

  it("should throw when the inner is null or undefined", () => {
    expect(() => toArray(join([], null, fn, fn, fn))).toThrowError("inner is null or undefined");
    expect(() => toArray(join([], undefined, fn, fn, fn))).toThrowError("inner is null or undefined");
  });

  it("should throw when the outerKeySelector is null or undefined", () => {
    expect(() => toArray(join([], [], null, fn, fn))).toThrowError("outerKeySelector is null or undefined");
    expect(() => toArray(join([], [], undefined, fn, fn))).toThrowError("outerKeySelector is null or undefined");
  });

  it("should throw when the innerKeySelector is null or undefined", () => {
    expect(() => toArray(join([], [], fn, null, fn))).toThrowError("innerKeySelector is null or undefined");
    expect(() => toArray(join([], [], fn, undefined, fn))).toThrowError("innerKeySelector is null or undefined");
  });

  it("should throw when the resultSelector is null or undefined", () => {
    expect(() => toArray(join([], [], fn, fn, null))).toThrowError("resultSelector is null or undefined");
    expect(() => toArray(join([], [], fn, fn, undefined))).toThrowError("resultSelector is null or undefined");
  });

  it("should throw when the outter is not an enumerable", () => {
    expect(() => toArray(join(123, [], fn, fn, fn))).toThrowError("source can not be enumerated");
    expect(() => toArray(join(false, [], fn, fn, fn))).toThrowError("source can not be enumerated");
  });

  it("should throw when the inner is not an enumerable", () => {
    expect(() => toArray(join([], 123, fn, fn, fn))).toThrowError("source can not be enumerated");
    expect(() => toArray(join([], false, fn, fn, fn))).toThrowError("source can not be enumerated");
  });

  it("should throw when the outerKeySelector is not a Function", () => {
    expect(() => toArray(join([], [], {}, fn, fn))).toThrowError("outerKeySelector must be a Function");
  });

  it("should throw when the innerKeySelector is not a Function", () => {
    expect(() => toArray(join([], [], fn, {}, fn))).toThrowError("innerKeySelector must be a Function");
  });

  it("should throw when the resultSelector is not a Function", () => {
    expect(() => toArray(join([], [], fn, fn, {}))).toThrowError("resultSelector must be a Function");
  });

  it("should return a joined result of an enumerables based on a comparer", () => {
    let outer = asEnumerable([5, 3, 7]);
    let inner = asEnumerable(["bee", "giraffe", "tiger", "badger", "ox", "cat", "dog"]);

    let query = outer.join(
      inner,
      outerElement => outerElement,
      innerElement => innerElement.length,
      (outerElement, innerElement) => outerElement + ':' + innerElement
      );

    expect(toArray(query)).toEqual(["5:tiger", "3:bee", "3:cat", "3:dog", "7:giraffe"]);
  });
});