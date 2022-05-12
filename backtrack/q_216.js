/**
 * @param {number} k
 * @param {number} n
 * @param {number[][]}
 */
var combinationSum3 = function(k, n) {
	const SUM = n;
	const res = [];
	
	const recurs = function(remains, start, combo) {
		if(remains === 0 && combo.reduce((c, n) => c+n, 0) === SUM)  {
			console.log('find solutions!!!');
			res.push(combo);
			return;
		}

		for(let i=start; i<=9; i++) {
			recurs(remains-1, i+1, [...combo, i]);
		}
	}

	recurs(k, 1, []); 
	console.log(res);
}

combinationSum3(3, 9);