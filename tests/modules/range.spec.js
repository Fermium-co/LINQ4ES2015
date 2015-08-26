/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import range from '../../src/modules/range';
import toArray from '../../src/modules/toArray';

describe('range', () => {  
  it('should throw an exception when start is not a number', () => {
    expect(() => toArray(range({}, 5))).toThrowError('start must be a number');
  });
  
  it('should throw an exception when count is not a number', () => {
    expect(() => toArray(range(5, {}))).toThrowError('count must be a number');
  });
  
  it('should throw an exception when count is negative', () => {
    expect(() => toArray(range(1, -1))).toThrowError('count may not be negative');
  });
  
  it('should return simple valid iteration of numbers', () => {
    expect(toArray(range(1, 5))).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an empty array with zero items', () => {
    expect(toArray(range(1, 0))).toEqual([]);
  });
});