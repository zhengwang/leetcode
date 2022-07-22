/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
	const hash = new Map;
	const LEN = candidates.length;
	candidates.sort((a,b) => a-b);
	
	candidates.forEach(num => {
		let n = hash.get(num);
		if (n==undefined) {
			hash.set(num, 1);
		} else {
			hash.set(num, ++n);
		}
	});
	console.log(hash);

	let ans = [];
	const recurs = function(remain, combo) {
		if (remain === 0) {
			ans.push(combo);
			return;
		}
		
		if (remain < 0) {
			return;
		}
		
		for(let i=0;i<LEN;i++) {
			let candid = candidates[i];
			let temp = hash.get(candid);
			if(temp > 0) {
				temp--;
				hash.set(candid, temp);
				recurs(remain-candidates[i], [...combo, candidates[i]]);
				temp++;
				hash.set(candid, temp);
			}
		}
	}
	recurs(target, []);
	console.log(ans);
};
combinationSum2([10,1,2,7,6,1,5], 8);