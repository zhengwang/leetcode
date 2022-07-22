/**
 * @param {string} s
 */
function isPalindrome(s) {
	let LEN = s.length;

	for(let i=0, j=LEN-1; j>i; i++, j--) {
		if (s.charAt(i) !== s.charAt(j)) {
			return false;
		}
	}
	return true;
}

function reverseString(s) {
	let LEN = s.length;
	let output = '';
	for(let i=LEN-1; i>=0; i--) {
		output += s.charAt(i);
	}
	return output;
}

/**
 * reverse the string and compare it with the origin one
 * @param {string} s
 */
var shortestPalindrome_bf = function(s) {
	let LEN = s.length, boundary=0;
	let rev_s = reverseString(s);
	for(let i=0; i < LEN; i++) {
		if (s.substring(0, LEN-i) === rev_s.substring(i)){
			// found largest palindrome
			return rev_s.substring(0, i) + s;
		}
	}
	return s;
};

// console.log(isPalindrome("aac"));
// console.log(reverseString("abc"));
// console.log(shortestPalindrome_bf("abc"));

var shortestPalindrome_kmp = function(s) {
	// learn kmp lps pattern
	let rev_s = reverseString(s);
	let s_rev = s + rev_s;
	let N = s.length;
	let M = s_rev.length;

	let lps = new Array(M).fill(0);
	for(let i=1; i<M; i++) {
		let t=lps[i-1];
		while(t>0 && s_rev.charAt(i) !== s_rev.charAt(t)) {
			t= lps[t-1];
		}
		if (s_rev.charAt(i) === s_rev.charAt(t)) {
			t++;
		}
		lps[i] = t;
	}
	console.log(lps);
	// the last element value is the number of repeat prefix in reverse string
	// which should be deleted
	let num = lps[lps.length-1];

	return rev_s.substring(0,N-num) + s;
}
console.log(shortestPalindrome_kmp("aabba"));
