/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import concat from '../../src/modules/concat';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('concat', () => {
  testUtils.setPrototype('concat', concat);
  
  it('should throw an exception when the first source is null or undefined', () => {
    expect(() => toArray(concat(null, []))).toThrowError('first source is null or undefined');
    expect(() => toArray(concat(undefined, []))).toThrowError('first source is null or undefined');
  });

  it('should throw an exception when the second source is null or undefined', () => {
    expect(() => toArray(concat([], null))).toThrowError('second source is null or undefined');
    expect(() => toArray(concat([], undefined))).toThrowError('second source is null or undefined');
  });

  it('should throw an exception when the first source is not an enumerable', () => {
    expect(() => toArray(concat(123, []))).toThrowError('source can not be enumerated');
    expect(() => toArray(concat(false, []))).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the second source is not either an array or an enumerable', () => {
    expect(() => toArray(concat([], 123))).toThrowError('source can not be enumerated');
    expect(() => toArray(concat([], false))).toThrowError('source can not be enumerated');
  });  
  
  it('should concat two arrays correctly', () => {
    expect(toArray(asEnumerable([1, 2, 3]).concat([4, 5, 6]))).toEqual([1, 2, 3, 4, 5, 6]);
    expect(toArray(concat([1, 2, 3], [4, 5, 6]))).toEqual([1, 2, 3, 4, 5, 6]);
  });
});