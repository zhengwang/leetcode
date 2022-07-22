function Node(key, val) {
	this.key = key;
	this.val = val;
}

class PriorityQueue {
	constructor() {
		this.queue=[];
		this.heap_size = 0;
	}

	parent(i) {
		return (i-1) >> 1;
	}

	left(i) {
		return (i << 1) + 1;
	}

	right(i) {
		return (i << 1) + 2;
	}

	/**
	 * @param {Node} node
	 */
	insert(node) {
		this.queue.push(node);
		if (this.heap_size === 0) {
			this.heap_size++;
			return;
		}
		this.heap_size++;
		this.increase(this.heap_size-1);
	}

	increase(idx) {
		let parent_idx = this.parent(idx);
		let parent = this.queue[parent_idx];
		let current = this.queue[idx];

		if (parent.val < current.val) {
			this.queue[parent_idx] = current;
			this.queue[idx] = parent;
			this.increase(parent_idx);
		}
	}

	maxHeapify(idx) {
		let left_idx = this.left(idx);
		let right_idx = this.right(idx);
		let left = this.queue[left_idx];
		let right = this.queue[right_idx];
		// let current = this.queue[]
	}

	extract_max() {
		let max = this.queue[0];
		this.queue[0] = this.queue[this.heap_size-1];

	}
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
	nums = nums.sort((a,b) => a-b);
	let hash = nums.reduce((carry, n) => {
		if (!carry[n]) {
			carry[n] = 1;
		} else {
			carry[n]++;
		}
		return carry;
	}, {});

	console.log(hash);
	let temp = Object.entries(hash).sort(([key1, val1], [key2, val2]) => {
		return val2 - val1;
	}).map(arr => arr[0]).slice(0, k);
	console.log(temp);
};

topKFrequent([3,3,1,2,2,2,2,3], 2);