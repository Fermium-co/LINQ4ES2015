/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import first from '../../src/modules/first';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('first', () => {
  testUtils.setPrototype('first', first);
  
  it('should throw an exception when the source is null or undefined', () => {
    expect(() => first(null)).toThrowError('source is null or undefined');
    expect(() => first(undefined)).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => first(123)).toThrowError('source can not be enumerated');
    expect(() => first(false)).toThrowError('source can not be enumerated');
  });

  it('should throw if there is no element', () => {
    expect(() => asEnumerable([]).first()).toThrowError('Sequence is empty');
    expect(() => first([])).toThrowError('Sequence is empty');
  });

  it('should throw if there is no element passing the predicate', () => {
    expect(() => asEnumerable([1, 3, 5]).first(n => n % 2 === 0)).toThrowError('Sequence contains no matching element');
    expect(() => first([1, 3, 5], n => n % 2 === 0)).toThrowError('Sequence contains no matching element');
  });

  it('should return the first element of an enumerable', () => {
    expect(asEnumerable([1, 2, 3]).first()).toEqual(1);
    expect(first([1, 2, 3])).toEqual(1);
  });

  it('should return the first element of an enumerable passing a predicate', () => {
    expect(asEnumerable([1, 2, 3, 4, 5]).first(n => n % 2 === 0)).toEqual(2);
    expect(first([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});