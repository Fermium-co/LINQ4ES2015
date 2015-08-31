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
  { name: 'saleh6', family: 'yusefnejad' },
  { name: 'saleh2', family: 'yusefnejad' },
  { name: 'saleh4', family: 'yusefnejad' },
  { name: 'saleh5', family: 'yusefnejad' },
  { name: 'saleh3', family: 'yusefnejad' },

  { name: 'yasser2', family: 'moradi' },
  { name: 'yasser2', family: 'moradi' },
  { name: 'yasser2', family: 'moradi4' },
  { name: 'yasser2', family: 'moradi3' }
];

console.log(en.asEnumerable()
  .orderBy(e => e.name)
  .thenBy(e => e.family)
  .select(e => e.name + ' ' + e.family)
  .toArray());

// console.log(
//   Linq.toArray(
//     Linq.select(
//       Linq.orderBy(
//         Linq.thenBy(
//           Linq.asEnumerable(en), e => e.family), e => e.name), e => e.name + ' ' + e.family)
//     ));