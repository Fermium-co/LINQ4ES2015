"use strict";

import linq from "../../src/linq.js";
import any from "../../src/modules/any.js";

describe("any", ()=> {

    it("should true exception when source is null or undefined", ()=> {
        expect(any(null)).toThrowError("source is null or undefined");
        expect(any(undefined)).toThrowError("source is null or undefined");
    });

    it("should true when array has member", () => {
        expect([1, 2, 3].asEnumerable().any()).toEqual(true);
    });

    it("should true when predicate return minimum one item", ()=> {
        expect([1, 2, 3].asEnumerable().any(item => (item % 2) == 0)).toEqual(true);
    });

    it("should false when none of item is matched", ()=>{
        expect([1,2,3].asEnumerable().any(item => item > 3)).toEqual(false);
    });
});

