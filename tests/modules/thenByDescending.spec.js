/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderByDescending from "../../src/modules/orderByDescending";
import thenByDescending from "../../src/modules/thenByDescending";

describe("thenByDescending", () => {
  let simpleArr = [3, 2, 6, 4];
  let complexArr = [{ firstName: 'C', lastName: 'D' }, { firstName: 'A', lastName: 'C' }, { firstName: 'A', lastName: 'B' }];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(thenByDescending(null, item => item))).toThrowError("source is null or undefined");
    expect(() => toArray(thenByDescending(undefined, item => item))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(thenByDescending({}, item => item))).toThrowError("source must be an enumerable");
  });

  it("should throw an exception when the order by column is not a function", () => {
    expect(() => toArray(thenByDescending([], {}))).toThrowError("order by descending column must be a function");
  });

  it("should throw an exception even with valid arguments, if no orderBy or orderByDescending is called before", () => {
    expect(() => simpleArr.asEnumerable().thenByDescending(num => num).toArray()).toThrowError("thenByDescending must be called after orderBy or orderByDescending");
  });

  it("should retrn ordered set of complex items", () => {
    let orderedItems = complexArr.asEnumerable()
      .orderBy(item => item.firstName)
      .thenByDescending(item => item.lastName)
      .toArray();

    expect(orderedItems.length).toBe(3);
    expect(orderedItems[0]).EqualTo({ firstName: 'C', lastName: 'D' });
    expect(orderedItems[1]).EqualTo({ firstName: 'A', lastName: 'C' });
    expect(orderedItems[2]).EqualTo({ firstName: 'A', lastName: 'B' });
  });

  it("should call then by comparer function correctly because of order by method", () => {
    let fakeObject = { fakeThenByDescending: item => item.lastName };
    spyOn(fakeObject, 'fakeThenByDescending').and.callThrough();
    complexArr.asEnumerable()
      .orderBy(item => item.firstName)
      .thenByDescending(item => fakeObject.fakeThenByDescending)
      .toArray();
    
    expect(fakeObject.fakeThenByDescending).toHaveBeenCalledWith('B');
    expect(fakeObject.fakeThenByDescending).toHaveBeenCalledWith('C');
    expect(fakeObject.fakeThenByDescending).not.toHaveBeenCalledWith('D');
    expect(fakeObject.fakeThenByDescending.calls.count()).toBe(2);    
  });
});