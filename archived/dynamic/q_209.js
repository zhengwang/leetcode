/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  let largest_sz = nums.length;

  for(let i=0, j=0; j < nums.length; ) {
    if (i===j && nums[i] == target) {
      return 1;
    }

    let temp = nums.slice(i, j+1).reduce((carry, n) => carry + n, 0);
    if (temp < target) {
      j++;
    } else if (temp > target) {
      temp = temp - nums[i];
      i++;
    } else {
      // valid window
      console.log(`i=${i}, j=${j}`);
      if (largest_sz > j-i) {
        largest_sz = j-i+1;
        temp -= nums[i];
        i++;
      }
    }
  }
  console.log(largest_sz);
};

minSubArrayLen(11, [1,2,3,4,5]);
