/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
	let ans = [];
	const LEN = nums.length;

	/**
	 * @param {number} start
	 * @param {number} size
	 * @param {number[]} combo
	 */
	const recurs = function(start, size, combo) {
		if (combo.length === size) {
			ans.push(combo);
			return;
		}

		for (let i = start; i < LEN; i++) {
			recurs(i + 1, size, [...combo, nums[i]]);
		}
	}

	for (let size = 0; size <= LEN; size++) {
		recurs(0, size, []);
	}

	console.log(ans);
	return ans;
};

const compressArray = (arr) => {
	
	arr.reduce(num => {

	}, "");
	return str;
}

var _subsetsWithDup = function(nums) {
	const hash = new Map;
	const LEN = nums.length;
	const set = new Map;

	// build hash array
	for (let i = 0; i < LEN; i++) {
		let temp = hash.get(nums[i]);
		if (!temp) {
			hash.set(nums[i], 1);
		} else {
			hash.set(nums[i], ++temp);
		}
	}
	console.log(hash);

	var recurs = function(size, combo) {
		if (combo.length === size) {
			ans.push(combo);
			return;
		}

		for(let [key, val] of hash.entries()) {
			if (val > 0) {
				hash.set(key, --val);
				recurs(size, [...combo, key]);	
				hash.set(key, ++val);
			}
		}
	}

	let ans = [];
	for (let size = 0; size <= LEN; size++) {
		recurs(size, []);
	}

	console.log(ans);
}

let nums = [1, 2, 2];
// subsets(nums);
subsetsWithDup([1,2,2]);