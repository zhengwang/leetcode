/**
 * @param {number[]} nums
 */
const merge = function(nums) {
	/**
	 * @param {number[]} nums
	 * @param {number} lo
	 * @param {number} hi
	 */
	function sort(nums, lo, hi) {
		if (lo >= hi) return; // done
		let mid = lo + Math.floor((hi-lo)/2);
		console.log(`mid=${mid}, lo=${lo} hi=${hi}`);

		sort(nums, lo, mid);
		sort(nums, mid+1, hi);
		merge(nums, lo, mid, hi);
	}

	/**
	 * @param {number[]} nums
	 * @param {number} lo
	 * @param {number} mid
	 * @param {number} hi
	 */
	function merge(nums, lo, mid, hi) {
		let aux = new Array(nums.length);
		// copy from nums to aux
		for(let i=lo; i<=hi; i++) {
			aux[i] = nums[i];
		}

		// merge two sorted array
		let i = lo, j = mid+1;
		for(let k=lo; k<=hi; k++) {
			if(i>mid) {
				// empty left
				nums[k] = aux[j++];
			} else if (j>hi) {
				// empty right
				nums[k] = aux[i++];
			} else if (aux[i] < aux[j]) {
				nums[k] = aux[i++];
			} else {
				nums[k] = aux[j++];
			}
		}
	}

	sort(nums, 0, nums.length-1);
	console.log(nums);
}

const array = "MERGSORT";
merge(array.split(''));