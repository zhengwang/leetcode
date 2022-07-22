/**
 * @param {number[]|string[]} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
	let x = arr[i], y = arr[j];
	arr[i] = y;
	arr[j] = x;
}

/**
 * @param {number[]|string[]} arr
 */
function insertSort(arr) {
	console.log("Before sort");
	console.log(arr);

	const LEN = arr.length;
	for(let i=1; i<LEN; i++) {
		for(let j=i; j>=0; j--) {
			if (arr[j] < arr[j-1] ) {
				swap(arr, j-1, j);
			}
		}
	}
	console.log(arr);
}

/**
 * @param {number[]|string[]} arr
 * @param {number} i
 * @param {number} j
 */
function insertElement(arr, i, j) {
	let x = arr[j];
	for(; j>=i; j--) {
		arr[j] = arr[j-1];
	}
	arr[i] = x;
}

/**
 * @param {number[]|string[]} arr
 * @param {number} lo
 * @param {number} hi
 * @param {number|string} pivot
 */
function binarySearch(arr, lo, hi, pivot) {
	// if (lo >= hi) return pivot > arr[lo] ? lo + 1: lo;
	if (lo >= hi) return lo;

	let mid = lo + Math.floor((hi-lo)/2);
	if (arr[mid] < pivot) {
		return binarySearch(arr, mid + 1, hi, pivot);
	} else {
		return binarySearch(arr, lo, mid - 1, pivot);
	}
}

/**
 * @param {number[]|string[]} arr
 */
function insertSortBinary(arr) {
	const LEN = arr.length;
	for(let i=0; i< LEN; i++) {
		for(let j=i+1; j>=0&&j<LEN; j--) {
			let position = binarySearch(arr, 0, j, arr[j]);
			insertElement(arr, position, j);
		}
	}
	console.log(arr);
}

insertSort("MERGESORT".split(''));
insertSortBinary([23,17,14,6,13,13,10,1,5,7,12]);

