# LINQ4ES2015
Language Integrated Query for JavaScript based on ECMA Script 2015

**Getting started:**

1. > npm i
2. > jspm install
3. > bower install

Sample usage:

	let result = [1,2,3,4,5,6,7,8,9].asEnumerable()
		.where(num => num % 2 == 0)
		.take(2)
		.select(num => '[' + num + '[')
		.toArray();

Result will be [2,4] and where predicate will be executed only 4 times.
	
Contributions are welcomed.
