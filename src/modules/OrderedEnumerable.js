import toArray from './toArray';

export default class OrderedEnumerable {
  constructor(source, compositeSelector, compositeComparer) {
    this.source = source;
    this.compositeSelector = compositeSelector;
    this.compositeComparer = compositeComparer;
  }

  combine(keySelector, comparer, isDes) {
    if (keySelector === null || keySelector === undefined) {
      throw new Error('keySelector is null or undefined');
    }
    if (isDes) {
      comparer = new ReverseComparer(comparer);
    }
    let primarySelector = this.compositeSelector;
    let newKeySelector = e => ({ primaryKey: primarySelector(e), secondaryKey: keySelector(e) });
    let newKeyComparer = new CompositeComparer(this.compositeComparer, comparer);

    return new OrderedEnumerable(this.source, newKeySelector, newKeyComparer);
  }

  *getEnumerator() {
    let data = toArray(this.source);
    let count = data.length;

    let indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }

    let keys = [];
    for (let i = 0; i < count; i++) {
      keys.push(this.compositeSelector(data[i]));
    }

    let nextYield = 0;
    let stack = [];
    stack.push({ left: 0, right: count - 1 });
    while (stack.length > 0) {
      let leftRight = stack.pop();
      let left = leftRight.left;
      let right = leftRight.right;
      if (right > left) {
        let pivot = parseInt(left + (right - left) / 2);
        let pivotPosition = this.partition(indexes, keys, left, right, pivot);
        stack.push({ left: pivotPosition + 1, right: right });
        stack.push({ left: left, right: pivotPosition - 1 });
      } else {
        while (nextYield <= right) {
          yield data[indexes[nextYield]];
          nextYield++;
        }
      }
    }
  }

  partition(indexes, keys, left, right, pivot) {
    let pivotIndex = indexes[pivot];
    let pivotKey = keys[pivotIndex];

    indexes[pivot] = indexes[right];
    indexes[right] = pivotIndex;
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      let candidateIndex = indexes[i];
      let candidateKey = keys[candidateIndex];
      let comparison = this.compositeComparer.compare(candidateKey, pivotKey);
      if (comparison < 0 || (comparison === 0 && candidateIndex < pivotIndex)) {
        indexes[i] = indexes[storeIndex];
        indexes[storeIndex] = candidateIndex;
        storeIndex++;
      }
    }
    let tmp = indexes[storeIndex];
    indexes[storeIndex] = indexes[right];
    indexes[right] = tmp;
    return storeIndex;
  }

}


// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================



export class ReverseComparer {
  constructor(forwardComparer) {
    this.forwardComparer = forwardComparer;
  }
  compare(x, y) {
    return this.forwardComparer.compare(y, x);
  }
}

class CompositeComparer {
  constructor(primary, secondary) {
    this.primary = primary;
    this.secondary = secondary;
  }

  compare(x, y) {
    let primaryResult = this.primary.compare(x.primaryKey, y.primaryKey);
    if (primaryResult != 0) {
      return primaryResult;
    }
    return this.secondary.compare(x.secondaryKey, y.secondaryKey);
  }
}