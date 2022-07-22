/**
 * Longest common subsequence in 'Introduction to Algorithms'
 */
/**
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 */
function LCS_BF(str1, str2) {
	const LEN1 = str1.length;
	const LEN2 = str2.length;
	let ans = [];

	function recurs(i, j, combs) {
		if (i >= LEN1 || j >= LEN2) {
				ans.push(combs);
				return 0; // case 1
		}

		let length = 0;
		if (str1.charAt(i) == str2.charAt(j)) {
				length = 1 + recurs(i + 1, j + 1, [...combs, str1.charAt(i)]); // case 2
		} else {
				length = Math.max(recurs(i + 1, j, combs),
						recurs(i, j + 1, combs)); // case 3
		}
		return length;
	}


	let temp = recurs(0, 0, []);
	console.log(ans);
	return temp;
}

/**
 * @param {number[][]} b
 * @param {string} str1
 * @param {number} i
 * @param {number} j
 */
function print_lcs(b, str1, i, j, path){
	if (i == 0 || j == 0) {
		console.log(path);
		return;
	}

	if(b[i][j] === '1') {
		print_lcs(b, str1, i-1, j-1, `${str1.charAt(i-1)}${path}`);
	} else if (b[i][j] === '2') {
		print_lcs(b, str1, i-1, j, path);
	} else {
		print_lcs(b, str1, i, j-1, path);
	}
}

/**
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 */
function LCS(str1, str2) {
	let ROWS = str1.length+1, COLUMNS = str2.length+1;
	const dp = new Array(ROWS);
	const d = new Array(ROWS);

	for(let i=0;i<ROWS;i++) {
		dp[i] = new Array(COLUMNS).fill(0);
		d[i] = new Array(COLUMNS).fill(0);
	}

	for(let i=1;i<ROWS;i++) {
		let ch = str1.charAt(i-1);
		for(let j=1;j<COLUMNS;j++) {
			if (ch === str2.charAt(j-1)) {
				// case 1
				dp[i][j] = 1 + dp[i-1][j-1];
				d[i][j] = '1';
			} else {
				// case 2
				if (dp[i][j-1] > dp[i-1][j]) {
					dp[i][j] = dp[i][j-1];
					d[i][j] = '0';
				} else {
					dp[i][j] = dp[i-1][j];
					d[i][j] = '2';
				}
			}
		}
	}
	console.log(dp);

	let path = '';
	print_lcs(d, str1, ROWS-1, COLUMNS-1, path);
}

let str2 = "BDCABA",
		str1 = "ABCBDAB";
console.log(LCS(str1, str2));