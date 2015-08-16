/* global describe, it, expect */
"use strict";

import linq from "../src/linq";
import * as jasmine from "jasmine";

describe("linq", () => {
  it("should be a function", () => {
    expect((typeof linq)).toBe("function");
  });
});

linq();