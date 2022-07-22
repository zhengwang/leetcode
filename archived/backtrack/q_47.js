/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  let res = [];
  const LEN = nums.length;
  let hash = new Map;

  for(let i=0; i<LEN; i++) {
    let adj = hash.get(nums[i]);
    if (!adj) {
      hash.set(nums[i], 1);
    } else {
      let temp = hash.get(nums[i]);
      hash.set(nums[i], ++temp);
    }
  }

  console.log(hash);

  var recur = function(comb) {
    if (comb.length === LEN) {
      res.push(comb);
      // console.log(comb);
      return;
    }

    hash.forEach((val, key) => {
      // console.log(`key=${key}, val=${val}`);
      if (val > 0) {
        hash.set(key, --val);

        recur([...comb, key]);
        hash.set(key, ++val);
      }
    });

  }
  nums.sort((a,b) => a-b);
  recur([]);
  console.log(res);
};

permuteUnique([1,1,2]);
