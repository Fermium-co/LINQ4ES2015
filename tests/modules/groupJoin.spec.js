/* global describe, it, expect, spyOn, jasmine, toThrowError */

'use strict';

import groupJoin from '../../src/modules/groupJoin';
import testUtils from '../testUtils';
import asEnumerable from '../../src/modules/asEnumerable';
import toArray from '../../src/modules/toArray';

describe('groupJoin', () => {
  testUtils.setPrototype('groupJoin', groupJoin);
  let fn = () => { };

  it('should throw when the outer is null or undefined', () => {
    expect(() => toArray(groupJoin(null, [], fn, fn, fn))).toThrowError('outer is null or undefined');
    expect(() => toArray(groupJoin(undefined, [], fn, fn, fn))).toThrowError('outer is null or undefined');
  });

  it('should throw when the inner is null or undefined', () => {
    expect(() => toArray(groupJoin([], null, fn, fn, fn))).toThrowError('inner is null or undefined');
    expect(() => toArray(groupJoin([], undefined, fn, fn, fn))).toThrowError('inner is null or undefined');
  });

  it('should throw when the outerKeySelector is null or undefined', () => {
    expect(() => toArray(groupJoin([], [], null, fn, fn))).toThrowError('outerKeySelector is null or undefined');
    expect(() => toArray(groupJoin([], [], undefined, fn, fn))).toThrowError('outerKeySelector is null or undefined');
  });

  it('should throw when the innerKeySelector is null or undefined', () => {
    expect(() => toArray(groupJoin([], [], fn, null, fn))).toThrowError('innerKeySelector is null or undefined');
    expect(() => toArray(groupJoin([], [], fn, undefined, fn))).toThrowError('innerKeySelector is null or undefined');
  });

  it('should throw when the resultSelector is null or undefined', () => {
    expect(() => toArray(groupJoin([], [], fn, fn, null))).toThrowError('resultSelector is null or undefined');
    expect(() => toArray(groupJoin([], [], fn, fn, undefined))).toThrowError('resultSelector is null or undefined');
  });

  it('should throw when the outter is not an enumerable', () => {
    expect(() => toArray(groupJoin(123, [], fn, fn, fn))).toThrowError('source can not be enumerated');
    expect(() => toArray(groupJoin(false, [], fn, fn, fn))).toThrowError('source can not be enumerated');
  });

  it('should throw when the inner is not an enumerable', () => {
    expect(() => toArray(groupJoin([], 123, fn, fn, fn))).toThrowError('source can not be enumerated');
    expect(() => toArray(groupJoin([], false, fn, fn, fn))).toThrowError('source can not be enumerated');
  });

  it('should throw when the outerKeySelector is not a function', () => {
    expect(() => toArray(groupJoin([], [], {}, fn, fn))).toThrowError('outerKeySelector must be a Function');
  });

  it('should throw when the innerKeySelector is not a function', () => {
    expect(() => toArray(groupJoin([], [], fn, {}, fn))).toThrowError('innerKeySelector must be a Function');
  });

  it('should throw when the resultSelector is not a function', () => {
    expect(() => toArray(groupJoin([], [], fn, fn, {}))).toThrowError('resultSelector must be a Function');
  });

  it('should return a joined group of an enumerables based on a comparer', () => {
    let outer = asEnumerable([5, 3, 7]);
    let inner = asEnumerable(['bee', 'giraffe', 'tiger', 'badger', 'ox', 'cat', 'dog']);

    let query = outer.groupJoin(
      inner,
      outerElement => outerElement,
      innerElement => innerElement.length,
      (outerElement, innerElements) => outerElement + ':' + innerElements.join(';'));

    expect(toArray(query)).toEqual(['5:tiger', '3:bee;cat;dog', '7:giraffe']);
  });

  it("should return a joined group of an enumerables, which one side is an empty enumerable, when it has no other side data to be joined", () => {

    let authorsData = [
      { authorId: 1, name: "John Smith" },
      { authorId: 2, name: "Harry Gold" },
      { authorId: 3, name: "Ronald Schwimmer" }
    ];

    let booksData =
      [
        { authorId: 1, title: "Little Blue Riding Hood" },
        { authorId: 3, title: "The Three Little Piggy Banks" }
      ];

    let groupJoinResult = toArray(asEnumerable(authorsData).groupJoin(booksData, author => author.authorId, book => book.authorId,
      (author, booksByAuthor) => ({ authorName: author.name, books: booksByAuthor })));

    expect(groupJoinResult[1].books).toEqual([]);

  });
});