/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import asEnumerable from '../../src/modules/asEnumerable';
import testUtils from '../testUtils';
import utils from '../../src/modules/utils'
import toArray from '../../src/modules/toArray'

describe('asEnumerable', () => {
  testUtils.setPrototype('asEnumerable', asEnumerable);

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(asEnumerable(null))).toThrowError('source is null or undefined');
    expect(() => toArray(asEnumerable(undefined))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source can not be enumerated', () => {
    expect(() => toArray(asEnumerable(12))).toThrowError('source can not be enumerated');
    expect(() => toArray(asEnumerable(false))).toThrowError('source can not be enumerated');
  });

  it('should return an enumerable object of an array', () => {
    expect(utils.isGenerator(asEnumerable([1, 2, 3]))).toEqual(true);
  });

  it('should return an enumerable object of a string', () => {
    expect(utils.isGenerator(asEnumerable('abcd'))).toEqual(true);
    expect(toArray(asEnumerable('abcd'))).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return an enumerable object of an object', () => {
    expect(utils.isGenerator(asEnumerable({ a: 1, b: 2, c: 3 }))).toEqual(true);
    expect(toArray(asEnumerable({ a: 1, b: 2, c: 3 }))).toEqual([{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]);
  });
});