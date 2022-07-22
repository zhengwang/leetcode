/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const LEN = nums.length;
  const arr = [];
  for(let i=0; i<LEN; i++) {
    let temp=1;

    for(let j=0; j<LEN; j++) {
      if (i !== j) {
        temp *= nums[j];
      }
    }
    arr.push(temp);
  }
  console.log(arr);
  return arr;
};

productExceptSelf([1,2,3,4])
