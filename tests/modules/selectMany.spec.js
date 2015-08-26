/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import selectMany from '../../src/modules/selectMany';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('selectMany', () => {
  testUtils.setPrototype('selectMany', selectMany);

  let items = [{ name: 'A', orders: [{ name: 'orderA1', price: 1000 }, { name: 'orderA2', price: 2000 }] }, { name: 'B', orders: [{ name: 'orderB1', price: 3000 }, { name: 'orderB2', price: 4000 }] }];

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(selectMany(null, item => item))).toThrowError('source is null or undefined');
    expect(() => toArray(selectMany(undefined, item => item))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the collectionSelector is null or undefined', () => {
    expect(() => toArray(selectMany([], null))).toThrowError('collectionSelector is null or undefined');
    expect(() => toArray(selectMany([], undefined))).toThrowError('collectionSelector is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(selectMany(123, item => item))).toThrowError('source can not be enumerated');
    expect(() => toArray(selectMany(false, item => item))).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the collectionSelector is not a function', () => {
    expect(() => toArray(selectMany([], {}))).toThrowError('collectionSelector must be a function');
  });

  it('should retrn all elements specified as collectionSelector part of enumerable', () => {
    let orders = toArray(asEnumerable(items).selectMany(item => item.orders));
    expect(orders.length).toBe(4);
    expect(orders).toEqual([{ name: 'orderA1', price: 1000 }, { name: 'orderA2', price: 2000 }, { name: 'orderB1', price: 3000 }, { name: 'orderB2', price: 4000 }]);
  });
});