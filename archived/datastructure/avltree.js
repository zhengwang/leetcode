// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

function TreeNode(val, left, right) {
    this.val = val ? val : 0;
    this.left = left ? left : null;
    this.right = right ? right : null;
    this.height = 1;
}

function AVLTree() {
    this.root = null;
}

/**
 * @param {number} val
 */
AVLTree.prototype.insert = function(val) {
    this.root = this._insert(this.root, val);
}

AVLTree.prototype.height = function(node) {
    if(node == null) {
        return 0;
    }
    
    return node.height;
}

/**
 * @param {TreeNode} node
 */
AVLTree.prototype.getBalance = function(node) {
    let left = node.left;
    let right = node.right;
    return this.height(left) - this.height(right);
}

/**
 * @param {TreeNode} node
 */
AVLTree.prototype.rightrotate = function(node) {
    let left = node.left;
    let right = left.right;
    
    left.right = node;
    node.left = right;
    
    node.height = Math.max(
        this.height(node.left), 
        this.height(node.right))+1;
    left.height = Math.max(
        this.height(left.left),
        this.height(left.right))+1;
    
    return left;
}

/**
 * @param {TreeNode} node
 */
AVLTree.prototype.leftrotate = function(node) {
    let right = node.right;
    let left = right.left;
    
    node.right = left;
    right.left = node;
    
    node.height = Math.max(
        this.height(node.left), 
        this.height(node.right)) + 1;
    right.height = Math.max(
        this.height(right.left),
        this.height(right.right)) + 1;
    
    return right;
}

/**
 * @param {TreeNode} root
 * @param {number} val
 */
AVLTree.prototype._insert = function(root, val) {
    if (root == null) {
        return new TreeNode(val);
    }
    
    if (root.val > val) {
        // left
        root.left = this._insert(root.left, val);
    } else if (root.val < val) {
        // right
        root.right = this._insert(root.right, val);
    } else {
        return root;
    }
    
    root.height = Math.max(
        this.height(root.left), 
        this.height(root.right))+1;
        
    let balance = this.getBalance(root);
    console.log(`balance=${balance}`);
    
    // left-left case
    if (balance > 1 && val < root.left.val) {
        root = this.rightrotate(root);
    }
    
    // left-right case
    if (balance > 1 && val > root.left.val) {
        console.log(`${JSON.stringify(root.left)}`);
        root.left = this.leftrotate(root.left);
        root = this.rightrotate(root);
    }
    
    // right-right case
    if (balance < -1 && val > root.right.val) {
        console.log(`left rotate`);
        root = this.leftrotate(root);
    }
    
    // right-left case
    if (balance < -1 && val < root.right.val) {
        root.right = this.rightrorate(root.right);
        root = this.leftrotate(root);
    }

    return root;
}

let avltree = new AVLTree();
[1,2,3,4,5,6,7].forEach(n => {
    avltree.insert(n);
});
console.log(`${JSON.stringify(avltree)}`);