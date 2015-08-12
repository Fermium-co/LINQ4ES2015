/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import utils from "../../src/modules/utils";

describe("utils", () => {

  it("should reurn true when the passed argument is a generator", () => {
    expect(utils.isGenerator((function* () { })())).toBe(true);
  });

  it("should reurn false when the passed argument is not a generator", () => {
    expect(utils.isGenerator((function () { }))).toBe(false);
    expect(utils.isGenerator({})).toBe(false);
    expect(utils.isGenerator(null)).toBe(false);
    expect(utils.isGenerator(undefined)).toBe(false);
    expect(utils.isGenerator(1)).toBe(false);
    expect(utils.isGenerator("")).toBe(false);
  });
});