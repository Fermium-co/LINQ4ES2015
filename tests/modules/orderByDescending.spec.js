/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import orderByDescending from '../../src/modules/orderByDescending';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('orderByDescending', () => {
  testUtils.setPrototype('orderByDescending', orderByDescending);

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(orderByDescending(null, item => item))).toThrowError('source is null or undefined');
    expect(() => toArray(orderByDescending(undefined, item => item))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the keySelector is null or undefined', () => {
    expect(() => toArray(orderByDescending([], null))).toThrowError('keySelector is null or undefined');
    expect(() => toArray(orderByDescending([], undefined))).toThrowError('keySelector is null or undefined');
  });

  it('should throw an exception when the keySelector is not a function', () => {
    expect(() => toArray(orderByDescending([], {}))).toThrowError('keySelector must be a function');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(orderByDescending(123, item => item))).toThrowError('source can not be enumerated');
    expect(() => toArray(orderByDescending(false, item => item))).toThrowError('source can not be enumerated');
  });

  it('should retrn ordered items', () => {
    let arr = [3, 2, 6, 4];
    let orderedItems = asEnumerable(arr).orderByDescending(n => n);
    expect(toArray(orderedItems)).toEqual([6, 4, 3, 2]);
  });

  it('should retrn ordered set of complex items', () => {
    let arr = [{ name: 'C' }, { name: 'A' }, { name: 'B' }];
    let orderedItems = toArray(asEnumerable(arr).orderByDescending(a => a.name));
    expect(orderedItems).toEqual([{ name: 'C' }, { name: 'B' }, { name: 'A' }]);
  });

  it('should return ordered set of complex items, based on provided keySelectors respectively', () => {
    let arr = [{ name: 'saleh2', family: 'yusefnejad' }, { name: 'saleh3', family: 'yusefnejad' }, { name: 'saleh1', family: 'yusefnejad' }];
    let orderedItems = toArray(asEnumerable(arr).orderByDescending([a => a.family, a => a.name]));
    expect(orderedItems).toEqual([{ name: 'saleh3', family: 'yusefnejad' }, { name: 'saleh2', family: 'yusefnejad' }, { name: 'saleh1', family: 'yusefnejad' }]);
  });
});