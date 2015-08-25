/* global describe, it, expect */
"use strict";

import Linq from "../src/linq";

describe("linq", () => {
  it("should have a function named setExtensions", () => {
    expect((typeof Linq.setExtensions)).toBe("function");
  });
});