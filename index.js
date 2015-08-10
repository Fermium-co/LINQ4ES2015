import linq from './src/linq';

linq();

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

let oddWhereExecutionCount = 0;

let odds = arr.asEnumerable().where(n => {
	oddWhereExecutionCount++;
	return n % 2 !== 0;
}).take(2).toArray();

let evenWhereExecutionCount = 0;

let evens = arr.asEnumerable().where(n => {
	evenWhereExecutionCount++;
	return n % 2 === 0;
}).take(2).toArray();

console.log('array: ' + arr);
console.log('odds: ' + odds);
console.log('evens: ' + evens);
console.log('oddWhereExecutionCount: ' + oddWhereExecutionCount);
console.log('evenWhereExecutionCount: ' + evenWhereExecutionCount);