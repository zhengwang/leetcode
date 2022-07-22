class KMP {
	constructor(word) {
		const dfa = new Map();
		const LEN = word.length;
		const words = word.split("");
		console.log(LEN);

		// 1. init dfa
		words.forEach((w, idx) => {
			let arr = dfa.get(w);
			if (!arr) {
				arr = new Array(LEN).fill(0);
				if (idx === 0) {
					arr[0] = 1;
				}
				dfa.set(w, arr);
			}
		});


		for (let X = 0, j = 1; j < LEN; j++) {
			let pre;
			dfa.forEach((v, key) => {
				// update mismatch
				v[j] = v[X];
				// update match
				if (key === words[j]) {
					v[j] = j + 1;
					pre = v[X];
				}
			});
			X = pre;
		}

		this.dfa = dfa;
		this.M = LEN;
	}

	search(txt) {
		let d = 0;
		let res = [];
		let txt_arr = txt.split("");
		let s_len = txt_arr.length;
		let flag = false;

		for (let i = 0; i<s_len; i++) {
			let arr = this.dfa.get(txt_arr[i]);
			d = arr ? arr[d] : 0;
			if (d === this.M) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}

/*
const kmp = new KMP("codee");
console.log(kmp);
let res = kmp.search("leetcodeqw");
console.log(res);
*/

/**
 * @param {string} s
 * @param {string} word
 */
function bruteForce(s, word) {
	const arr_s = s.split(""), s_len = s.length;
	const arr_w = word.split(""), word_len = word.length;
	let found = false;

	for(let i=0; i<s_len; i++) {
		for(let j=0; j<word_len; j++) {
			if (arr_s[i+j] !== arr_w[j]) {
				break;
			}
			if (j === word_len-1) { // when j hit the last matched character
				found = true;
			}
		}
		if (found) {
			break;
		}
	}
	return found;
}
// console.log(bruteForce("leetcodeqw", "leet"));

/**
 * @param {string} k
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
	const total_dict_length = wordDict.reduce((carry, word) => {
		return carry += word.length;
	}, 0);

	if (s.length < total_dict_length) {
		return false;
	}

	// Build KMP for each word
	let kmps = [];
	wordDict.forEach(word => {
		let kmp = new KMP(word);
		kmps.push(kmp);
	});

	return res;
}

// console.log(wordBreak("leetcodeqw", ["leet", "codee"]));

/**
 * @param {string} s
 * @param {string[]} wordDict
 */
var wordBreak_BFS = function(s, wordDict) {
	const word_set = new Set(wordDict);
	const q = []; // queue

	q.push(0);
	let LEN = s.length;
	while(q.length) {
		console.log(q);
		let start = q.shift();
		for(let end=start+1; end<LEN+1; end++) {
			let substr = s.substring(start, end);
			console.log(substr);
			if (word_set.has(substr)) {
				// find substring in dict
				// save the word boundary for next substring
				q.push(end);
			}
		}

		if (start === LEN)
			return true;
	}
	return false;
}

console.log(wordBreak_BFS("leetcode", ["leet","code"]));

const wordBreak_dp = (s, wordDict) => {
	const dp = new Array(s.length).fill(false);
	const wordSet = new Set(wordDict);

	for (let i = 0; i < s.length; i++) {
			if (i === 0 || dp[i - 1] === true) {
					wordSet.forEach((word) => {
							if (word === s.substring(i, i + word.length)) {
									dp[i + word.length - 1] = true;
							}
					});
			}
	}
	console.log(dp);
	return dp[dp.length - 1];
}
// console.log(wordBreak_dp("leetcodezzz", ["leet", "code"]));