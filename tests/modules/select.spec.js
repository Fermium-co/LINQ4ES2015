/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import select from '../../src/modules/select';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('select', () => {
  testUtils.setPrototype('select', select);
  
  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(select(null, num => num))).toThrowError('source is null or undefined');
    expect(() => toArray(select(undefined, num => num))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the selector is not a function', () => {
    expect(() => toArray(select([], {}))).toThrowError('selector must be a function');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(select(123, num => num))).toThrowError('source can not be enumerated');
    expect(() => toArray(select(false, num => num))).toThrowError('source can not be enumerated');
  });

  it('should retrn items with provided selector function', () => {
    let evenNumbers = toArray(asEnumerable([1, 2, 3, 4]).select(num => '[' + num + ']'));
    expect(evenNumbers.length).toBe(4);
    expect(evenNumbers[0]).toBe('[1]');
    expect(evenNumbers[1]).toBe('[2]');
    expect(evenNumbers[2]).toBe('[3]');
    expect(evenNumbers[3]).toBe('[4]');
  });
});