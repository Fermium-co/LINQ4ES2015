import Linq from 'Fermium-co/LINQ4ES2015/linq';
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
/* Where
One of the main tasks of a LINQ query is to restrict the results from a larger
collection based on some criteria. This is achieved using the Where operator,
which tests each element within a source collection and returns only those
elements that return a true result when tested against a given predicate
expression. A predicate is simply an expression that takes an element of the
same type of the items in the source collection and returns true or false.*/

let animals = ['Koala', 'Kangaroo', 'Spider', 'Wombat', 'Snake', 'Emu', 'Shark', 'Sting-Ray', 'Jellyfish'];
let q = animals.asEnumerable()
  .where(a=> a.indexOf('S') === 0 && a.length > 5)
  .toArray();

console.log('using where clause ...');

for (let index = 0; index < q.length; index++)
  console.log(q[index]);
  
/*Select
The process of transforming the results of a query is called projection.
You can project the results of a query after any filters have been applied 
to change the type of the collection that is returned. For example, you can 
select a single property or field from the source data or project multiple 
properties into an type. You can also add calculations and other 
operations to the projection to generate information that is based upon the 
source data but not directly retrieved from it.*/

let employees = [
  { name: 'Bob', title: 'Senior Developer', salary: 40000 },
  { name: 'Sam', title: 'Developer', salary: 32000 },
  { name: 'Mel', title: 'Developer', salary: 29000 },
  { name: 'Jim', title: 'Junior Developer', salary: 20000 },
];

let names = employees.asEnumerable()
  .select(emp => emp.name)
  .toArray();

console.log('*** using select method to project name property ...');
for (let index = 0; index < names.length; index++)
  console.log(names[index]);


let salaryIncrease = employees.asEnumerable()
  .select(emp =>
    'Employee : ' + emp.name +
    ' Salary : ' + emp.salary +
    ' New salary : ' + emp.salary * 1.05)
  .toArray();

console.log('*** projection with calculation ... ');

for (let index = 0; index < salaryIncrease.length; index++)
  console.log(salaryIncrease[index]);
  
/*Select Many
  This method `s parameter is used to extract a child collection from each parent item.
  Finally all of the child collection are combined , or flattened , into a single array.
  Let`s extend above sample empployees list that employee objects include a collection of strings
  holding the skills. When the SelectMany method is used to read the Skills collections , the four 
  set of skills are extracted and the combined into a single array.
*/

let employeesIncudeSkills = [
  { name: 'Bob', title: 'Senior Developer', salary: 40000, skills: ['ASP.NET', 'C#', 'JavaScript', 'SQL', 'XML'] },
  { name: 'Sam', title: 'Developer', salary: 32000, skills: ['ASP.NET', 'C#', 'Oracle', 'XML'] },
  { name: 'Mel', title: 'Developer', salary: 29000, skills: ['C#', 'C++', 'SQL'] },
  { name: 'Jim', title: 'Junior Developer', salary: 20000, skills: ['HTML', 'Visual Basic'] }
];

let skills = employeesIncudeSkills.asEnumerable()
  .selectMany(emp => emp.skills)
  .toArray();

console.log("*** using selectMany method to combine skills ...");
for (let index = 0; index < skills.length; index++)
  console.log(skills[index]);
  
  
/*Grouping
Grouping operators return collections of the source elements grouped by some algorithm.
This method provides the ability to organise information into groups.
you can specify a key based on the data held in a collection. The source data is then 
segregated into several enumerable lists, each containing all of the items with a matching key.
For example, you may group a collection of stock items by their categories. The result is a 
group of collections, one for each unique category, each containing all of the products in 
that category.
Grouping of data has many uses. You may decide to group a large data set and display one group 
at a time through the user interface. The user may be able to change the visible group using a 
combo box or selection of radio buttons. You may also group the information so that you can aggregate 
the data, obtaining sums, averages or other aggregations for each group.
 */

let stock = [
  { name: 'Apple', category: 'Fruit', price: 0.30 },
  { name: 'Banana', category: 'Fruit', price: 0.35 },
  { name: 'Orange', category: 'Fruit', price: 0.29 },
  { name: 'Cabbage', category: 'Vegetable', price: 0.49 },
  { name: 'Carrot', category: 'Vegetable', price: 0.29 },
  { name: 'Lettuce', category: 'Vegetable', price: 0.30 },
  { name: 'Milk', category: 'Dairy', price: 1.12 }
];

let groups = stock.asEnumerable()
  .groupBy(
    s => s.category, //key selector
    s => s.name, //element selector
    (key, elements) => key + " : " + "[" + elements.join(",") + "]")//result selector
  .toArray();

console.log("*** using groupBy method to group category property ...");
for (let index = 0; index < groups.length; index++)
  console.log(groups[index]);
  
/*Join
A join can be achieved on any data as long as both data sources share a common column value.
Although the concept of joining in-memory collections isn’t a common pattern today.
We add to above stock list category list which has common property 
 */

let categories = [
  { name: 'Dairy', majorCategory: 'Chilled' },
  { name: 'Fruit', majorCategory: 'Fresh' },
  { name: 'Vegetable', majorCategory: 'Fresh' }
];

let joints = stock.asEnumerable()
  .join(
    categories.asEnumerable(),
    stockItem => stockItem.category,
    cat => cat.name,
    (stockItem, cat) =>
      "[" +
      "Name = " + stockItem.name + "," +
      "Price = " + stockItem.price + "," +
      "Category = " + cat.name + "," +
      "MajorCategory = " + cat.majorCategory +
      "]"
    ).toArray();

console.log("*** using join method for joining stockItems and categories");

for (let index = 0; index < joints.length; index++)
  console.log(joints[index]);
   
/*GroupJoin
These allow two collections to be combined in a join operation based on matching key values. 
The results are then grouped into keyed collections that may be aggregated.
A grouped join provides similar functionality to grouping and joining. An outer list and 
an inner list are joined into a single entity and then grouped so that each outer element 
is paired with the list of matching inner items
 */

let groupJoins = categories.asEnumerable()
  .groupJoin(
    stock.asEnumerable(),
    cat => cat.name,
    stock => stock.category,
    (cat, stocks) => ({
      category: cat.name,
      major: cat.majorCategory,
      stocks: stocks
    })
    ).toArray();

console.log('*** using groupJoin method to show each category and its stocks related ...');

for (let index = 0; index < groupJoins.length; index++) {
  let cat = groupJoins[index];
  console.log('Category name : ' + cat.category + ' , Major : ' + cat.major);
  for (let stockIndex = 0; stockIndex < cat.stocks.length; stockIndex++) {
    let stock = cat.stocks[stockIndex];

    console.log("[" +
      "Name = " + stock.name + "," +
      "Price = " + stock.price + 
      "]")
  }
}
debugger;
  