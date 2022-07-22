var printLCS = function(s, b, i, j, path) {
	if (i==0 || j == 0) {
		return path;
	}

	if (b[i][j] === 'n') {
		// console.log(`i=${i}, ${s.charAt(i-1)}`);
		return printLCS(s, b, i-1, j-1, path+s.charAt(j-1));
	} else if (b[i][j] === 's1') {
		return printLCS(s, b, i, j-1, path);
	} else {
		return printLCS(s, b, i-1, j, path);
	}
}

var printLCS2 = function(s, b, i, j) {
	if (i==0 || j == 0) {
		return;
	}

	if (b[i][j] === 'n') {
		s[j-1] = '';
		return printLCS2(s, b, i-1, j-1);
	} else if (b[i][j] === 's1') {
		return printLCS2(s, b, i, j-1);
	} else {
		return printLCS2(s, b, i-1, j);
	}
}

var isInterleave = function(s1, s2, s3) {
	const ROWS = s1.length+1, COLUMNS = s3.length+1;
	let dp = new Array(ROWS), path = new Array(ROWS);
	for(let i=0;i<ROWS;i++) {
		dp[i] = new Array(COLUMNS).fill(0);
		path[i] = new Array(COLUMNS);
	}

	for(let i=1;i<ROWS;i++) {
		let ch = s1.charAt(i-1);
		for(let j=1;j<COLUMNS;j++) {
			if (s3.charAt(j-1) == ch) {
				dp[i][j] = dp[i-1][j-1]+1;
				path[i][j] = 'n';
			} else {
				if (dp[i][j-1] > dp[i-1][j]) {
					dp[i][j] = dp[i][j-1];
					path[i][j] = 's1';
				} else {
					dp[i][j] = dp[i-1][j];
					path[i][j] = 's2';
				}
			}
		}
	}
	console.log(dp);
	console.log(path);

	let temp = s3.split('');
	printLCS2(temp, path, ROWS-1, COLUMNS-1);
	console.log(temp);
}

var isInterleave2 = function(s1, s2, s3) {
	const LEN1 = s1.length;
	const LEN2 = s2.length;

	function recurs(pos1, pos2, res) {
		if (res === s3 && pos1 === LEN1 && pos2 === LEN2) {
			return true;
		}

		let ans = false;
		if(pos1 < LEN1) {
			ans |= recurs(pos1+1, pos2, `${res}${s1.charAt(pos1)}`);
		}
		if(pos2 < LEN2) {
			ans |= recurs(pos1, pos2+1, `${res}${s2.charAt(pos2)}`);
		}

		return ans;
	}

	console.log(recurs(0, 0, ''));
}

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave3 = function(s1, s2, s3) {
	const LEN1 = s1.length;
	const LEN2 = s2.length;
	const LEN3 = s3.length;
	if (LEN1 + LEN2 > LEN3) {
		return false;
	}

	let memo = new Array(LEN1);
	for(let i=0;i<LEN1;i++) {
		memo[i] = new Array(LEN2).fill(-1);
	}

	/**
	 * @param {number} i pointer to s1
	 * @param {number} j pointer to s2
	 * @param {number} k pointer to s3
	 */
	const recurs = function(i, j, k) {
		if (i == LEN1) {
			return s2.substring(j) === s3.substring(k);
		}

		if (j == LEN2) {
			return s1.substring(i) === s3.substring(k);
		}

		if (memo[i][j] >=0) {
			return memo[i][j] == 1? true : false;
		}

		let ans = false;
		if (s1.charAt(i) === s3.charAt(k) && recurs(i+1, j, k+1) || 
			s2.charAt(j) === s3.charAt(k) && recurs(i, j+1, k+1)) {
			ans = true;
		}

		memo[i][j] = ans ? 1 : 0;
		return ans;
	}

	return recurs(0, 0, 0);
}

let s1 = "bbbcc", s2="bbaccbbbabcacc", s3="bbbbacbcccbcbabbacc";
console.log(isInterleave3(s1, s2, s3));