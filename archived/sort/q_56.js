function mergeTwo(arr1, arr2) {
	if (arr1[1] < arr2[0]) {
		// discountinue range, no merge
		return [arr1, arr2];
	}
	return [[arr1[0], Math.max(arr2[1], arr1[1])]];
}

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
	let arr = intervals.sort((a1, a2) => a1[0]-a2[0]);
	let stack = [arr[0]];
	for(let i=1; i < arr.length; i++) {
		let last = stack.pop();
		let res = mergeTwo(last, arr[i]);
		stack = stack.concat(res);
	}

	console.log(stack);
	return stack;
};

console.log(merge([[2,6],[1,3],[15,18],[8,10]]));
// console.log(mergeTwo([1,3], [4,6]));