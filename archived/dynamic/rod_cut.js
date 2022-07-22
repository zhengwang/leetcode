/**
 * @param {number} n
 * @param {number[]} profit
 */
function rod_cut(n, profit) {
  let dp = new Array(n).fill(0);
  let hash = new Map;
  const cut = (n, combo) => {
    if (n <= 0) {
      return [0, [...combo]];
    }

    let largest = 0, largest_combo;
    for(let i=1;i<=n;i++) {
      let temp = cut(n-i, [...combo, i]);
      if (temp[0] + profit[i-1] > largest) {
        largset = temp[0] + profit[i-1];
        largest_combo = temp[1]
      }
    }

    return [largest, largest_combo];
  };

  console.log(cut(n, []));
}

rod_cut(4, [1,5,8,9,10,17,17,20,24,30]);