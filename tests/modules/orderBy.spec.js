/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import orderBy from '../../src/modules/orderBy';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('orderBy', () => {
  testUtils.setPrototype('orderBy', orderBy);

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(orderBy(null, item => item))).toThrowError('source is null or undefined');
    expect(() => toArray(orderBy(undefined, item => item))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the keySelector is null or undefined', () => {
    expect(() => toArray(orderBy([], null))).toThrowError('keySelector is null or undefined');
    expect(() => toArray(orderBy([], undefined))).toThrowError('keySelector is null or undefined');
  });

  it('should throw an exception when the keySelector is not a function', () => {
    expect(() => toArray(orderBy([], {}))).toThrowError('keySelector must be a function');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(orderBy(123, item => item))).toThrowError('source can not be enumerated');
    expect(() => toArray(orderBy(false, item => item))).toThrowError('source can not be enumerated');
  });

  it('should retrn ordered items', () => {
    let arr = [3, 2, 6, 4];
    let orderedItems = asEnumerable(arr).orderBy(num => num);
    expect(toArray(orderedItems)).toEqual([2, 3, 4, 6]);
  });

  it('should return ordered set of complex items', () => {
    let arr = [{ name: 'C' }, { name: 'A' }, { name: 'B' }];
    let orderedItems = toArray(asEnumerable(arr).orderBy(item => item.name));
    expect(orderedItems).toEqual([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
  });

  it('should return ordered set of complex items, based on provided keySelectors respectively', () => {
    let arr = [{ name: 'saleh2', family: 'yusefnejad' }, { name: 'saleh3', family: 'yusefnejad' }, { name: 'saleh1', family: 'yusefnejad' }];
    let orderedItems = toArray(asEnumerable(arr).orderBy([a => a.family, a => a.name]));
    expect(orderedItems).toEqual([{ name: 'saleh1', family: 'yusefnejad' }, { name: 'saleh2', family: 'yusefnejad' }, { name: 'saleh3', family: 'yusefnejad' }]);
  });
});