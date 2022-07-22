function TreeNode(val, next) {
  this.val = val ? val : 0;
  this.next = next ? next : null;
}

function BinarySearchTree() {
  this.root = null; 
}

BinarySearchTree.prototype._insert = function(node, val) {
  if (node == null) {
    node = new TreeNode(val);
    return node;
  }
  
  if (node.val > val) {
    node.left = this._insert(node.left, val);
  } else if (node.val < val) {
    node.right = this._insert(node.right, val);
  }
  return node;
}
/**
 * @param {number} val
 */
BinarySearchTree.prototype.insert = function(val) {
  this.root = this._insert(this.root, val);
}

BinarySearchTree.prototype.depth = function(root) {
  function postOrder(root, depth=0) {
    if (root == null) return -1;
    let left = postOrder(root.left, depth);
    let right = postOrder(root.right, depth);
    depth = Math.max(left, right) + 1;
    return depth;
  }

  return postOrder(root);
}

let btree = new BinarySearchTree;
[15,6,18,3,7,17,20,2,4,13,9].forEach(num => {
  btree.insert(num);
});
console.log(`${JSON.stringify(btree)}`);
console.log(btree.depth(btree.root));