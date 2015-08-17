/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import selectMany from "../../src/modules/selectMany";

describe("selectMany", () => {
  let items = [{ name: 'A', orders: [{ name: 'A', price: 1000 }, { name: 'B', price: 2000 }] }, { name: 'B', orders: [{ name: 'C', price: 3000 }, { name: 'D', price: 4000 }] }];

  it("should retrn all orders", () => {
    let orders = items.asEnumerable().selectMany(item => item.orders).toArray();
    expect(orders.length).toBe(4);
    expect(orders).toEqual([{ name: 'A', price: 1000 }, { name: 'B', price: 2000 }, { name: 'C', price: 3000 }, { name: 'D', price: 4000 }]);
  });

  it("should retrn all orders", () => {
    let orders = items.asEnumerable().selectMany(item => item.orders.asEnumerable().where(ord => ord.price > 1000)).toArray();
    expect(orders.length).toBe(3);
    expect(orders).toEqual([{ name: 'B', price: 2000 }, { name: 'C', price: 3000 }, { name: 'D', price: 4000 }]);
  });

  it("should call projection 2 times because of where method", () => {
    let fakeObject = { fakeProjection: item => item.orders };
    spyOn(fakeObject, 'fakeProjection').and.callThrough();
    let orders = items.asEnumerable().where(i => i.name == 'A').selectMany(fakeObject.fakeProjection).toArray();
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith({ name: 'A', orders: [{ name: 'A', price: 1000 }, { name: 'B', price: 2000 }] }, 0);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith({ name: 'B', orders: [{ name: 'C', price: 1000 }, { name: 'D', price: 2000 }] }, 1);
    expect(fakeObject.fakeProjection.calls.count()).toBe(1);
    expect(orders).toEqual([{ name: 'A', price: 1000 }, { name: 'B', price: 2000 }]);
  });

  it("should call projection 2 times because of take method", () => {
    let fakeObject = { fakeProjection: item => item.orders };
    spyOn(fakeObject, 'fakeProjection').and.callThrough();
    let orders = items.asEnumerable().selectMany(fakeObject.fakeProjection).take(1).toArray();
    expect(fakeObject.fakeProjection).toHaveBeenCalledWith({ name: 'A', orders: [{ name: 'A', price: 1000 }, { name: 'B', price: 2000 }] }, 0);
    expect(fakeObject.fakeProjection).not.toHaveBeenCalledWith({ name: 'B', orders: [{ name: 'C', price: 1000 }, { name: 'D', price: 2000 }] }, 1);
    expect(fakeObject.fakeProjection.calls.count()).toBe(1);
    expect(orders).toEqual([{ name: 'A', price: 1000 }]);
  });

  it("should throws an exception when the source is null or undefined", () => {
    expect(() => toArray(selectMany(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(selectMany(undefined, item => item))).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not an enumerable", () => {
    expect(() => toArray(selectMany({}, item => item))).toThrowError("source must be an enumerable");
  });

  it("should throws an exception when the projection format is not a function", () => {
    expect(() => toArray(selectMany([], {}))).toThrowError("projection format must be a function");
  });
});