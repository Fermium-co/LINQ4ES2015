/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import lastOrDefault from '../../src/modules/lastOrDefault';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('lastOrDefault', () => {
  testUtils.setPrototype('lastOrDefault', lastOrDefault);
  
  it('should throw an exception when the source is null or undefined', () => {
    expect(() => lastOrDefault(null)).toThrowError('source is null or undefined');
    expect(() => lastOrDefault(undefined)).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => lastOrDefault(123)).toThrowError('source can not be enumerated');
    expect(() => lastOrDefault(false)).toThrowError('source can not be enumerated');
  });

  it('should return null if there is no element', () => {
    expect(asEnumerable([]).lastOrDefault()).toEqual(null);
    expect(lastOrDefault([])).toEqual(null);
  });

  it('should return null if there is no element passing the predicate', () => {
    expect(asEnumerable([1, 3, 5]).lastOrDefault(n => n % 2 === 0)).toEqual(null);
    expect(lastOrDefault([1, 3, 5], n => n % 2 === 0)).toEqual(null);
  });

  it('should return the last element of an enumerable', () => {
    expect(asEnumerable([1, 2, 3]).lastOrDefault()).toEqual(3);
    expect(lastOrDefault([1, 2, 3])).toEqual(3);
  });

  it('should return the last element of an enumerable passing a predicate', () => {
    expect(asEnumerable([1, 2, 3, 4, 5]).lastOrDefault(n => n % 2 === 0)).toEqual(4);
    expect(lastOrDefault([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(4);
  });
});