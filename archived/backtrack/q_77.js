/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combination = function(n, k) {
  const res = [];
  const recurs = function(n, remains, start, combo) {
    if (remains === 0) {
      console.log(combo);
      res.push(combo);
      return;
    }

    for(let i=start; i<=n; i++) {
      recurs(n, remains-1, i+1, [...combo, i]);
    }
  }

  recurs(n, k, 1, []);
}

combination(4,2);