/**
 * @param {string} s
 * @param {number} lo
 * @param {number} hi
 * @return {boolean}
 */
var isPalindrome = (s, lo, hi) => {
	while(lo <= hi) {
		if (s.charAt(lo++) != s.charAt(hi--)) {
			return false;
		}
	}
	return true;
}

/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function(s) {
	let res = [], dp = [];
	const LEN = s.length;
	for(let i=0;i<LEN;i++) {
		dp[i] = new Array(LEN);
	}

	/**
	 * @param {number} start
	 * @param {array} combo
	 */
	function recurs(start, combo) {
		if (start >= LEN) {
			res.push(combo);
			return;
		}

		for (let i = start; i < LEN; i++) {
			// if (isPalindrome(s, start, i)) {
			if (s.charAt(i) == s.charAt(start) && ((i-start) <= 2 || dp[start+1][i-1])) {				
				dp[start][i] = 1;
				recurs(i+1, [...combo, s.substring(start, i+1)]);	
			}
		}
	}

	recurs(0, []);
	return res;
}

let s = "ababa";
console.log(removePalindromeSub(s));