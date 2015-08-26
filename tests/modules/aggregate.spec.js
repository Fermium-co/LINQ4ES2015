/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import aggregate from '../../src/modules/aggregate';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('aggregate', () => {
  testUtils.setPrototype('aggregate', aggregate);
  let fn = () => { };

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => aggregate(null, '', fn, fn)).toThrowError('source is null or undefined');
    expect(() => aggregate(undefined, '', fn, fn)).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the func is null or undefined', () => {
    expect(() => aggregate([], '', null, fn)).toThrowError('func is null or undefined');
    expect(() => aggregate([], '', undefined, fn)).toThrowError('func is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => aggregate(false, '', fn, fn)).toThrowError('source can not be enumerated');
    expect(() => aggregate(123, '', fn, fn)).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the func is not a function', () => {
    expect(() => aggregate([], '', {})).toThrowError('func must be a Function');
  });

  it('should aggregate elements of an enumerable based on a provided accumulator function', () => {
    expect(asEnumerable([1, 2, 3]).aggregate('', (result, current) => result += current + ',')).toEqual('1,2,3,');
    expect(aggregate([1, 2, 3], 0, (result, current) => result += current)).toEqual(6);
  });
});