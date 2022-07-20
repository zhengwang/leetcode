/**
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 * @param {number} val
 */
const upper_bound = (arr, low, high, val) => {
  if (low > high) {
    return arr[low];
  }

  const mid = Math.floor((low + high) / 2);
  if (arr[mid] < val) {
    return upper_bound(arr, mid + 1, high, val);
  } else if (arr[mid] > val) {
    return upper_bound(arr, low, mid - 1, val);
  } else {
    // find the element
    return (mid == high || mid == low) ? 0 : arr[mid + 1];
  }
}


/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function(s, words) {
  let charMap = new Array(26);
  charMap = [...s].reduce((comb, ch, idx) => {
    const charIdx = ch.charCodeAt(0) - 97;
    if (!charMap[charIdx]) {
      charMap[charIdx] = [idx];  
    } else {
      charMap[charIdx].push(idx);
    }
    
    return charMap;
  }, charMap);

  console.log(charMap);

  const N = words.length;
  let rst = N;
  for(let i=0; i<N; i++) {
    const word = words[i];
    const len = word.length;
    let last = -1;

    console.log(`word=${word}`);
    for(let k = 0; k<len; k++) {
      const charIdx = word.charCodeAt(k) - 97;
      const charArr = charMap[charIdx];

      if (charArr === undefined) {
        rst--;
        break;
      }

      console.log(charArr);
      console.log(`last=${last}\t`);
      last = upper_bound(charArr, 0, charArr.length - 1, last);

      if (last == undefined) {
        // not found
        console.log(' -- not found -- \n');
        rst--;
        break;
      }
    }
  }
  return rst;
}

console.log(numMatchingSubseq("abcde", ["a","bb","acd","ace"]));