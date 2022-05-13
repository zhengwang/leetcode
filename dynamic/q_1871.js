/**
 * @param {number} idx
 * @param {number} minJump
 * @param {number} maxJump
 * @param {number} s_len
 */
function generateNeighbor(idx, minJump, maxJump, s) {
  let res = [];
  let upper_bd = Math.min(idx + maxJump, s.length - 1);
  for(let i=idx + minJump; i <= upper_bd; i++) {
    if (s.charAt(idx) === '0') {
      res.push(i);
    }
  }
  return res;
}

var canReach = function(s, minJump, maxJump) {
  const visited = new Set;
  let queue = [];
  const LEN = s.length;
  queue.push(0);

  while(queue.length) {
    let v = queue.pop();
    if (v === LEN-1) {
      return true;
    }
    if (!visited.has(v)) {
      visited.add(v);
      let neighbor = generateNeighbor(v, minJump, maxJump, s);
      queue = queue.concat(neighbor);
    }
  }

  return false;
}

var canReach_dfs = function(s, minJump, maxJump) {
  const LEN = s.length-1;

  function generateNeighbor(idx) {
    let res = [];
    let upper_bd = Math.min(idx + maxJump, s.length - 1);
    for(let i=idx + minJump; i <= upper_bd; i++) {
      if (s.charAt(i) === '0') {
        res.push(i);
      }
    }
    return res;
  }

  function dfs(idx, visited) {
    console.log(`idx=${idx}, LEN=${LEN}`);
    if (idx === LEN) {
      return true;
    }

    if (!visited.has(idx)) {
      visited.add(idx);
      const neighbors = generateNeighbor(idx);
      console.log(neighbors);
      const total_neighbors = neighbors.length;
      for(let i=0; i<total_neighbors; i++) {
        if (dfs(neighbors[i], visited)) {
          return true;
        }
      }
    }
    return false;
  }

  let visited = new Set;

  return dfs(0, visited);
}

console.log(canReach_dfs("011010", 2,3));
