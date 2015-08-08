# LINQ4ES2015
Language Integrated Query for JavaScript based on ECMA Script 2015

**Getting started:**

1. Run npm i -g
2. Run jspm init

Sample usage:

let result = toArray(take(where(asEnumerable([1,2,3,4,5,6,7,8,9]), num => num % 2 == 0),2));

Result will be [2,4] and where predicate will be executed only 4 times.

Desired syntax will be something like this:

	[1,2,3,4,5,6,7,8,9].asEnumerable().where(num => num % 2 == 0).take(2).toArray();
	
Contributions are welcomed.