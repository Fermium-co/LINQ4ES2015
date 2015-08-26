/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import take from '../../src/modules/take';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('take', () => {
  testUtils.setPrototype('take', take);
  
  let arr = [1, 2, 3, 4, 5, 6];

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(take(null, 1))).toThrowError('source is null or undefined');
    expect(() => toArray(take(undefined, 1))).toThrowError('source is null or undefined');
  });
  
  it('should throw an exception when the count is null or undefined', () => {
    expect(() => toArray(take([], null))).toThrowError('count is null or undefined');
    expect(() => toArray(take([], undefined))).toThrowError('count is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(take(123, 1))).toThrowError('source can not be enumerated');
    expect(() => toArray(take(false, 1))).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the take number is not a number', () => {
    expect(() => toArray(take([], {}))).toThrowError('count must be a number');
  });

  it('should retrn first two items', () => {
    let evenNumbers = toArray(asEnumerable(arr).take(2));
    expect(evenNumbers).toEqual([1, 2]);
  });
});