/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
	const res = [];
	const LEN = candidates.length;

	const recurs = function(remains, comb, start) {
		if(remains === 0) {
			res.push(comb);
			return;
		}
		if (remains < 0) {
			return;
		}

		for(let i=start; i<LEN; i++) {
			recurs(remains-candidates[i], [...comb, candidates[i]], i);
		}
	}

	recurs(target, [], 0);
	console.log(res);
}

const arr = [2,3,6,7], target=7
combinationSum(arr, target);