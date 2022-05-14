function Manhattan(point1, point2) {
	return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

class DisjoinSet {
	constructor() {
		this.parent = new Map;
		this.rank = new Map;
	}

	// find the present of x
	find(x) {
		if (!this.parent.get(x)) {
			this.parent.set(x, null);
			return x;
		}
		return this.find(this.parent.get(x));
	}

	union(x, y) {
		let parent_x = this.find(x);
		let parent_y = this.find(y);
		

		if (parent_x === parent_y) {
			// cirle no need union
			console.log(`parent_x=${parent_x}, x=${x} | parent_y=${parent_y}, y=${y}`);
			console.log('find circle');
			return false;
		}

		let rank_x = this.rank.get(x);
		let rank_y = this.rank.get(y);
		if (!rank_x) {
			this.rank.set(x, 0);
		}
		if (!rank_y) {
			this.rank.set(y, 0);
		}

		if (rank_x > rank_y) {
			this.parent.set(parent_y, parent_x);
		} else if (rank_x < rank_y) {
			this.parent.set(parent_x, parent_y);
		} else {
			this.parent.set(parent_y, parent_x);
			let temp = this.rank.get(x);
			this.rank.set(x, ++temp);
		}

		return true;
	}

	/**
	 * @param {number[]} edge
	 */
	make_set(edge) {
		if (!this.parent.get(edge[0])) {
			this.parent.set(edge[0], null);
		}
		if (!this.parent.get(edge[1])) {
			this.parent.set(edge[1], null);
		}

		// always union destination to source
		this.parent.set(edge[1], edge[0]);
	}
}

function Edge(v, weight) {
	this.v = v;
	this.w = weight;
}
var buildGraph = (edges) => {
	const g = new Map;

	edges.forEach(edge => {
		let adj = g.get(edge[0]);
		if (!adj) {
			adj = [new Edge(edge[1], edge[2])];
		} else {
			adj.push(new Edge(edge[1], edge[2]));
		}
		g.set(edge[0], adj);
		
		adj = g.get(edge[1]);
		if (!adj) {
			adj = [new Edge(edge[0], edge[2])];
		} else {
			adj.push(new Edge(edge[0], edge[2]));
		}
		g.set(edge[1], adj);
	});
	console.log(g);
	return g;
}

/**
 * Example on 'Introduction to Algorithm' - chapter 23
 */
var kruskal = () => {
 	// 14 edges
	const edges = [["a","b", 4], ["a", "h", 8], 
									["b", "c", 8], ["b", "h", 11],
									["c", "d", 7], ["c", "f", 4], ["c", "i", 2],
									["d", "e", 9], ["d", "f", 14],
									["e", "f", 10],
									["f", "g", 2],
									["g", "i", 6], ["g", "h", 1],
									["h", "i", 7]];
	edges.sort((arr1, arr2) => arr1[2] - arr2[2]);
	//console.log(edges);
	
	const ds = new DisjoinSet();
	const mst = [];
	edges.forEach(edge => {
		if (ds.union(edge[0], edge[1])) {
			mst.push(edge);
		}
	});
	console.log(ds);
	console.log(mst);
}

kruskal();