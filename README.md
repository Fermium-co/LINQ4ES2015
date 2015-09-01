# LINQ4ES2015

Language Integrated Query (LINQ) for JavaScript based on ECMA Script 2015

(formerly known as [ES6](https://github.com/lukehoban/es6features))

## Installing

In order to install & use LINQ4ES2015, [Node JS](https://nodejs.org) is required to be installed on Development machine.

If you've not configured [jspm](http://jspm.io) yet, follow [our blog post](http://fermium.co/post/1c6546ba-891d-479d-8731-896fbbae61fa/JSPM)

Note: Latest version of jspm must be installed on your machine, try running:

    npm update jspm -g

Go to the root directory of the project and run the following command to install LINQ4ES2015:

    jspm install linq4es2015

## Usage

After installing LINQ4ES2015 you can use the following JavaScript code to import it:
```javascript
import Linq from "linq4es2015/linq";
```
a simple usage is shown in the following code (Prototype based approach):
```javascript
Linq.setExtensions(); // You've to run this, only once, if you're interested in prototype based approach.

let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
  .where(num => num % 2 == 0)
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

Note: Each method has its own Wiki page, including description and samples about that method.

Download the [samples](https://github.com/Fermium-co/LINQ4ES2015/tree/dev/samples) folder and run the following commands in the sample's root directory:

    npm install
    
    jspm insatll    

We need a webserver to run the sample. [http-server](https://github.com/indexzero/http-server) is a simple one. install it by runnting this command:

    npm install http-server -g  

then run the following command in the sample's directory:

    http-server
    
Note that you can use any web server you prefer.

## Roadmap

***Supported methods***:

**Click on each method hyperlink to see description and samples. Read [Home Wiki](https://github.com/Fermium-co/LINQ4ES2015/wiki/Home) first**

* **Projection and restriction methods**:

    [select](https://github.com/Fermium-co/LINQ4ES2015/wiki/Select), [selectMany](https://github.com/Fermium-co/LINQ4ES2015/wiki/SelectMany), [where](https://github.com/Fermium-co/LINQ4ES2015/wiki/Where), [How can I write Left Join query?](https://github.com/Fermium-co/LINQ4ES2015/wiki/LeftJoin)
* **Join methods**:

    [groupJoin](https://github.com/Fermium-co/LINQ4ES2015/wiki/GroupJoin), [join](https://github.com/Fermium-co/LINQ4ES2015/wiki/Join)
* **Set methods**:

    [all](https://github.com/Fermium-co/LINQ4ES2015/wiki/All), [any](https://github.com/Fermium-co/LINQ4ES2015/wiki/Any), [contains](https://github.com/Fermium-co/LINQ4ES2015/wiki/Contains), [concat](https://github.com/Fermium-co/LINQ4ES2015/wiki/Concat), [defaultIfEmpty](https://github.com/Fermium-co/LINQ4ES2015/wiki/), [distinct](https://github.com/Fermium-co/LINQ4ES2015/wiki/Distinct), [except](https://github.com/Fermium-co/LINQ4ES2015/wiki/Except), [intersect](https://github.com/Fermium-co/LINQ4ES2015/wiki/Intersect), [union](https://github.com/Fermium-co/LINQ4ES2015/wiki/Union)
* **Ordering methods**:

    orderBy, orderByDescending, [reverse](https://github.com/Fermium-co/LINQ4ES2015/wiki/Reverse)
* **Grouping methods**:

    [groupBy](https://github.com/Fermium-co/LINQ4ES2015/wiki/GroupBy)
* **Aggregate Methods**:

    [aggregate](https://github.com/Fermium-co/LINQ4ES2015/wiki/Aggregate), [average](https://github.com/Fermium-co/LINQ4ES2015/wiki/Average), [count](https://github.com/Fermium-co/LINQ4ES2015/wiki/Count), [max](https://github.com/Fermium-co/LINQ4ES2015/wiki/Max), [min](https://github.com/Fermium-co/LINQ4ES2015/wiki/Min), [sum](https://github.com/Fermium-co/LINQ4ES2015/wiki/Sum)
* **Paging methods**:

    [elementAt](https://github.com/Fermium-co/LINQ4ES2015/wiki/ElementAt), [elementAtOrDefault](https://github.com/Fermium-co/LINQ4ES2015/wiki/ElementAtOrDefault), [first](https://github.com/Fermium-co/LINQ4ES2015/wiki/First), [firstOrDefault](https://github.com/Fermium-co/LINQ4ES2015/wiki/FirstOrDefault), [last](https://github.com/Fermium-co/LINQ4ES2015/wiki/Last), [lastOrDefault](https://github.com/Fermium-co/LINQ4ES2015/wiki/LastOrDefault), [single](https://github.com/Fermium-co/LINQ4ES2015/wiki/Single), [singleOrDefault](https://github.com/Fermium-co/LINQ4ES2015/wiki/SingleOrDefault),
    
    [skip](https://github.com/Fermium-co/LINQ4ES2015/wiki/Skip), [skipWhile](https://github.com/Fermium-co/LINQ4ES2015/wiki/SkipWhile), [take](https://github.com/Fermium-co/LINQ4ES2015/wiki/Take), [takeWhile](https://github.com/Fermium-co/LINQ4ES2015/wiki/TakeWhile) 
* **Enumerable methods**:

    [asEnumerable](https://github.com/Fermium-co/LINQ4ES2015/wiki/AsEnumerable), [empty](https://github.com/Fermium-co/LINQ4ES2015/wiki/Empty), [range](https://github.com/Fermium-co/LINQ4ES2015/wiki/Range), [repeat](https://github.com/Fermium-co/LINQ4ES2015/wiki/Repeat)
* **Other methods**:

    [zip](https://github.com/Fermium-co/LINQ4ES2015/wiki/Zip), [toLookup](https://github.com/Fermium-co/LINQ4ES2015/wiki/ToLookup), [toArray](https://github.com/Fermium-co/LINQ4ES2015/wiki/ToArray), [sequenceEqual](https://github.com/Fermium-co/LINQ4ES2015/wiki/SequenceEqual)

***In Progress Methods***:

thenBy
thenByDescending


## Contribute

See [CONTRIBUTING.md](https://github.com/Fermium-co/LINQ4ES2015/blob/master/CONTRIBUTING.md)

## Documentation

See [Wiki pages](https://github.com/Fermium-co/LINQ4ES2015/wiki)
