# LINQ4ES2015
Linq for ECMA Script 2015 (formerly know as ES6)

Language Integrated Query for JavaScript based on ECMA Script 2015

## Installing

create a copy of the master branch:

    git clone https://github.com/Fermium-co/LINQ4ES2015.git

or the lastest version from dev branch:

    git clone https://github.com/Fermium-co/LINQ4ES2015.git -b dev

change to the LINQ4ES2015 directory:

    cd LINQ4ES2015

and run the following command:

    jspm install

install http-server with the following command:

    npm install http-server -g

open a new command line in the root folder of LINQ4ES2015 and run the http-server:

    http-server
    
open the browser and go to localhost:8080, this opens the index.html file.
see the browser console for the results.

## Usage

Sample usage:

	let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
		.where(num => num % 2 == 0)
		.take(3)
		.orderByDescending(num => num)
		.select(num => '[' + num + ']')
		.distinct()
		.toArray();

Result will be ['[2]', '[0]'] and where predicate will be executed only 4 times.

## Roadmap

Supported methods:
* Aggregate
* All
* Any
* AsEnumerable
* Average
* Concat
* Contains
* Count
* DefaultIfEmpty
* Distinct
* Empty
* Except
* First
* FirstOrDefault
* Intersect
* Last
* LastOrDefault
* Max
* Min
* OrderBy
* OrderByDescending
* Range
* Repeat
* Select
* SelectMany
* SequenceEquals
* Single
* SingleOrDefault
* Sum
* Take
* ToArray
* Union
* Where

In Progress Methods:
* Join
* GroupBy
* GroupJoin
* TakeWhile
* SkipWhile
* Skip
* ThenBy
* ThenByDescending
* Reverse
* ElementAt
* ElementAtOrDefault
* Zip

## Contribute

There are many ways to contribute to LINQ4ES2015.

* Submit bugs and help us verify fixes as they are checked in.
* Review the source code changes.
* Contribute bug fixes and implementaion improvements.
* Contribute developing new features.
* Contribute adding more specific test specs. 

## Documentation

documentaion will be available soon.