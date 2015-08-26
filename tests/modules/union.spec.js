/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import union from '../../src/modules/union';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('union', () => {
  testUtils.setPrototype('union', union);

  it('should throw an exception when the first is null or undefined', () => {
    expect(() => toArray(union(null, []))).toThrowError('first is null or undefined');
    expect(() => toArray(union(undefined, []))).toThrowError('first is null or undefined');
  });

  it('should throw an exception when the second is null or undefined', () => {
    expect(() => toArray(union([], null))).toThrowError('second is null or undefined');
    expect(() => toArray(union([], undefined))).toThrowError('second is null or undefined');
  });

  it('should throw an exception when the first is not an enumerable', () => {
    expect(() => toArray(union(123, []))).toThrowError('source can not be enumerated');
    expect(() => toArray(union(false, []))).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the second is not an enumerable', () => {
    expect(() => toArray(union([], 123))).toThrowError('source can not be enumerated');
    expect(() => toArray(union([], false))).toThrowError('source can not be enumerated');
  });

  it('should return union elements of two enumerables', () => {
    expect(toArray(asEnumerable([1, 2, 2, 3, 3, 3]).union([3, 4, 5, 6]))).toEqual([1, 2, 3, 4, 5, 6]);
    expect(toArray(union([1, 2, 2, 3, 3, 3], [3, 4, 5, 6]))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should return union and distinct elements of two enumerables based on a comparer', () => {
    expect(toArray(asEnumerable([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ]).union([
      { id: 3, name: 'farshad' },
      { id: 2, name: 'yasi' },
      { id: 1, name: 'salooo' }
    ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }, { id: 3, name: 'farshad' }]);

    expect(toArray(union([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ], [
        { id: 3, name: 'farshad' },
        { id: 2, name: 'yasi' },
        { id: 1, name: 'salooo' }
      ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }, { id: 3, name: 'farshad' }]);
  });
});