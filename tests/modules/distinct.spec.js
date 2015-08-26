/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import distinct from '../../src/modules/distinct';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('distinct', () => {
  testUtils.setPrototype('distinct', distinct);

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(distinct(null))).toThrowError('source is null or undefined');
    expect(() => toArray(distinct(undefined))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(distinct(123))).toThrowError('source can not be enumerated');
    expect(() => toArray(distinct(false))).toThrowError('source can not be enumerated');
  });

  it('should return distinct elements of an enumerable', () => {
    expect(toArray(asEnumerable([1, 2, 2, 3, 3, 3]).distinct())).toEqual([1, 2, 3]);
    expect(toArray(distinct([1, 2, 2, 3, 3, 3]))).toEqual([1, 2, 3]);
  });

  it('should return distinct elements of an enumerable based on a comparer', () => {
    expect(toArray(asEnumerable([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ])
      .distinct((a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }]);

    expect(toArray(distinct([
      { id: 1, name: 'saleh' },
      { id: 2, name: 'yasser' },
      { id: 1, name: 'sali' }
    ], (a, b) => a.id === b.id)))
      .toEqual([{ id: 1, name: 'saleh' }, { id: 2, name: 'yasser' }]);
  });
});