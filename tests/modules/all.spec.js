"use strict";

import linq from "../../src/linq.js";
import all from "../../src/modules/all.js";

describe("all", ()=> {
    it("should throw exception when source is null or undefined", () => {
        expect(all(null, item => item > 0).toThrowError("source is null or undefined"));
        expect(all(undefined, item => item > 0)).toThrowError("source is null or undefined");
    });

    it("should throw exception when predicate is null or undefined", ()=> {
        expect([1,2,3].all()).toThrowError("predicate is null or undefined");
        expect([1,2,3].all(null)).toThrowError("predicate is null or undefined");
    });

    it("should return true when array is empty", ()=>{
        expect([].all(item => item > 0)).toEqual(true);
    });

    it("should true when array items is smaller than 4", ()=> {
        expect([1,2,3].all(item => item < 4)).toEqual(true);
    });

    it("should false when array items mimimum one of them is not smaller than 4", ()=> {
        expect([1,2,3,4].all(item => item < 4)).toEqual(false);
    });
});