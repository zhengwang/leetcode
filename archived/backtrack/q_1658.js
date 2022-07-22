/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {
	const LEN = nums.length;
	const recurs = function(start, end, counter, remain) {
		console.log(`remain=${remain} start=${start} end=${end} counter=${counter}`);
		if (remain === 0) {
			return counter;
		}
		if (start > end) return -1;
		
		counter++;
		let max;
		if (nums[start] >= nums[end] && nums[start] <= remain) {
			max = nums[start];
			start++;
		} else if (nums[end] <= remain){
			max = nums[end];
			end--;
		} else {
			return -1;
		}
		
		return recurs(start, end, counter, remain - max);
	}

	console.log(recurs(0, LEN-1, 0, x));
};

const nums = [6016,5483,541,4325,8149,3515,7865,2209,9623,9763,4052,6540,2123,2074,765,7520,4941,5290,5868,6150,6006,6077,2856,7826,9119];
const x = 31841;
minOperations(nums, x);