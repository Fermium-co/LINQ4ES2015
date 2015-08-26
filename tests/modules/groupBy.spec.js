/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import groupBy from '../../src/modules/groupBy';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('groupBy', () => {
  testUtils.setPrototype('groupBy', groupBy);
  let fn = () => { };

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(groupBy(null, fn, fn))).toThrowError('source is null or undefined');
    expect(() => toArray(groupBy(undefined, fn, fn))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the keySelector is null or undefined', () => {
    expect(() => toArray(groupBy([], null, fn))).toThrowError('keySelector is null or undefined');
    expect(() => toArray(groupBy([], undefined, fn))).toThrowError('keySelector is null or undefined');
  });

  it('should throw an exception when the elementSelector is null or undefined', () => {
    expect(() => toArray(groupBy([], fn, null))).toThrowError('elementSelector is null or undefined');
    expect(() => toArray(groupBy([], fn, undefined))).toThrowError('elementSelector is null or undefined');
  });

  it('should throw when the source is not an enumerable', () => {
    expect(() => toArray(groupBy(123, fn, fn))).toThrowError('source can not be enumerated');
    expect(() => toArray(groupBy(false, fn, fn))).toThrowError('source can not be enumerated');
  });

  it('should throw when the keySelector is not function', () => {
    expect(() => toArray(groupBy([], {}, fn))).toThrowError('keySelector must be a Function');
  });

  it('should throw when the elementSelector is not Function', () => {
    expect(() => toArray(groupBy([], fn, {}))).toThrowError('elementSelector must be a Function');
  });

  it('should return a grouped result of an enumerable based on a comparer', () => {
    expect(toArray(asEnumerable(['abc', 'hello', 'def', 'there', 'four'])
      .groupBy(x => x.length, x=> x[0], (key, elements) => key + ':' + elements.join(';'))))
      .toEqual(['3:a;d', '5:h;t', '4:f']);
  });
});