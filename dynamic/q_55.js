function getNeighbor(idx, maxStep) {
  let arr = [];
  for(let i=idx; i<=idx+maxStep; i++) {
    arr.push(i);
  }
  return arr;
}
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  const LEN = nums.length;

  var dfs = (start) => {
    let visited = new Set;
    let q = [start];

    while(q.length) {
      let v = q.pop();
      console.log(`v=${v}`);
      if (v >= LEN-1) {
        return true;
      }
      if (!visited.has(v)) {
        visited.add(v);
        let adjacents = getNeighbor(v, nums[v]);
        console.log(adjacents);
        q = q.concat(adjacents);
      }
    }
    return false;
  }

  return dfs(0);
};

console.log(canJump([2,0,0]));