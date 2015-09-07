/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import sortBy from '../../src/modules/sortBy';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('sortBy', () => {
  testUtils.setPrototype('sortBy', sortBy);

  it('should throw an exception when the source is null or undefined', () => {
    //expect(() => toArray(sortBy(null, item => item))).toThrowError('source is null or undefined');
    //expect(() => toArray(sortBy(undefined, item => item))).toThrowError('source is null or undefined');
  });

  it('should throw an exception when the keySelector is null or undefined', () => {
    //expect(() => toArray(sortBy([], null))).toThrowError('keySelector is null or undefined');
    //expect(() => toArray(sortBy([], undefined))).toThrowError('keySelector is null or undefined');
  });

  it('should throw an exception when the keySelector is not a function', () => {
    //expect(() => toArray(sortBy([], {}))).toThrowError('keySelector must be a function');
  });

  it('should throw an exception when the source is not an enumerable', () => {
    //expect(() => toArray(sortBy(123, item => item))).toThrowError('source can not be enumerated');
    //expect(() => toArray(sortBy(false, item => item))).toThrowError('source can not be enumerated');
  });

  it('should retrn ordered items', () => {
    let arr = [3, 2, 6, 4];
    let orderedItems = asEnumerable(arr).sortBy(num => num);
    expect(toArray(orderedItems)).toEqual([2, 3, 4, 6]);
  });

  it('should return ordered set of complex items', () => {
    let arr = [{ name: 'C' }, { name: 'A' }, { name: 'B' }];
    let orderedItems = toArray(asEnumerable(arr).sortBy(a => a.name));
    expect(orderedItems).toEqual([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
  });

  it('should return ordered set of complex items, based on provided keySelectors respectively: v1', () => {
    let actual = [
      { name: 'saleh1', family: 'yusefnejad' },
      { name: 'saleh3', family: 'yusefnejad' },
      { name: 'saleh2', family: 'yusefnejad' },
      { name: 'yasser', family: 'moradi' },
      { name: 'yasser2', family: 'moradi' },
      { name: 'yasser', family: 'moradi3' }
    ];

    let expected = [
      { name: 'yasser', family: 'moradi' },
      { name: 'yasser2', family: 'moradi' },
      { name: 'yasser', family: 'moradi3' },
      { name: 'saleh1', family: 'yusefnejad' },
      { name: 'saleh2', family: 'yusefnejad' },
      { name: 'saleh3', family: 'yusefnejad' }
    ];

    expect(toArray(asEnumerable(actual).sortBy(e => e.family, e => e.name))).toEqual(expected);
  });

  it('should return ordered set of complex items, based on provided keySelectors respectively: v2', () => {
    let actual = [
      { name: 'saleh1', family: 'yusefnejad' },
      { name: 'saleh3', family: 'yusefnejad' },
      { name: 'saleh2', family: 'yusefnejad' },
      { name: 'yasser', family: 'moradi' },
      { name: 'yasser2', family: 'moradi' },
      { name: 'yasser', family: 'moradi3' }
    ];

    let expected = [
      { name: 'yasser2', family: 'moradi' },
      { name: 'yasser', family: 'moradi' },
      { name: 'yasser', family: 'moradi3' },
      { name: 'saleh3', family: 'yusefnejad' },
      { name: 'saleh2', family: 'yusefnejad' },
      { name: 'saleh1', family: 'yusefnejad' }
    ];

    expect(toArray(asEnumerable(actual).sortBy(e => e.family, [e => e.name, true]))).toEqual(expected);
    expect(toArray(asEnumerable(actual).sortBy(e => e.family, { k: e => e.name, d: true }))).toEqual(expected);
    expect(toArray(asEnumerable(actual).sortBy(e => e.family, { key: e => e.name, des: true }))).toEqual(expected);
    expect(toArray(asEnumerable(actual).sortBy(e => e.family, { keySelector: e => e.name, descending: true }))).toEqual(expected);

  });

  it('should return ordered set of complex items, based on provided keySelectors respectively: v3', () => {
    let comparer = {
      compare: (a, b) => {
        if (a.length > b.length) return 1;
        if (a.length === b.length) return 0;
        return -1;
      }
    };

    let actual = [
      { name: 'saleh1', family: 'yusefnejad' },
      { name: 'saleh3', family: 'yusefnejad' },
      { name: 'saleh2', family: 'yusefnejad' },
      { name: 'yasser', family: 'moradi' },
      { name: 'yasser2', family: 'moradi' },
      { name: 'yasser', family: 'moradi3' }
    ];

    let expected = [
      { name: 'yasser2', family: 'moradi' },
      { name: 'yasser', family: 'moradi' },
      { name: 'yasser', family: 'moradi3' },
      { name: 'saleh3', family: 'yusefnejad' },
      { name: 'saleh2', family: 'yusefnejad' },
      { name: 'saleh1', family: 'yusefnejad' }
    ];

    expect(toArray(asEnumerable(actual).sortBy([e => e.family, false, comparer], { k: e => e.name, d: true }))).toEqual(expected);
    expect(toArray(asEnumerable(actual).sortBy({ k: e => e.family, d: false, c: comparer }, { key: e => e.name, des: true }))).toEqual(expected);
    expect(toArray(asEnumerable(actual).sortBy({ key: e => e.family, des: false, c: comparer }, { keySelector: e => e.name, descending: true }))).toEqual(expected);
    expect(toArray(asEnumerable(actual).sortBy({ keySelector: e => e.family, descending: false, comparer: comparer }, [e => e.name, true]))).toEqual(expected);
  });
});