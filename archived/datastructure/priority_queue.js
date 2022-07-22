/**
 *
 * @param {number[]} data
 */
function PriorityQueue(data) {
	this.queue = data ? [...data] : [];
	this.heap_size = this.queue.length;
}


/**
 *
 * @param {number} x
 */
PriorityQueue.prototype.Insert = function (val) {
	this.queue.push(val);
	this.decrease(this.queue.length-1, val);
}


/**
 *
 * @returns {number}
 */
PriorityQueue.prototype.Maximum = function () {
	return this.queue[0];
}


/**
 * Removes and returns the element of S with the largest key.
 */
PriorityQueue.prototype.Extract_Max = function () {
	if (!this.queue.length) {
		console.warn("=== === EMPTY QUEUE === ===");
		return null;
	}

	const min_val = this.queue[0],
		temp = this.queue.pop();
	this.queue[0] = temp;
	this.minHeapify(0);
	return min_val;
}


/**
 *
 * @param {number} idx
 * @returns
 */
PriorityQueue.prototype.parent = function (idx) {
	return idx > 0 ? (idx - 1) >> 1 : 0;
}

/**
 *
 * @param {number} idx
 * @returns
 */
PriorityQueue.prototype.left = function (idx) {
	return (idx << 1) + 1;
}


/**
 *
 * @param {number} idx
 * @returns
 */
PriorityQueue.prototype.right = function (idx) {
	return (idx << 1) + 2;
}


/**
 * Top-down heapify
 * @param {number} idx
 */
PriorityQueue.prototype.minHeapify = function (idx) {
	const left_idx = this.left(idx),
		left_val = this.queue[left_idx];

	const right_idx = this.right(idx),
		right_val = this.queue[right_idx];

	let min_idx = idx,
		min_val = this.queue[idx];

	if (min_val > left_val) {
		min_val = left_val;
		min_idx = left_idx;
	}

	if (min_val > right_val) {
		min_val = right_val;
		min_idx = right_idx;
	}

	if (min_idx != idx) {
		let temp = this.queue[idx];
		this.queue[idx] = min_val;
		this.queue[min_idx] = temp;

		this.minHeapify(min_idx);
	}
}

PriorityQueue.prototype.build_heap = function () {
	for (let i = Math.floor(this.queue.length / 2) - 1; i >= 0; i--) {
		this.minHeapify(i);
	}
}


/**
 *
 * @param {number} idx
 * @param {number} val
 */
PriorityQueue.prototype.decrease = function (idx, val) {
	const curr_val = this.queue[idx];
	if (curr_val < val) {
		console.warn("=== STOP :: update value is bigger than current value. ===");
		return;
	}

	this.queue[idx] = val;
	let parent_idx = this.parent(idx);
	while (idx > 0 && this.queue[parent_idx] > this.queue[idx]) {
		// 1. swap value between child node and parent node
		let parent_val = this.queue[parent_idx];
		this.queue[parent_idx] = this.queue[idx];
		this.queue[idx] = parent_val;

		// 2. udpate parent id
		idx = parent_idx;
		parent_idx = this.parent(idx);
	}
}


let queue = new PriorityQueue([5, 13, 2, 25]);
queue.build_heap();
console.log(queue.queue);

let min = queue.Extract_Max();
console.log(`min = ${min}`);
console.log(queue.queue);

queue.Insert(2);
console.warn("=== === AFTER INSERT === ===")
console.log(queue.queue);