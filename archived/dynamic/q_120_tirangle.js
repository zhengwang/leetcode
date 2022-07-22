/**
 * @param {number[][]} triangle
 */
var minimumTriangle = function(triangle) {
	const ROWS = triangle.length;

	function recurs(i, j) {
		
		if (i>=ROWS) {
			return 0;
		}

		let sum = triangle[i][j];
		sum = Math.min(sum + recurs(i+1, j), sum + recurs(i+1,j+1));
		return sum;
	}

	console.log(recurs(0, 0));
}

var minimumTriangle_dp = function(triangle) {
	const ROWS = triangle.length;
	const dp = new Array(triangle[ROWS-1].length).fill(0);
	let last_row = triangle[ROWS-1];

	// copy the last row to dp array
	for(let i=0; i<last_row.length; i++) {
		dp[i] = last_row[i];
	}
	// console.log(dp);

	for(let i=ROWS-2; i>=0; i--) {
		let row = triangle[i];
		for(let j=0; j< row.length; j++) {
			dp[j] = row[j] + Math.min(dp[j], dp[j+1]);
		}
		// console.log(dp);
	}
	// console.log(dp);
	return dp[0];
}

let arr = [[2],[3,4],[6,5,7],[4,1,8,3]]
minimumTriangle(arr);
minimumTriangle_dp(arr);