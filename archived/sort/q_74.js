/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
	
	/**
	 * @param {number[]} nums
	 * @param {number} lo
	 * @param {number} hi
	 */
	var binarySearch = function(nums, lo, hi) {
		if (lo > hi) return lo;
		let mid = lo + Math.floor((hi-lo)/2);

		if (target < nums[mid]) {
			return binarySearch(nums, lo, mid-1);
		} else if (target > nums[mid]) {
			return binarySearch(nums, mid+1, hi);
		} else {
			return mid;
		}
	}

	// find the row idx
	const column = [];
	const M = matrix.length;
	const N = matrix[0].length;
	for(let i=0; i <M; i++) {
		column.push(matrix[i][0]);
	}

	let row_id = binarySearch(column, 0, M);
	if (column[row_id] === target) {
		return true;
	}
	row_id = column.length === 1 ? 0 : row_id-1;
	// check if the number at row_id equal to the target

	let row = matrix[Math.max(row_id, 0)];
	console.log(`row_id=${row_id}`);
	console.log(row);

	let ans = binarySearch(row, 0, N);
	console.log(`ans=${ans}`);
	return row[ans]===target;
};

let matrix = [[1],[3]];
let target = 3;
console.log(searchMatrix(matrix, target));