class DisjointSet {
	constructor() {
		this.parent = new Map;
		this.rank = new Map;
	}

	find(x) {
		if (!this.parent.get(x)) {
			this.parent.set(x, null);
			return x;
		}

		return this.find(this.parent.get(x));
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	union(x, y) {
		let parent_x = this.find(x);
		let parent_y = this.find(y);

		if (parent_x === parent_y) {
			console.log(`x=${x} parent_x=${parent_x} |y=${y} parent_y=${parent_y}`);
			// circle !!!!
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
			this.rank.set(parent_x, ++rank_x);
		}
		return true;
	}
}


/**
 * Disjoint set used in undirected grapgh
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish_UDAG = function(numCourses, prerequisites) {
	const all_course = [];
	const disjoint_set = new DisjointSet();
	prerequisites.forEach(curse => {
		if (disjoint_set.union(curse[0], curse[1])) {
			all_course.push(curse[0]);
			all_course.push(curse[1]);
		} else {
			console.log(disjoint_set);
			console.log('circle!!!!');
		}
	});
};

var canFinish = function(numCourses, prerequisites) {

	let g = new Map;
	prerequisites.forEach(curse => {
		let pre = g.get(curse[0]);
		if (!pre) {
			pre = [curse[1]];
			g.set(curse[0], pre);
		} else {
			pre.push(curse[1]);
			g.set(curse[0], pre);
		}
	});
	console.log(g);

	let recStack = new Array(numCourses).fill(0);
	let visited = new Set;

	/**
	 * @param {number} source
	 */
	const dsf = function(source) {
		if (recStack[source] ) {
			// circle
			console.log('circle!!!!');
			return true;
		}

		recStack[source] = 1;
		console.log(`source=${source} ---> recStack`);
		console.log(recStack);

		if(!visited.has(source)) {
			visited.add(source);
			let adj = g.get(source);
			if (adj) {
				for(let i=0; i<adj.length; i++) {
					if (recStack[adj[i]]) {
						console.log(`source=${source} circle!!!`);
						console.log(recStack);
						return true;
					}
					return dsf(adj[i]);
				}
			}
		}

		return false;
	}

	// for(let i=0; i<numCourses; i++) {
  //   if(dsf(i)) {
  //     return false;
  //   }
	// 	recStack.fill(0);
  // }
	dsf(1);
  return true;
}

console.log(canFinish(4, [[2,0],[1,0],[3,1],[3,2],[1,3]])); // loop case
// console.log(canFinish(2, [[0,1],[1,0]])); // loop case
// console.log(canFinish(5, [[1,4],[2,4],[3,1],[3,2]]));

// console.log(canFinish(8, [[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]]));

// console.log(canFinish(7, [[1,0],[0,3],[0,2],[3,2],[2,5],[4,5],[5,6],[2,4]]));
// console.log(canFinish(6, [[5,5]]));
// console.log(canFinish(3, [[1,0],[1,2],[0,1]])); // loop case
// console.log(canFinish(13, [[1,2],[2,3],[2,10],[3,4],[4,5],[4,11],[5,1]])); // loop case
