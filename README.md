# LINQ4ES2015
Linq for ECMA Script 2015 (formerly known as [ES6](https://github.com/lukehoban/es6features))

Language Integrated Query for JavaScript based on ECMA Script 2015

## Installing

[Node JS](https://nodejs.org) must be install on your machine.

Ensure [jspm](http://jspm.io) and [http-server](https://github.com/indexzero/http-server) are available by running following commands:

    npm install jspm -g
    npm install http-server -g
    
Run jspm install github/Fermium-co/LINQ4ES2015@0.0.1

You can use any version instead of 0.0.1

then write following codes:

	import Linq from "Fermium-co/LINQ4ES2015/linq";
	Linq.setExtensions();

	let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
		.where(num => num % 2 == 0)
		.take(3)
		.orderByDescending(num => num)
		.select(num => '[' + num + ']')
		.distinct()
		.toArray();

Result will be [ '[2]', '[0]' ] and where predicate will be executed only 4 times.

## Roadmap

Supported methods:
* aggregate
* all
* any
* asEnumerable
* average
* concat
* contains
* count
* defaultIfEmpty
* distinct
* elementAt
* elementAtOrDefault
* empty
* except
* first
* firstOrDefault
* groupBy
* groupJoin
* intersect
* join
* last
* lastOrDefault
* max
* min
* orderBy
* orderByDescending
* range
* repeat
* reverse
* select
* selectMany
* sequenceEqual
* single
* singleOrDefault
* skip
* skipWhile
* sum
* take
* takeWhile
* toArray
* toLookup
* union
* where
* zip

In Progress Methods:
* thenBy
* thenByDescending


## Contribute

Fork our repository or clone our dev branch from

    git clone https://github.com/Fermium-co/LINQ4ES2015.git -b dev
    
Run jspm install & http-server.
    
Open the browser and go to [localhost:8080/tests/tests.html](http://localhost:8080/tests/tests.html), this opens the tests.html file.

And wait for test results.

There are many ways to contribute to LINQ4ES2015.

* Submit bugs and help us verify fixes as they are checked in.
* Review the source code changes.
* Contribute bug fixes and implementaion improvements.
* Contribute developing new features.
* Contribute adding more specific test specs. 

## Documentation

documentaion will be available soon.