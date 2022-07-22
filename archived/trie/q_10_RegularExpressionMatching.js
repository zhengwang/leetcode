function TrieNode(val) {
	this.val = 0;
	this.next = new Array(26);
}

function Trie() {
	this.root = null;
}

/**
 *
 * @param {string} txt
 * @param {string} p
 */
var isMatch_BF = function (txt, p) {
	const LEN = txt.length, LEN_P = p.length;
	let isMatch = true;

	let i=0, j=0;
	for (; i < LEN && j < LEN_P;) {
		if (txt.charAt(i) === p.charAt(j) || txt.charAt(i) === '.') {
			i++;
			j++;
		} else if (p.charAt(j) === '*') {
			if (txt.charAt(i+1) != p.charAt(j)) {
				j++;
			} else {
				i++;
				j++;
			}
		}
	}

	if (i === LEN && j === LEN_P) {
		isMatch = true;
	} else {
		isMatch = false;
	}

	return isMatch;
}

let s = "aa", p="a*";
console.log(isMatch_BF(s, p));