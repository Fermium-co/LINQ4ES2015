/* global describe, it, expect */
"use strict";

import linq from "../src/linq";

describe("linq", () => {
  it("should be a function", () => {
    expect((typeof linq)).toBe("function");
  });
});

linq();