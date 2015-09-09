import Linq from "./src/linq";

// let enumerable = Linq.asEnumerable([0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9]);
// let result = Linq.toArray(Linq.distinct(Linq.select(Linq.orderByDescending(Linq.take(Linq.where(enumerable, n => n % 2 == 0), 3), n => n), n => '[' + n + ']')));

// let count = 0;
// let enumerable = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable();
// let where = Linq.where(enumerable, n => { count++; return n % 2 == 0 });
// let take = Linq.take(where, 3);
// let order = Linq.orderByDescending(take, n => n);
// let select = Linq.select(order, n => '[' + n + ']');
// let distinct = Linq.distinct(select);
// let result = Linq.toArray(distinct);

//Linq.setExtensions();
// let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
//     .where(num => num % 2 == 0)
//     .take(3)
//     .orderByDescending(num => num)
//     .select(num => '[' + num + ']')
//     .distinct()
//     .toArray();

//console.log(result);
//console.log(count);



Linq.setExtensions();
let en = [
  { name: 'saleh1', family: 'yusefnejad' },
  { name: 'saleh3', family: 'yusefnejad' },
  { name: 'saleh2', family: 'yusefnejad' },
  { name: 'saleh4', family: 'yusefnejad' },
  { name: 'saleh2', family: 'yusefnejad' },

  { name: 'yasser', family: 'moradi' },
  { name: 'yasser2', family: 'moradi' },
  { name: 'yasser', family: 'moradi4' },
  { name: 'yasser', family: 'moradi3' }
];

let comparer = {
  compare: (a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] == b[0]) return 0;
    return -1;
  }
};

console.log(en.asEnumerable()
//.sortBy(e => e.family)
//.sortBy(e => e.family, e => e.name)
//.sortBy(e => e.family, [e => e.name, true])
//.sortBy(e => e.family, [e => e.name, true, comparer])
//.sortBy(e => e.family, { k: e => e.name, d: true })
//.sortBy(e => e.family, { k: e => e.name, d: true, c: comparer })
//.sortBy(e => e.family, { key: e => e.name, des: true, comp: comparer })
//.sortBy(e => e.family, { keySelector: e => e.name, descending: true, comparer: comparer })
  .sortBy({ k: e => e.family, d: false , c: comparer }, { keySelector: e => e.name, descending: true })
  .select(e => e.name + ' ' + e.family)
  .toArray().join('\n'));

//console.log(en.asEnumerable()
  //.orderBy(e => e.name)
  //.orderBy([e => e.name, e => e.family])
  //.orderByDescending(e => e.name)
  //.orderByDescending([e => e.name, e => e.family])
  //.select(e => e.name + ' ' + e.family)
  //.toArray().join('\n'));

// console.log(
//   Linq.toArray(
//     Linq.select(
//       Linq.orderBy(
//         Linq.thenBy(
//           Linq.asEnumerable(en), e => e.family), e => e.name), e => e.name + ' ' + e.family)
//     ));