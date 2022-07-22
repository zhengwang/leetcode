/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
	let counts = new Array(s.length).fill(null);

	function recurs(n) {
		if (counts[n] != null) {
			return counts[n];
		}

		if (n == 0 || n == 1) {
			return 1;
		}
		if (s.charAt(0) == '0') {
			return 0;
		}

		let counter=0;
		if (s.charAt(n-1) > '0') {
			counter += recurs(n-1);
		}
		if (s.charAt(n-2) == '1' || (s.charAt(n-2) == '2' && s.charAt(n-1) < '7') ) {
			counter += recurs(n-2);
		}
		counts[n] = counter;
		return counter;
	}

	const LEN = s.length;
	let counts2 = new Array(s.length).fill(0);
	function recurs2(start) {
		if (start == LEN || start == LEN - 1) {
			return 1;
		}
		if (s.charAt(0) === '0') {
			return 0;
		}

		let counter = 0;
		if (s.charAt(start) > '0') {
			counter += recurs2(start+1);
		}
		if (s.charAt(start) == '1' || (s.charAt(start) == '2' && s.charAt(start+1) < '7') ) {
			counter += recurs2(start + 2);
		}

		return counter;
	}

	console.log(recurs(s.length));
	console.log(counts);
	// console.log(recurs2(0));
};

numDecodings("11106");