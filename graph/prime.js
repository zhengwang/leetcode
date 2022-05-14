function Pair(end, w) {
	this.end = end;
	this.weight = w; // weight
}

function buildGraph(edges) {
	let g = new Map();
	edges.forEach(edge => {
		let adj = g.get(edge[0]);
		if (!adj) {
			adj = [new Pair(edge[1], edge[2])];
		} else {
			adj.push(new Pair(edge[1], edge[2]));
		}
		g.set(edge[0], adj);

		adj = g.get(edge[1]);
		if (!adj) {
			adj = [new Pair(edge[0], edge[2])];
		} else {
			adj.push(new Pair(edge[0], edge[2]));
		}
		g.set(edge[1], adj);
	});
	return g;
}

function Node(label, weight, parent) {
	this.label = label;
	this.weight = weight;
	this.parent = parent;
}

class PriorityQueue {
	constructor() {
		this.queue = [];
		this.heap_size = 0;
	}

	parent(i) {
		return (i - 1) >> 1;
	}

	left(i) {
		return (i << 1) + 1;
	}

	right(i) {
		return (i << 1) + 2;
	}

	insert(node) {
		// console.log(node);
		this.queue.push(node);
		if (this.heap_size === 0) {
			this.heap_size++;
			return;
		}

		this.heap_size++;
		this.decrease(this.heap_size - 1);
	}

	decrease(idx) {
		if (idx === 0) {
			return;
		}
		let current = this.queue[idx];
		let parent = this.parent(idx);

		let parent_node = this.queue[parent];

		if (current.weight < parent_node.weight) {
			this.queue[idx] = parent_node;
			this.queue[parent] = current;
			this.decrease(parent);
		}
	}

	minHeapify(idx) {
		// console.log(idx);
		let left_idx = this.left(idx);
		let right_idx = this.right(idx);
		let left = this.queue[left_idx];
		let right = this.queue[right_idx];
		let current = this.queue[idx];

		let smallest_idx = idx,
			smallest = current;

		if (left && smallest.weight > left.weight) {
			smallest = left;
			smallest_idx = left_idx;
		}
		if (right && smallest.weight > right.weight) {
			smallest = right;
			smallest_idx = right_idx;
		}
		if (smallest_idx !== idx) {
			this.queue[smallest_idx] = current;
			this.queue[idx] = smallest;
			this.minHeapify(smallest_idx);
		}
	}

	extract_min() {
		if (this.heap_size === 0) {
			return null;
		}
		let min_node = this.queue[0];
		this.queue[0] = this.queue[this.heap_size - 1];
		this.queue.pop(); // <--- should remove the last element
		this.heap_size--;
		if (this.heap_size > 0) {
			this.minHeapify(0);
		} else {
			this.queue = [];
		}

		return min_node;
	}
}

/**
 * Example from "Introduction to Algorithm" - chapter 23
 */
const Prime = () => {
	const edges = [
		["a", "b", 4],
		["a", "h", 8],
		["b", "c", 8],
		["b", "h", 11],
		["c", "d", 7],
		["c", "f", 4],
		["c", "i", 2],
		["d", "e", 9],
		["d", "f", 14],
		["e", "f", 10],
		["f", "g", 2],
		["g", "i", 6],
		["g", "h", 1],
		["h", "i", 7]
	];
	const g = buildGraph(edges);

	let source = "a";
	let path = [];
	let queue = new PriorityQueue();
	let visited = new Set(); // save all vertex in MST
	queue.insert(new Pair(source, 0));

	while(queue.heap_size > 0) {
		let node = queue.extract_min();

		if (!visited.has(node.end)) {
			path.push(node);
			visited.add(node.end);

			g.get(node.end).forEach(adj => {
				queue.insert(adj);
			});
		}
	}

	console.log(path);
}

Prime();
