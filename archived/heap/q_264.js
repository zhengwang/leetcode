class PriorityQueue {
	constructor() {
		this.queue = [1];
		this.heap_size = 1;
	}

	/**
	 * @param {number} i
	 */
	parent(i) {
		return (i-1) >> 1;
	}

	/**
	 * @param {number} i
	 */
	left(i) {
		return (i+1) << 1;
	}

	/**
	 * @param {number} i
	 */
	right(i) {
		return (i+2) << 1;
	}

	/**
	 * @param {number} idx
	 * @param {number} key
	 */
	increase(idx, key) {
		let parent_idx = this.parent(idx);
		let parent = this.queue[parent_idx];
		if (parent < key) {
			// swap 
			this.queue[parent_idx] = key;
			this.queue[idx] = parent;
			this.increase(parent_idx, key);
		}
	}

	/**
	 * @param {number} key
	 */
	insert(key) {
		this.queue.push(key);
		if (this.heap_size === 0) {
			this.heap_size++;
			return;
		}
		this.heap_size++;
		this.increase(this.heap_size, key);
	}

	max() {
		return this.queue[0];
	}
}

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
	let series = [1];
	let i2=0, i3=0, i5=0;
	let next_ugly_no;

	for(let i=1; i<n; i++) {
		let i2_urly_no = 2 * series[i2];
		let i3_urly_no = 3 * series[i3];
		let i5_urly_no = 5 * series[i5];

		next_ugly_no = Math.min(i2_urly_no, i3_urly_no, i5_urly_no);
		series.push(next_ugly_no);
		if (next_ugly_no === i2_urly_no) {
			i2++;
		}
		if (next_ugly_no === i3_urly_no) {
			i3++;
		}
		if (next_ugly_no === i5_urly_no) {
			i5++;
		}
	}
	
	console.log(series);
};
nthUglyNumber(8);
