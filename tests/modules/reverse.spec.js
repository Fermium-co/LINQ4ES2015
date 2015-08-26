/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import reverse from '../../src/modules/reverse';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('reverse', () => {
  testUtils.setPrototype('reverse', reverse);

  it('should throw exception when source is null or undefined', () => {
    expect(() => toArray(reverse(null))).toThrowError('source is null or undefined');
    expect(() => toArray(reverse(undefined))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the source can not be enumerated', () => {
    expect(() => toArray(reverse(123))).toThrowError('source can not be enumerated');
    expect(() => toArray(reverse(false))).toThrowError('source can not be enumerated');
  });

  it('should return a reversed enumerable of a specified enumerable', () => {
    let reversed = asEnumerable([1, 2, 3, 4, 5]).reverse();
    expect(toArray(reversed)).toEqual([5, 4, 3, 2, 1]);
  });

})