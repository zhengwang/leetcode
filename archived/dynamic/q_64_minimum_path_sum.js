/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let columns = grid[0].length, rows = grid.length;
  const LEN = columns * rows;
  const dp = new Array(LEN).fill(-1);
  dp[0] = grid[0][0];
  
  /**
   * @param {number} i
   */
  function left(i) {
    return i-1;  
  }
  
  /**
   * @param {number} i
   */
  function top(i) {
    return i - columns;
  }
  
  // initial dp array for 1st row
  for(let i=1; i<columns; i++) {
    dp[i] = dp[i-1] + grid[0][i];
  }
  
  for(let j=1; j < rows; j++) {
    dp[j*columns] = dp[(j-1)*columns] + grid[j][0];
  }
  
  console.log(dp);
  for(let i=1;i<LEN;i++) {
    if (dp[i] < 0) {
      let top_idx = top(i), left_idx = left(i);
      let row_idx = Math.floor(i/columns), col_idx = i%columns;
      dp[i] = Math.min(dp[top_idx], dp[left_idx]) + grid[row_idx][col_idx];
    }
  }
  console.log(dp);
};

const grid = [[1,2,3],[4,5,6]];
minPathSum(grid);