/**
 *
 * @param {number[]} nums
 */
function LIS_BF(nums) {
	const LEN = nums.length;
	let max_ref = 1;

	/**
	 *
	 * @param {number} n
	 * @returns
	 */
	function recurs(n) {
		if(n === 1) {
			return 1;
		}

		let max_ending=1;
		for(let i=0; i<n; i++) {
			let res = recurs(i); // always scan from the beginning
			if (nums[n-1] > nums[i-1] && res + 1 > max_ending) {
				max_ending = res + 1;
			}
		}

		if (max_ending > max_ref) {
			max_ref = max_ending;
		}
		return max_ending;
	}

	recurs(LEN);
	console.log(max_ref);
}

function LIST_DP(nums) {
	let n = nums.length;
	const arr = new Array(n).fill(1);

	for(let i=1;i<n;i++) {
		for(let j=0;j<i;j++) {
			if (nums[i]>nums[j] && arr[j]+1 > arr[i]) {
				arr[i] = arr[j] + 1;
			}
		}
	}

	// console.log(arr);
	let max = arr.reduce((carry, num) => {
		return Math.max(carry, num);
	}, arr[0]);
	return max;
}

let arr = [10, 22, 9, 33, 21, 50, 41, 60];
let time_start = new Date();
LIS_BF(arr);
let time_end = new Date();
console.log(`${time_end.getTime() - time_start.getTime()}`);
console.log(LIST_DP(arr));
let time_end2 = new Date();
console.log(`${time_end2.getTime() - time_end.getTime()}`);