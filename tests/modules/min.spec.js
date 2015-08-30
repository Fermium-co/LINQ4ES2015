/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import min from '../../src/modules/min';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('min', () => {
  testUtils.setPrototype('min', min);

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => min(null)).toThrowError('source is null or undefined');
    expect(() => min(undefined)).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source is not and enumerable', () => {
    expect(() => min(123)).toThrowError('source can not be enumerated');
    expect(() => min(false)).toThrowError('source can not be enumerated');
  });

  it('should return number of elements inside an enumerable', () => {
    expect(asEnumerable([1, 2, 3]).min()).toEqual(1);
    expect(min([1, 2, 3])).toEqual(1);
  });

  it('should return number of elements passing a predicate inside an enumerable', () => {
    expect(asEnumerable([{ a: 1 }, { a: 2 }, { a: 3 }]).min(o => o.a)).toEqual({ a: 1 });
    expect(min([{ a: 1 }, { a: 2 }, { a: 3 }], o => o.a)).toEqual({ a: 1 });
  });
});