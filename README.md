# LINQ4ES2015
Linq for ECMA Script 2015 (formerly known as [ES6](https://github.com/lukehoban/es6features))

Language Integrated Query for JavaScript based on ECMA Script 2015

## Installing

To install LINQ4ES2015, [Node JS](https://nodejs.org) is required.

first install [jspm](http://jspm.io) by running following command:

    npm install jspm -g
    
go to the root directory of the project and run the following command to install LINQ4ES2015:

    jspm install github:Fermium-co/LINQ4ES2015@0.0.1

You can use any version instead of 0.0.1 (see [releases](https://github.com/Fermium-co/LINQ4ES2015/releases)).

after running the command, answer all the questions jspm asking with default values (just press enter).

be sure to select **babel** as the ES6 transpiler. 

## Usage

after installing LINQ4ES2015 you can use the following javascript code to import it:

	import Linq from "Fermium-co/LINQ4ES2015/linq";

a simple usage is shown in the following code:

    Linq.setExtensions();
    let count = 0;
    let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
      .where(num => { count++; return num % 2 == 0; })
      .take(3)
      .orderByDescending(num => num)
      .select(num => '[' + num + ']')
      .distinct()
      .toArray();

or wihtout extentions:

    let enumerable = Linq.asEnumerable([0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9]);
    let result = Linq.toArray(Linq.distinct(Linq.select(Linq.orderByDescending(Linq.take(Linq.where(enumerable, n => n % 2 == 0), 3), n => n), n => '[' + n ']')));

result will be [ "[2]", "[0]" ] and where predicate will be executed only 4 times.

## Samples

download the [samples](https://github.com/Fermium-co/LINQ4ES2015/tree/dev/samples) folder and run the following command in the sample's directory:

    jspm insatll

we need a webserver to run the sample. [http-server](https://github.com/indexzero/http-server) is a simple one. install it by runnting this command:

    npm install http-server -g  

then run the following command in the sample's directory:

    http-server

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

There are many ways to contribute to LINQ4ES2015.

* Submit bugs and help us verify fixes as they are checked in.
* Review the source code changes.
* Contribute bug fixes and implementaion improvements.
* Contribute developing new features.
* Contribute adding more specific test specs. 

## Documentation

documentaion will be available soon.