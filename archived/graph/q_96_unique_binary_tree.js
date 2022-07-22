function Node(val, left, right) {
	this.val = val ?? undefined;
	this.left = left ?? undefined;
	this.right = right ?? undefined;
}
/**
 * @param {number[]} arr
 */
function printPath(arr) {
	let root = new Node(arr[0]);
	const LEN = arr.length;
	let path = "";
	console.log(`print path`);
	console.log(arr);

	function insert(node, val, level) {
		if (!node) {
			return new Node(val);
		}

		level++;

		if (val < node.val) {
			path += `L${level}`;
			node.left = insert(node.left, val, level);

		} else {
			path += `R${level}`;
			node.right = insert(node.right, val, level);

		}
		return node;
	}

	for(let i=1;i<LEN;i++) {
		// console.log(`-----i=${i}-----`);
		insert(root, arr[i], 0);
	}
	console.log(path);
}

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
	const hash = new Array(n).fill(1);
	const ans = [];

	var recur = function(comb) {
		if (comb.length === n) {
			let path = printPath(comb);

			ans.push(path);
			return;
		}

		for(let i=0; i<hash.length;i++) {
			if (hash[i]>0) {
				hash[i]--;

				recur([...comb, i]); // insert i into tree
				hash[i]++;
			}
		}
	}

	recur([]);
	console.log(ans);
};

var numTrees_dp = function(n) {
	const dp = new Array(n).fill(1);

	// base case:
	// one zero node: 1 tree
	for(let i=2; i<=n; i++) {
		let total_tree = 0;
		for(let j=0;j<i;j++) {
			// root at j
			let left_tree = dp[j];
			let right_tree = dp[i-j-1];
			total_tree += left_tree * right_tree;
		}
		dp[i] = total_tree;
	}
	console.log(dp);
}

numTrees_dp(4);
