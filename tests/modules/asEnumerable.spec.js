/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import asEnumerable from "../../src/modules/asEnumerable";

describe("asEnumerable", () => {

  it("must throws an exception when the source is null or undefined", () => {
    expect(() => asEnumerable(null).toArray()).toThrowError("source is null or undefined");
    expect(() => asEnumerable(undefined).toArray()).toThrowError("source is null or undefined");
  });

  it("must throws an exception when the source can not be enumerated", () => {
    expect(() => asEnumerable({}).toArray()).toThrowError("source can not be enumerated");
  });

  it("must throws an exception when the source is enumerable", () => {
    expect(() => asEnumerable((function* () { })()).toArray()).toThrowError("enumerable may not be enumerated twice");
  });

});