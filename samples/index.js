import Linq from "Fermium-co/LINQ4ES2015/linq";
Linq.setExtensions();

let count = 0;
let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
  .where(num => { count++; return num % 2 == 0; })
  .take(3)
  .orderByDescending(num => num)
  .select(num => '[' + num + ']')
  .distinct()
  .toArray();

console.log(result);
console.log(count);
// Where
// One of the main tasks of a LINQ query is to restrict the results from a larger
// collection based on some criteria. This is achieved using the Where operator,
// which tests each element within a source collection and returns only those
// elements that return a true result when tested against a given predicate
// expression. A predicate is simply an expression that takes an element of the
// same type of the items in the source collection and returns true or false. 

var animals = ["Koala", "Kangaroo","Spider", "Wombat","Snake","Emu","Shark","Sting-Ray","Jellyfish"];
var q = animals.asEnumerable()
  .where(a=> a.indexOf("S") === 0 && a.length > 5)
  .toArray();

console.log('using where clause ...');

for (var index = 0; index < q.length; index++) 
  console.log(q[index]);
  
  //Select
  // The process of transforming the results of a query is called projection.
  //  You can project the results of a query after any filters have been applied 
  //  to change the type of the collection that is returned. For example, you can 
  //  select a single property or field from the source data or project multiple 
  //  properties into an type. You can also add calculations and other 
  //  operations to the projection to generate information that is based upon the 
  //  source data but not directly retrieved from it.
  
  var employees = [
    {name: "Bob", title: "Senior Developer", salary: 40000},
    {name: "Sam", title: "Developer",        salary: 32000},
    {name: "Mel", title: "Developer",        salary: 29000},
    {name: "Jim", title: "Junior Developer", salary: 20000},
  ];
  
  var names = employees.asEnumerable()
    .select(emp => emp.name)
    .toArray();
    
    console.log("using select method to project name property ...");
    for (var index = 0; index < names.length; index++)
      console.log(names[index]);
      
      
      var salaryIncrease = employees.asEnumerable()
      .select(emp => 
         "Employee : " + emp.name + 
          " Salary : " + emp.salary + 
          " New salary : " + emp.salary * 1.05)
          .toArray();
      
      console.log("projection with calculation ... ");
      
      for (var index = 0; index < salaryIncrease.length; index++)
        console.log(salaryIncrease[index]);
  