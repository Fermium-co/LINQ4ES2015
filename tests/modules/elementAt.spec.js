/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import elementAt from '../../src/modules/elementAt';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('elementAt', () => {
  testUtils.setPrototype('elementAt', elementAt);
  
  it('should throw an exception when the source is null or undefined', () => {
    expect(() => elementAt(null, 0)).toThrowError('source is null or undefined');
    expect(() => elementAt(undefined, 0)).toThrowError('source is null or undefined');
  });
  
  it('should throw an exception when the index is not a number', () => {
    expect(() => elementAt([], null)).toThrowError('index must be a number');
    expect(() => elementAt([], undefined)).toThrowError('index must be a number');
    expect(() => elementAt([], '123')).toThrowError('index must be a number');
    expect(() => elementAt([], false)).toThrowError('index must be a number');
    expect(() => elementAt([], {})).toThrowError('index must be a number');
  });

  it('should throw an exception when the index is negetive', () => {
    expect(() => elementAt([], -1)).toThrowError('index must be non-negetive');
  });

  it('should throw an exception if there is no element', () => {
    expect(() => asEnumerable([]).elementAt(1)).toThrowError('sequence contains no elements');
    expect(() => elementAt([], 1)).toThrowError('sequence contains no elements');
  });

  it('should throw an exception if index is out of range', () => {
    expect(() => asEnumerable([1, 2]).elementAt(2)).toThrowError('index is out of range');
    expect(() => elementAt([1, 2], 2)).toThrowError('index is out of range');
  });

  it('should return the element at provided index', () => {
    expect(asEnumerable([1, 3, 5]).elementAt(2)).toEqual(5);
    expect(elementAt([1, 3, 5], 0)).toEqual(1);
  });
});