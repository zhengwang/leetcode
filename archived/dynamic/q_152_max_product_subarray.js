/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
	var cross_product = function(lo, hi, mid) {
		// handle negative 'cancel' case
		let prod = 1;
		for(let i=lo; i<=hi; i++) {
			prod *= nums[i];
		}
		if (prod >=0) {
			return [lo, hi, prod];
		}

		prod = 1;
		let left_prod = Number.NEGATIVE_INFINITY, max_left;
		for(let i=mid; i>=0; i--) {
			prod *= nums[i];
			if (prod > left_prod) {
				left_prod = prod;
				max_left = i;
			}
		}

		prod = 1;
		let right_prod = Number.NEGATIVE_INFINITY, max_right;
		for(let i=mid+1; i<=hi; i++) {
			prod *= nums[i];
			if (prod > right_prod) {
				right_prod = prod;
				max_right = i;
			}
		}
		console.log(`lo=${lo} hi=${hi} mid=${mid} left_prod=${left_prod} right_prod=${right_prod}`);
		return [max_left, max_right, left_prod * right_prod];
	}

	var find_max_product = function(lo, hi) {
		if (lo === hi) {
			return [lo, hi, nums[lo]];
		}

		let mid = lo + Math.floor((hi-lo)/2);
		// console.log(`mid=${mid}`);

		let [left_lo, left_hi, left_prod] = find_max_product(lo, mid);
		let [right_lo, right_hi, right_prod] = find_max_product(mid+1, hi);
		let [cross_lo, cross_hi, cross_prod] = cross_product(lo, hi, mid);
		console.log(`lo=${lo} hi=${hi} mid=${mid} left_prod=${left_prod} right_prod=${right_prod} cross_prod=${cross_prod}`);

		let lo_max, hi_max, prod;
		if (left_prod > right_prod && left_prod > cross_prod) {
			lo_max = left_lo;
			hi_max = left_hi;
			prod = left_prod;
		} else if (right_prod > left_prod && right_prod > cross_prod){
			lo_max = right_lo;
			hi_max = right_hi;
			prod = right_prod;
		} else {
			lo_max = cross_lo;
			hi_max = cross_hi;
			prod = cross_prod;
		}

		return [lo_max, hi_max, prod];
	}

	console.log(find_max_product(0, nums.length-1));
};

// let nums = [2,3,-2,4];
// let nums = [3,-1,4];
let nums = [1, -2, -3, 0, 7, -8, -2];
maxProduct(nums);