/**
 * @param {string} word
 * @param {number} end
 */
function Word(word, start, end) {
	this.word = word;
	this.start = start;
	this.end = end;
}

/**
 * @param {Word} word
 * @param {Word[]} wordList
 */
function buildSentences(wordList) {

	const helper = (word, wordList) => {
		let arr = wordList.filter(w => w.start === word.end+1);
		if (arr.length === 0) return [word];

		let sentences = [];

		// recursive call helper for next word
		arr.forEach(w => {
			let res = helper(w, wordList);
			console.log(res);
			sentences.push([w, res]);
		});
		return sentences;
	};

	const roots = wordList.filter(w => w.start === 0);
	roots.forEach(r => {
		console.log(`root-${r.word}`);
		let arr = helper(r, wordList);

	});
}

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
	let visited = new Set,
		word_set = new Set(wordDict);
	let LEN = s.length;
	let q = [],
		res = []; // res use to save all word breaks

	q.push(0);
	while (q.length) {
		let start = q.shift();

		if (visited.has(start)) {
			continue;
		}

		let cache = [];
		for (let end = start + 1; end < LEN; end++) {
			let substr = s.substring(start, end+1);
			if (word_set.has(substr)) {
				cache.push(new Word(substr, start, end));
				q.push(end+1);
				visited.add(start);
			}
		}

		res = res.concat(cache);
	}

	console.log(res);
	buildSentences(res);
}

wordBreak("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"]);