# LINQ4ES2015

Language Integrated Query (LINQ) for JavaScript based on ECMA Script 2015

(formerly known as [ES6](https://github.com/lukehoban/es6features))

## Installing

To install LINQ4ES2015, [Node JS](https://nodejs.org) is required.

If you've not configured [jspm](http://jspm.io) yet, follow [K Scott Allen's blog post](http://odetocode.com/blogs/scott/archive/2015/02/18/using-jspm-with-visual-studio-2015-and-asp-net-5.aspx)

Go to the root directory of the project and run the following command to install LINQ4ES2015:

    jspm install github:Fermium-co/LINQ4ES2015@0.0.1

You can use any version instead of 0.0.1 (see [releases](https://github.com/Fermium-co/LINQ4ES2015/releases)).

## Usage

After installing LINQ4ES2015 you can use the following JavaScript code to import it:
```javascript
	import Linq from "Fermium-co/LINQ4ES2015/linq";
```
a simple usage is shown in the following code (Prototype based approach):
```javascript
    Linq.setExtensions(); // You've to run this, if you're interested in prototype based approach.
    let count = 0;
    let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
      .where(num => { count++; return num % 2 == 0; })
      .take(3)
      .orderByDescending(num => num)
      .select(num => '[' + num + ']')
      .distinct()
      .toArray();
    
    let sum = 'a2r3'.asEnumerable().where(chr => !isNaN(chr)).select(num => Number(num)).sum();
    // sum will be 5  
```

or wihtout extentions (No prototype modification is required):
```javascript
    let enumerable = Linq.asEnumerable([0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9]);
    let result = Linq.toArray(Linq.distinct(Linq.select(Linq.orderByDescending(Linq.take(Linq.where(enumerable, n => n % 2 == 0), 3), n => n), n => '[' + n ']')));
    // You don't have to call Linq.setExtensions with this approach, and you can load any module you'd prefer to use, instead of loading all of them.
```

result will be [ "[2]", "[0]" ] and where predicate will be executed only 4 times.

## Samples

Download the [samples](https://github.com/Fermium-co/LINQ4ES2015/tree/dev/samples) folder and run the following command in the sample's directory:

    jspm insatll

We need a webserver to run the sample. [http-server](https://github.com/indexzero/http-server) is a simple one. install it by runnting this command:

    npm install http-server -g  

then run the following command in the sample's directory:

    http-server

## Roadmap

***Supported methods***:

* **Projection and restriction methods**:

    select, selectMany, where
* **Join methods**:

    groupJoin, join
* **Set methods**:

    all, any, contains, concat, defaultIfEmpty, distinct, except, intersect, union
* **Ordering methods**:

    orderBy, orderByDescending, reverse
* **Grouping methods**:

    groupBy
* **Aggregate Methods**:

    aggregate, average, count, max, min, sum, 
* **Paging methods**:

    elementAt, elementAtOrDefault, first, firstOrDefault, last, lastOrDefault, single, singleOrDefault,
    
    skip, skipWhile, take, takeWhile 
* **Enumerable methods**:

    asEnumerable, empty, range, repeat
* **Other methods**:

    zip, toLooup, toArray, sequenceEqual

***In Progress Methods***:

thenBy
thenByDescending


## Contribute

There are many ways to contribute to LINQ4ES2015.

* Submit bugs and help us verify fixes as they are checked in.
* Review the source code changes.
* Contribute bug fixes and implementaion improvements.
* Contribute developing new features.
* Contribute adding more specific test specs. 

## Documentation

documentaion will be available soon.
