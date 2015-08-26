/* global describe, it, expect */
'use strict';

import Linq from '../src/linq';
import asEnumerable from '../src/modules/asEnumerable';

describe('linq', () => {
  it('should have a function named setExtensions', () => {
    expect((typeof Linq.setExtensions)).toBe('function');
  });

  it('should add all linq methods to Linq class', () => {

    expect(typeof Linq.repeat).toBe('function');
    expect(typeof Linq.range).toBe('function');
    expect(typeof Linq.asEnumerable).toBe('function');

    expect(typeof Linq.aggregate).toBe('function');
    expect(typeof Linq.all).toBe('function');
    expect(typeof Linq.any).toBe('function');
    expect(typeof Linq.average).toBe('function');
    expect(typeof Linq.concat).toBe('function');
    expect(typeof Linq.contains).toBe('function');
    expect(typeof Linq.count).toBe('function');
    expect(typeof Linq.defaultIfEmpty).toBe('function');
    expect(typeof Linq.distinct).toBe('function');
    expect(typeof Linq.elementAt).toBe('function');
    expect(typeof Linq.elementAtOrDefault).toBe('function');
    expect(typeof Linq.except).toBe('function');
    expect(typeof Linq.first).toBe('function');
    expect(typeof Linq.firstOrDefault).toBe('function');
    expect(typeof Linq.groupBy).toBe('function');
    expect(typeof Linq.groupJoin).toBe('function');
    expect(typeof Linq.intersect).toBe('function');
    expect(typeof Linq.join).toBe('function');
    expect(typeof Linq.last).toBe('function');
    expect(typeof Linq.lastOrDefault).toBe('function');
    expect(typeof Linq.max).toBe('function');
    expect(typeof Linq.min).toBe('function');
    expect(typeof Linq.orderBy).toBe('function');
    expect(typeof Linq.orderByDescending).toBe('function');
    expect(typeof Linq.reverse).toBe('function');
    expect(typeof Linq.select).toBe('function');
    expect(typeof Linq.selectMany).toBe('function');
    expect(typeof Linq.sequenceEqual).toBe('function');
    expect(typeof Linq.single).toBe('function');
    expect(typeof Linq.singleOrDefault).toBe('function');
    expect(typeof Linq.skip).toBe('function');
    expect(typeof Linq.skipWhile).toBe('function');
    expect(typeof Linq.sum).toBe('function');
    expect(typeof Linq.take).toBe('function');
    expect(typeof Linq.takeWhile).toBe('function');
    expect(typeof Linq.toArray).toBe('function');
    expect(typeof Linq.toLookup).toBe('function');
    expect(typeof Linq.union).toBe('function');
    expect(typeof Linq.where).toBe('function');
    expect(typeof Linq.zip).toBe('function');
  });

  describe('setExtensions', () => {
    it('should add all linq methods to GeneratorFunction prototype', () => {
      let enumerable = asEnumerable([]);
      Linq.setExtensions();

      expect(typeof enumerable.aggregate).toBe('function');
      expect(typeof enumerable.all).toBe('function');
      expect(typeof enumerable.any).toBe('function');
      expect(typeof enumerable.average).toBe('function');
      expect(typeof enumerable.concat).toBe('function');
      expect(typeof enumerable.contains).toBe('function');
      expect(typeof enumerable.count).toBe('function');
      expect(typeof enumerable.defaultIfEmpty).toBe('function');
      expect(typeof enumerable.distinct).toBe('function');
      expect(typeof enumerable.elementAt).toBe('function');
      expect(typeof enumerable.elementAtOrDefault).toBe('function');
      expect(typeof enumerable.except).toBe('function');
      expect(typeof enumerable.first).toBe('function');
      expect(typeof enumerable.firstOrDefault).toBe('function');
      expect(typeof enumerable.groupBy).toBe('function');
      expect(typeof enumerable.groupJoin).toBe('function');
      expect(typeof enumerable.intersect).toBe('function');
      expect(typeof enumerable.join).toBe('function');
      expect(typeof enumerable.last).toBe('function');
      expect(typeof enumerable.lastOrDefault).toBe('function');
      expect(typeof enumerable.max).toBe('function');
      expect(typeof enumerable.min).toBe('function');
      expect(typeof enumerable.orderBy).toBe('function');
      expect(typeof enumerable.orderByDescending).toBe('function');
      expect(typeof enumerable.reverse).toBe('function');
      expect(typeof enumerable.select).toBe('function');
      expect(typeof enumerable.selectMany).toBe('function');
      expect(typeof enumerable.sequenceEqual).toBe('function');
      expect(typeof enumerable.single).toBe('function');
      expect(typeof enumerable.singleOrDefault).toBe('function');
      expect(typeof enumerable.skip).toBe('function');
      expect(typeof enumerable.skipWhile).toBe('function');
      expect(typeof enumerable.sum).toBe('function');
      expect(typeof enumerable.take).toBe('function');
      expect(typeof enumerable.takeWhile).toBe('function');
      expect(typeof enumerable.toArray).toBe('function');
      expect(typeof enumerable.toLookup).toBe('function');
      expect(typeof enumerable.union).toBe('function');
      expect(typeof enumerable.where).toBe('function');
      expect(typeof enumerable.zip).toBe('function');
    });
  });

});