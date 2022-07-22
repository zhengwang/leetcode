/**
 * @param {number[]} nums
 * @param {number} start
 */
function helper(nums, pivot, chances) {
  if (chances == 1) {
    return 0;
  }

  let steps = nums[pivot], min=Number.MAX_VALUE;
  for(let i=1; i <= steps; i++) {
    let res = helper(nums, pivot + i, chances - steps);
    min = Math.min(res+1, min);
  }
  return min;
}

/**
 * @param {number[]} nums
 */
var jump = function(nums) {
  const LEN = nums.length;
  let res;

  res = helper(nums, 0, LEN);
  console.log(res);
}

//jump([0]);

/**
 * move last idx from back to front
 */
function greedyJump(nums, n) {
  if (n === 1) {
    return 0;
  }

  // start from the last 2nd one, make it as new target
  let min = Number.MAX_VALUE;
  for(let i=n-2; i>=0; i--) {
    const target = i + nums[i];
    if (target >= n-1) {
      // after jump, we can move to next target
      let res = greedyJump(nums, i+1);
      if (res !== Number.MAX_VALUE) {
        min = Math.min(res+1, min);
      }
    }
  }
  return min;
}

/**
 * find minimum jump using dynamic programming
 */
function dynamicJump(nums) {
  let n = nums.length;

  const dp = new Array(n).fill(0);

  if (n == 0 || nums[0] == 0) {
    return Number.MAX_VALUE; // cannot reach the end
  }

  for(let i=1; i<n; i++) {
    dp[i] = Number.MAX_VALUE;
    for(let j=0; j<i; j++) {
      if (j+nums[j] >= i && dp[j] !== Number.MAX_VALUE) {
        dp[i] = Math.min(dp[j]+1, dp[i]);
        break;
      }
    }
  }
  console.log(dp);
  return dp[n-1];
}

/**
 * @param {number[]} nums
 */
function canJum(nums) {
  let LEN = nums.length;
  // return greedyJump(nums, LEN);
  return dynamicJump(nums);
}
console.log(canJum([2,3,1,1,4]));
