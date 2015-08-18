/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import any from "../../src/modules/any";

describe("any", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => any(null)).toThrowError("source is null or undefined");
    expect(() => any(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => any({})).toThrowError("source must be an enumerable");
  });

  it("should return true when enumerable has any member", () => {
    expect([1, 2, 3].asEnumerable().any()).toEqual(true);
  });

  it("should return true when enumerable has atleast one item passing the predicate", () => {
    expect([1, 2, 3].asEnumerable().any(n => n % 2 === 0)).toEqual(true);
  });

  it("should return false when no item passes the predicate", () => {
    expect([1, 2, 3].asEnumerable().any(n => n > 3)).toEqual(false);
  });
});

