import linq from './src/linq';

linq();

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

let oddWhereExecutionTime = 0;

let odd = arr.asEnumerable().where(n => {
	oddWhereExecutionTime++;
	return n % 2 !== 0;
}).take(2).toArray();

let evenWhereExecutionTime = 0;

let even = arr.asEnumerable().where(n => {
	evenWhereExecutionTime++;
	return n % 2 === 0;
}).take(2).toArray();

console.log('array: ' + arr);
console.log('odds: ' + odd);
console.log('evens: ' + even);
console.log('oddWhereExecutionTime: ' + oddWhereExecutionTime);
console.log('evenWhereExecutionTime: ' + evenWhereExecutionTime);