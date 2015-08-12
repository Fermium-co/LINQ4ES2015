/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";

describe("toArray", () => {
  
  it("must throws an exception when the source is null or undefined", () => {
    expect(() => toArray(null).toArray()).toThrowError("source is null or undefined");
    expect(() => toArray(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("must throws an exception when the source is not and enumerable", () => {
    expect(() => toArray({}).toArray()).toThrowError("source must be an enumerable");
  });
});