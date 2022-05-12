/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermuation = function(nums) {
  let candidates = nums.slice(1).filter(n=>n>=nums[0]);
  console.log(candidates);
}

nums = [1,2,3];
nextPermuation(nums);