import linq from './src/linq';
linq();

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var odd = arr.asEnumerable().where(n => n % 2 !== 0).toArray();
var even = arr.asEnumerable().where(n => n % 2 === 0).toArray();

console.log('array: ' + arr);
console.log('odds: ' + odd);
console.log('evens: ' + even);