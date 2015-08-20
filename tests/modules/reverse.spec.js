/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import reverse from "../../src/modules/reverse";
import toArray from "../../src/modules/toArray";

describe("reverse", () => {
  let arr = [1, 2, 3, 4, 5];

  it("should throw exception when source is null or undefined", () => {
    expect(() => toArray(reverse(null))).toThrowError("source is null or undefined");
    expect(() => toArray(reverse(undefined))).toThrowError("source is null or undefined");
  });

  it("first element of source array is equal to last element of result array", () => {
    expect(arr.asEnumerable().reverse().toArray()[0]).toEqual(arr[arr.length - 1]);
  });

  it("first element of source array is equal to last element of result array", () => {
    expect(arr.asEnumerable().reverse().toArray()).toEqual([5, 4, 3, 2, 1]);
  });

})