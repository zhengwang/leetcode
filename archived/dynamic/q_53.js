/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
	const LEN = nums.length;
	// initialize dp array
	const dp = new Array(LEN);
	for(let i=0; i<LEN; i++) {
		dp[i] = new Array(LEN).fill(0);
	}

	// update diagnal
	let largest = Number.NEGATIVE_INFINITY;
	let start, end;
	for(let i=0; i<LEN;i++) {
		dp[i][i] = nums[i];
		console.log(dp[i][i]);
		if (dp[i][i] > largest) {
			console.log('why??')
			largest = dp[i][i];
			start = i;
			end = i;
		}
	}

	console.log(dp);

	for (let sz = 1; sz < LEN; sz++) {
		for(let i=0, j=i+sz; i<LEN && j<LEN; i++, j++) {
			dp[i][j] = dp[i][j-1] + dp[j][j];
			if (largest < dp[i][j]) {
				largest = dp[i][j];
				start = i;
				end = j;
			}
		}
	}
	console.log(dp);
	console.log(nums.slice(start, end+1));
	console.log(largest);
};
maxSubArray([-1]);