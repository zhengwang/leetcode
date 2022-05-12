/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const res = [];
  const LEN = nums.length;

  const recurs = function(combo) {
    console.log(combo);
    if (combo.length === LEN) {
      res.push(combo);
      return;
    }

    for (let i = 0; i < LEN; i++) {
      if (combo.indexOf(nums[i]) < 0) {
        recurs([...combo, nums[i]]);
      }
    }
  }

  recurs([]);
  console.log(res);
};

permute([1]);