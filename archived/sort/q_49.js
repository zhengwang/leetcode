function compressWord(word) {
	let res = "";
	const LEN = word.length;
	const dict = new Array(26).fill(0);

	for(let i=0; i<LEN; i++) {
		dict[word.charCodeAt(i)-97]++;
	}

	let key = dict.reduce((c, num, idx) => {
		let ch = String.fromCharCode(idx+97);
		if (num > 0) {
			c += `${num}${ch}#`;
		}
		return c;
	}, "");

	return key;
}

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
	const hash = new Map;
	strs.forEach(str => {
		let key = compressWord(str);
		if (!hash.has(key)) {
			let temp = [str];
			hash.set(key, temp);
		} else {
			let temp = hash.get(key);
			temp.push(str);
			hash.set(key, temp);
		}
	});
	console.log(hash);
	return Array.from(hash.values());
};

console.log(groupAnagrams(["ddddddddddg","dgggggggggg"]));