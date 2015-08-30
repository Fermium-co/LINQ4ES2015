/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import count from '../../src/modules/count';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('count', () => {
  testUtils.setPrototype('count', count);
  
  it('should throw an exception when the source is null or undefined', () => {
    expect(() => count(null)).toThrowError('source is null or undefined');
    expect(() => count(undefined)).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source is not and enumerable', () => {
    expect(() => count(123)).toThrowError('source can not be enumerated');
    expect(() => count(false)).toThrowError('source can not be enumerated');
  });

  it('should return number of elements inside an enumerable', () => {
    expect(asEnumerable([1, 2, 3]).count()).toEqual(3);
    expect(count([1, 2, 3])).toEqual(3);
  });

  it('should return number of elements passing a predicate inside an enumerable', () => {
    expect(asEnumerable([1, 2, 3, 4, 5]).count(n => n % 2 !== 0)).toEqual(3);
    expect(count([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});