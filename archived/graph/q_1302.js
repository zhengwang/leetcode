/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function(root) {
  let height = 0;
  var dsf = (root) => {
    if (!root) {
      return 0;
    }

    height = Math.max(deepestLeavesSum(root.left), deepestLeavesSum(root.right));
    return height + 1;
  };
};
