/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
	const LEN = nums.length;
	let dp = new Array(LEN).fill(0);

	function recurs(start) {
		if (start >= LEN) return 0;
		if (dp[start] > 0) {
			return dp[start];
		}

		let max_profit = 0;
		max_profit = Math.max(recurs(start+1), nums[start] + recurs(start + 2));
		dp[start] = max_profit;
		return max_profit;
	}
	let temp = recurs(0);
	console.log(dp);
	return temp;
};

var rob_dp = function(nums) {
	const LEN = nums.length;
	let dp = new Array(LEN).fill(0);
	dp[0] = nums[0];
	dp[1] = nums[1];
	for(let i=2; i<LEN;i++) {
		for(let j=i+2; j<LEN;j++) {
			dp[i] = Math.max(dp[i-2] + nums[i]);
		}
	}

	let temp = dp.reduce((carry, num) => {
		if (num >carry) {
			return num;
		}
		return carry;
	}, 0);

	return temp;
}

console.log(rob([2,1,1,2]));