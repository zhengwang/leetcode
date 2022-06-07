/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const LEN = nums.length;
  const dp = new Array(LEN);

  let in1ex = 0; //
  let ex1ex = 0; // exclude nums[0]
  
  for(let i=1;i<LEN;i++) {
    let tempin = nums[i] + ex1ex; // rob 
    let tempex = Math.max(in1ex, ex1ex); // no rob
    
    in1ex = tempin;
    ex1ex = tempex;
  }
  
  let ans1 = Math.max(in1ex, ex1ex);
  
  let in1in = nums[0];
  let ex1in = nums[0];
  for(let i=2;i<LEN-1;i++) {
    let tempin = nums[i] + ex1in;
    let tempex = Math.max(in1in, ex1in);
    in1in = tempin;
    ex1in = tempex;
  }
  let ans2 = Math.max(in1in, ex1in);
  
  return Math.max(ans1, ans2);
};

let nums = [2,1,1,2];
// let nums = [1,2,3];
console.log(rob(nums));