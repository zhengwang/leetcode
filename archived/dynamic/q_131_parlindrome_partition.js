/**
 * @param {string} str
 * @param {number} lo
 * @param {number} hi
 * @return {boolean}
 */
function isParlindrome(str, lo, hi) {
	while (lo <= hi) {
		if (str.charAt(lo++) != str.charAt(hi--)) {
			return false;
		}
	}
	return true;
}

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
	const LEN = s.length;
	const res = [];
	const dp = new Array(LEN);
	for (let i = 0; i < LEN; i++) {
		dp[i] = new Array(LEN).fill(0);
	}

	/**
	 * @param {number} start
	 * @param {array} combo
	 */
	function dfs(start, combo = []) {
		if (start >= LEN) {
			res.push(combo);
		}

		for (let i = start; i < LEN; i++) {
			// if (isParlindrome(s, start, i)) {
			if (s.charAt(i) === s.charAt(start) && (i - start <= 2 || dp[start + 1][i - 1])) {
				dp[start][i] = 1;
				dfs(i + 1, [...combo, s.substring(start, i + 1)]);
		}
	}
}

dfs(0, []);
return res;
}

// console.log(isParlindrome("aab", 0, 1));
console.log(partition("aab"));