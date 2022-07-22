/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
  const LEN = nums.length;
  let start=0, end=0, flag=false;
  for(let i=0; i<LEN;i++) {
    if (nums[i] > nums[i+1]) {
      start = i;
      flag_start = true;
      break;
    }
  }
  for(let j=LEN-1; j>=0; j--) {
    if (nums[j] < nums[j-1]){
      end=j;
      flag_end = true;
      break;
    }
  }

  console.log(`start=${start}, end=${end}`);
  if (flag_start && flag_end) {
    return end - start + 1;
  }

};

findUnsortedSubarray([1,2,3,4])
