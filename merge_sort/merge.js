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
		let mid = lo + Math.floor((hi - lo) / 2);

		sort(nums, lo, mid);
		sort(nums, mid + 1, hi);
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
		for (let i = lo; i <= hi; i++) {
			aux[i] = nums[i];
		}

		// merge two sorted array
		let i = lo,
			j = mid + 1;
		for (let k = lo; k <= hi; k++) {
			if (i > mid) {
				// empty left
				nums[k] = aux[j++];
			} else if (j > hi) {
				// empty right
				nums[k] = aux[i++];
			} else if (aux[i] < aux[j]) {
				nums[k] = aux[i++];
			} else {
				nums[k] = aux[j++];
			}
		}
	}

	sort(nums, 0, nums.length - 1);
	console.log(nums);
}

/**
 * @param {number[]} nums
 */
const MergeBU = function(nums) {
	/**
	 * @param {number[]} nums
	 * @param {number} lo
	 * @param {number} mid
	 * @param {number} hi
	 */
	const merge = (nums, lo, mid, hi) => {
		const aux = new Array(nums.length);
		// copy nums to aux in [lo, hi]
		nums.forEach((n, idx) => {
			if (idx >= lo && idx <= hi) {
				aux[idx] = nums[idx];
			}
		});

		let i = lo,
			j = mid + 1;
		for (let k = lo; k <= hi; k++) {
			if (j > hi) {
				// no right
				nums[k] = aux[i++];
			} else if (i > mid) {
				// no left
				nums[k] = aux[j++];
			} else if (aux[i] < aux[j]) {
				nums[k] = aux[i++];
			} else {
				nums[k] = aux[j++];
			}
		}
	};

	const sort = (nums) => {
		let N = nums.length;
		for (let sz = 1; sz < N; sz += sz) {
			for (let lo = 0; lo < N - sz; lo += sz + sz) {
				merge(nums, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1));
			}
		}
	}

	sort(nums);
	console.log(nums);
}

const array = "MERGSORT";
merge(array.split(''));
MergeBU(array.split(''));