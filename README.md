# LINQ4ES2015
Language Integrated Query for JavaScript based on ECMA Script 2015

**Getting started:**

1. > jspm install
2. > bower install

Sample usage:

	let result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
		.where(num => num % 2 == 0)
		.take(3)
		.orderByDescending(num => num)
		.select(num => '[' + num + ']')
		.toArray();

Result will be [4, 2, 0] and where predicate will be executed only 6 times.
	
Contributions are welcomed.
