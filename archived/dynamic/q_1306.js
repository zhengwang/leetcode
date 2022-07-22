/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
  let visited = new Set();
  let stack = [];
  stack.push(start);

  while(stack.length) {
    let v = stack.shift();
    if (arr[v] === 0) {
      // found!!
      return true;
    }
    if (!visited.has(v)) {
      visited.add(v);
      let left = v - arr[v];
      let right = v + arr[v];
      if (left >= 0) {
        stack.push(left);
      }
      if (right < arr.length) {
        stack.push(right);
      }
    }
    console.log("stack status");
    console.log(stack);
  }

  return false;
}

let arr = [4,4,1,3,0,3], start = 2;
console.log(canReach(arr, start));
