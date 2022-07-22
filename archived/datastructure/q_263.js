/**
 *
 * @param {number} val
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
 }

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
	let ans, mid;

	const recurs = (root) => {
		if (!root) {
			return false;
		}

		let left = recurs(root.left);
		let right = recurs(root.right);
		mid = root == p || root == q;

		if (mid && left && right) {
			ans = root;
		}

		return mid || left || right;
	}

	recurs(root);
	return ans;
};