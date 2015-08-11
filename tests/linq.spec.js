/* global describe it expect */
"use strict";

import linq from "../src/linq";

describe("linq", () => {
  it("must be a function", () => {
    expect((linq instanceof Function));
  });
});