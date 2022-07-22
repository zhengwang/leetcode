/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let seen = new Set();
  let maxLength = 0;
  let start=0, end=0, LEN = s.length;
  
  while(start <= end && end < LEN ) {
    let ch = s.charAt(end);
    if(!seen.has(ch)) {
      seen.add(s.charAt(end));
      maxLength = Math.max(end - start+1, maxLength);
      end++;
    } else {
      seen.delete(s.charAt(start++));
    }
  }
  return maxLength;
};

const temp = lengthOfLongestSubstring("pwwkew");
console.log(temp);