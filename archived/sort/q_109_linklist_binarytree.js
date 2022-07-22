
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function TreeNode(val, left, right) {
   this.val = (val===undefined ? 0 : val)
   this.left = (left===undefined ? null : left)
   this.right = (right===undefined ? null : right)
}

TreeNode.prototype.height = 1;

 /**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  class AVLTree {
    constructor() {
      this.root = null;
    }

    /**
     * @param {TreeNode} node
     * @param {number} key
     */
    insert(node, val) {
      if (!node) {
        return new TreeNode(val);
      }

      if (node.val > val) {
        node.left = this.insert(node.left, val);
      }
      if (node.val < val) {
        node.right = this.insert(node.right, val);
      } else {
        return node;
      }
      
      console.log(`--------insert ${val}--------`);
      console.log(node);
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

      let balanced = this.getBalance(node);
      console.log(`balance=${balanced}`);
      // left-left case
      if(balanced > 1 && val < node.left.val) {
        return this.rightRotate(node);
      }
      if (balanced < -1 && val > node.right.val) {
        return this.leftRotate(node);
      }
      // left-right
      if (balanced > 1 && val > node.right.val) {
        this.leftRotae(node.left);
        this.rightRoate(node);
      }
      // right-left
      if (balanced < -1 && val < node.right.val) {
        this.rightRotate(node.right);
        this.leftRotate(node);
      }

      return node;
    }

    /**
     * @param {TreeNode} node
     */
    rightRotate(node) {
      console.log(`trigger right rotate`);
      console.log(node);

      let root = node.left;
      let right = root.right;
      node.left = right;
      root.right = node;

      // update height
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
      root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;

      return root;
    }

    /**
     * @param {TreeNode} node
     */
    leftRotate(node) {
      console.log('left rotate');
      console.log(node);

      let root = node.right;
      let left = root.left;
      node.right = left;
      root.left = node;

      // update height
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
      root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
      return root;
    }

    /**
     * @param {TreeNode} node
     */
    getHeight(node) {
      if(!node) return 0;
      return node.height;
    }

    /**
     * @param {TreeNode} node
     * @return {number}
     */
    getBalance(node) {
      return this.getHeight(node.left) - this.getHeight(node.right);
    }
  }

  const avltree = new AVLTree();
  avltree.root = avltree.insert(avltree.root, -10);
  avltree.root = avltree.insert(avltree.root, -3);
  avltree.root = avltree.insert(avltree.root, 0);
  avltree.root = avltree.insert(avltree.root, 5);
  avltree.root = avltree.insert(avltree.root, 9);

  console.log(avltree);
};

sortedListToBST();