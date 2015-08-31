import toArray from './toArray';

export default class OrderedEnumerable {
  constructor(source, comparer) {
    this.source = source;
    this.currentComparer = comparer;
  }

  combine(keySelector, comparer, isDes) {
    if (keySelector === null || keySelector === undefined) {
      throw new Error('keySelector is null or undefined');
    }
    let secondaryComparer = new ProjectionComparer(keySelector, comparer);
    if (isDes) {
      secondaryComparer = new ReverseComparer(secondaryComparer);
    }
    return new OrderedEnumerable(this.source, new CompoundComarer(this.currentComparer, secondaryComparer));
  }

  *getEnumerator() {
    let elements = toArray(this.source);
    while (elements.length > 0) {
      let minElement = elements[0];
      let minIndex = 0;
      for (var i = 0; i < elements.length; i++) {
        if (this.currentComparer.compare(elements[i], minElement) < 0) {
          minElement = elements[i];
          minIndex = i;
        }
      }
      elements.splice(minIndex, 1);
      yield minElement;
    }
  }
}

export class ProjectionComparer {
  constructor(keySelector, comparer) {
    this.keySelector = keySelector;
    this.comparer = comparer;
  }
  compare(x, y) {
    return this.comparer(this.keySelector(x), this.keySelector(y));
  }
}

class ReverseComparer {
  constructor(forwardComparer) {
    this.forwardComparer = forwardComparer;
  }
  compare(x, y) {
    return this.forwardComparer(y, x);
  }
}

class CompoundComarer {
  constructor(primary, secondary) {
    this.primary = primary;
    this.secondary = secondary;
  }
  compare(x, y) {
    let primaryResult = this.primary(x, y);
    if (primaryResult !== 0) {
      return primaryResult;
    }
    return this.secondary.compare(x, y);
  }
}