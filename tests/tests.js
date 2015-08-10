import {assert, suite} from './FermTest';
import linq from '../src/linq';
linq();

suite('where should filter corresponding to the provided predicate function', () => {
	let arr = [1, 2, 3, 4];
	let odd = arr.asEnumerable().where(n => n % 2 !== 0).toArray();
	assert('odd.length must be 2', odd.length == 2);
	assert('odd[0] must be 1', odd[0] == 1);
	assert('odd[1] must be 3', odd[1] == 3);
});

suite('take should return the specified number of elements', () => {
	let arr = [1, 2, 3, 4];
	let took3 = arr.asEnumerable().take(3).toArray();
	assert('took3.length must be 3', took3.length == 3);
	assert('took3[0] must be 1', took3[0] == 1);
	assert('took3[1] must be 2', took3[1] == 2);
	assert('took3[2] must be 3', took3[2] == 3);
});

suite('select should return the projected elements of elements', () => {
	let arr = [1, 2, 3];
	let projectedArr = arr.asEnumerable().select(n => '[' + n + ']').toArray();
	assert('projectedArr.length must be 3', projectedArr.length == 3);
	assert('projectedArr[0] must be [1]', projectedArr[0] == '[1]');
	assert('projectedArr[1] must be [2]', projectedArr[1] == '[2]');
	assert('projectedArr[2] must be [3]', projectedArr[2] == '[3]');
});

