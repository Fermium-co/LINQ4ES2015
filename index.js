import linq from './src/linq';
linq();

let result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
    .where(num => num % 2 == 0)
    .take(3)
    .orderByDescending(num => num)
    .select(num => '[' + num + ']')
    .toArray();