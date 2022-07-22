/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
	let rows = obstacleGrid.length;
	let columns = obstacleGrid[0].length;

	console.log(`row=${rows}, columns=${columns}`);
	
	let dp = new Array(rows);
	for(let i=0; i<rows; i++) {
		dp[i] = new Array(columns).fill(0);
	}
	if (obstacleGrid[0][0] !== 1) {
		dp[0][0]=1;
	}

	for(let i=1; i<columns; i++) {
		if (obstacleGrid[0][i] !== 1 && dp[0][i-1] !== 0) {
			dp[0][i]=1;
		}
	}

	for(let i=1; i<rows; i++) {
		if(obstacleGrid[i][0] !== 1 && dp[i-1][0] !== 0) {
			dp[i][0]=1;
		}
	}

	for(let i=1; i<rows;i++) {
		for(let j=1; j<columns; j++) {
			if (obstacleGrid[i][j] !== 1) {
				dp[i][j] = dp[i][j-1] + dp[i-1][j];
			}
		}
	}
	console.log(dp);
	return dp[rows-1][columns-1];
};

// let map = [[0,0],[1,1],[0,0]];
let map = [[1]];
console.log(uniquePathsWithObstacles(map));