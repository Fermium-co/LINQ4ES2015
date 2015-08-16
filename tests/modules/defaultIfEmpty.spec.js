
"user strict";

import linq from "../../src/linq";
import defaultIfEmpty from "../../src/modules/defaultIfEmpty";

describe("defaultIfEmpty", () => {

  it("should throw exception when source is null or empty", () => {
    expect(defaultIfEmpty(null)).toThrowError("source is null or undefined");
    expect(defaultIfEmpty(undefined)).toThrowError("source is null or undefined");
  });

  it("should return default value when source is empty and defaultValue of parameter is null",
    () => {
      expect([].asEnumerable().defaultIfEmpty()).toEqual([null]);
    });

  it("should return parameter defaultValue when array is empty", () => {
    expect([].asEnumerable().defaultIfEmpty("test")).toEqual(["test"]);
  });

  it("should return same array when array is not empty", () => {
    expect([1, 2, 3].asEnumerable().defaultIfEmpty(3)).toEqual([1, 2, 3]);
  });
});
