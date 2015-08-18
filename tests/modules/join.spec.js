/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import join from "../../src/modules/join";

describe("join", () => {
  let fn = () => { };

  it("should throw when the outer is null or undefined", () => {
    expect(() => join(null, [], fn, fn, fn).toArray()).toThrowError("outer is null or undefined");
    expect(() => join(undefined, [], fn, fn, fn).toArray()).toThrowError("outer is null or undefined");
  });

  it("should throw when the inner is null or undefined", () => {
    expect(() => join([], null, fn, fn, fn).toArray()).toThrowError("inner is null or undefined");
    expect(() => join([], undefined, fn, fn, fn).toArray()).toThrowError("inner is null or undefined");
  });

  it("should throw when the outerKeySelector is null or undefined", () => {
    expect(() => join([], [], null, fn, fn).toArray()).toThrowError("outerKeySelector is null or undefined");
    expect(() => join([], [], undefined, fn, fn).toArray()).toThrowError("outerKeySelector is null or undefined");
  });

  it("should throw when the innerKeySelector is null or undefined", () => {
    expect(() => join([], [], fn, null, fn).toArray()).toThrowError("innerKeySelector is null or undefined");
    expect(() => join([], [], fn, undefined, fn).toArray()).toThrowError("innerKeySelector is null or undefined");
  });

  it("should throw when the resultSelector is null or undefined", () => {
    expect(() => join([], [], fn, fn, null).toArray()).toThrowError("resultSelector is null or undefined");
    expect(() => join([], [], fn, fn, undefined).toArray()).toThrowError("resultSelector is null or undefined");
  });

  it("should throw when the outter is not an enumerable", () => {
    expect(() => join({}, [], fn, fn, fn).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw when the inner is not an enumerable", () => {
    expect(() => join([], {}, fn, fn, fn).toArray()).toThrowError("source can not be enumerated");
  });

  it("should throw when the outerKeySelector is not a Function", () => {
    expect(() => join([], [], {}, fn, fn).toArray()).toThrowError("outerKeySelector must be a Function");
  });

  it("should throw when the innerKeySelector is not a Function", () => {
    expect(() => join([], [], fn, {}, fn).toArray()).toThrowError("innerKeySelector must be a Function");
  });

  it("should throw when the resultSelector is not a Function", () => {
    expect(() => join([], [], fn, fn, {}).toArray()).toThrowError("resultSelector must be a Function");
  });

  it("should return a lookup of an enumerables based on a comparer", () => {
    let outer = [5, 3, 7].asEnumerable();
    let inner = ["bee", "giraffe", "tiger", "badger", "ox", "cat", "dog"].asEnumerable();

    let query = outer.join(
      inner,
      outerElement => outerElement,
      innerElement => innerElement.length,
      (outerElement, innerElement) => outerElement + ':' + innerElement
      );

    expect(query.toArray()).toEqual(["5:tiger", "3:bee", "3:cat", "3:dog", "7:giraffe"]);
  });
});