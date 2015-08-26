/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import where from '../../src/modules/where';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('where', () => {
  testUtils.setPrototype('where', where);

  let fn = () => { };
  let arr = [1, 2, 3, 4, 5, 6];

  it('should throw an exception when the source is null or undefined', () => {
    expect(() => toArray(where(null, fn))).toThrowError('source is null or undefined');
    expect(() => toArray(where(undefined, fn))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the predicate is null or undefined', () => {
    expect(() => toArray(where([], null))).toThrowError('predicate is null or undefined');
    expect(() => toArray(where([], undefined))).toThrowError('predicate is null or undefined');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    expect(() => toArray(where(123, fn))).toThrowError('source can not be enumerated');
    expect(() => toArray(where(false, fn))).toThrowError('source can not be enumerated');
  });

  it('should throw an exception when the predicate is not a function', () => {
    expect(() => toArray(where([], {}))).toThrowError('predicate must be a function');
  });

  it('should retrn an array with valid child count', () => {
    let evenNumbers = toArray(asEnumerable(arr).where(num => num % 2 == 0));
    expect(evenNumbers).toEqual([2, 4, 6]);
  });

  it('should retrn an array with valid child count', () => {
    let someEvenNumbers = toArray(asEnumerable(arr).where((num, index) => num % 2 == 0 && index % 3 == 0));
    expect(someEvenNumbers).toEqual([4]);
  });

  it('should not call predicate when result is not get enumerated', () => {
    let fakePredicate = jasmine.createSpy();
    asEnumerable(arr).where(fakePredicate);
    expect(fakePredicate).not.toHaveBeenCalled();
  });

  it('should use current values while doing the acutal enumerating', () => {
    let variable = 2;
    let query = asEnumerable(arr).where(num => num % variable == 0);
    variable = 3;
    let results = toArray(query);
    expect(results).toEqual([3, 6]);
  });

  it('should call predicate when result is get enumerated', () => {
    let fakePredicate = jasmine.createSpy();
    toArray(asEnumerable(arr).where(fakePredicate));
    expect(fakePredicate).toHaveBeenCalledWith(1, 0);
    expect(fakePredicate).toHaveBeenCalledWith(2, 1);
    expect(fakePredicate).toHaveBeenCalledWith(3, 2);
    expect(fakePredicate).toHaveBeenCalledWith(4, 3);
    expect(fakePredicate).toHaveBeenCalledWith(5, 4);
    expect(fakePredicate).toHaveBeenCalledWith(6, 5);
    expect(fakePredicate.calls.count()).toBe(6);
  });
});