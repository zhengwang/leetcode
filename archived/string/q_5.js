/**
 * @param {string} s
 */
function isPalindrome(s) {
	const LEN = s.length;
	for(let i=0, j=LEN-1; j>=i; i++, j--) {
		if (s.charAt(i) !== s.charAt(j)) {
			return false;
		}
	}
	return true;
}

/**
 * @param {string} s
 */
var longestPalindrome_BF = function(s) {
	const LEN = s.length;
	const seen = new Set();

	let longest = "";
	for(let i=0; i<LEN; i++) {
		for(let sz = 1; sz<=LEN; sz++) {
			let str = s.substring(i, i+sz);
			if (seen.has(str)) {
				continue;
			}

			if (isPalindrome(str)) {
				seen.add(str);
				if(str.length > longest.length) {
					longest = str;
				}
			}
		}
	}
	console.log(longest);
	return longest;
}

var longestParlindrome_DP = function(s) {
	const LEN = s.length;

	if(LEN === 1) {
		return s;
	}

	if (LEN === 2 && s.charAt(0) === s.charAt(1)) {
		return s;
	}

	// initialize dp memo
	let dp = new Array(LEN);
	for(let i=0; i<LEN; i++) {
		dp[i] = new Array(LEN).fill(0);
	}

	// initialize single word since 1 word is parlindrome
	for(let i=0; i<LEN; i++) {
		dp[i][i] = 1;
	}

	// calculate 2 words
	let pivot=1, largest=0;
	for(let start=0; start<LEN; start++) {
		if (s.charAt(start) === s.charAt(start+1)) {
			dp[start][start+1] = 1;
			pivot = start;
			largest = 2;
		}
	}

	// calculate 3 or above characters
	for(let sz=3; sz<=LEN; sz++) {
		for(let start=0; start < LEN-sz+1; start++) {
			let end = start+sz-1;
			if (s.charAt(start) === s.charAt(end) &&
				dp[start+1][end-1]) {
				dp[start][end] = 1;
				if (sz>largest) {
					pivot = start;
					largest = sz;
				}
			}
		}
	}
	console.log(dp);
	console.log(`pivot=${pivot} largest=${largest}`);
	console.log(`largest plindrome=${s.substring(pivot, pivot+largest)}`);
	return s.substring(pivot, pivot + largest);
}
longestParlindrome_DP("cbbd");
// console.log(isPalindrome("a"));
// console.log(longestParlindrome_DP("abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababa"));
