/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import max from '../../src/modules/max';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';

describe('max', () => {
  testUtils.setPrototype('max', max);

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => max(null)).toThrowError('source is null or undefined');
    expect(() => max(undefined)).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source is not and enumerable', () => {
    expect(() => max(123)).toThrowError('source can not be enumerated');
    expect(() => max(false)).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the enumerable has no element', () => {
    expect(() => max([])).toThrowError('sequence is empty');
  });

  it('should max element of elements inside an enumerable', () => {
    expect(asEnumerable([1, 2, 3]).max()).toEqual(3);
    expect(max([1, 2, 3])).toEqual(3);
  });

  it('should max element of elements passing a predicate inside an enumerable', () => {
    expect(asEnumerable([{ a: 1 }, { a: 2 }, { a: 3 }]).max(o => o.a)).toEqual({ a: 3 });
    expect(max([{ a: 1 }, { a: 2 }, { a: 3 }], o => o.a)).toEqual({ a: 3 });
  });
});