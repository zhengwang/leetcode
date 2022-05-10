/**
 * @param {string|number} val
 * @param {string|number} key
 */
function Node(val, key) {
	this.key = key;
	this.val = val;
	this.left = null;
	this.right = null;
	this.middle = null;
}

class TernarySearchTree {
	constructor() {
		this.root = null;
	}

	/**
	 * @param {string} key
	 */
	get(key) {
		return this._get(this.root, key, 0);
	}

	/**
	 * @param {Node} node
	 * @param {string} key
	 * @param {number} d
	 */
	_get(node, key, d) {
		if (!node) {
			return -1;
		}
		let ch = key.charAt(d);
		if (node.key < ch) {
			return this._get(node.right, key, d);
		} else if (node.key > ch) {
			return this._get(node.left, key, d);
		} else if (d < key.length - 1) {
			return this._get(node.middle, key, d+1);
		} else {
			return node;
		}
	}

	/**
	 * @param {string} key
	 * @param {number} val
	 */
	put(key, val) {
		this.root = this._put(this.root, key, val, 0);
	}

	/**
	 * @param {Node} node
	 * @param {string} key
	 * @param {number} val
	 * @param {number} d
	 */
	_put(node, key, val, d) {
		let ch = key.charAt(d);
		console.log(`ch=${ch}`);
		console.log(node);

		if (!node) {
			node = new Node(null, ch);
		}
		
		if (node.key < ch) {
			node.right = this._put(node.right, key, val, d);
		} else if(node.key > ch) {
			node.left = this._put(node.left, key, val, d);
		} else if (d < key.length-1) {
			node.middle = this._put(node.middle, key, val, d+1);
		} else {
			node.val = val;
		}
		return node;
	}
}

const wordBank = ['leet', 'code'];
const tst = new TernarySearchTree();
wordBank.forEach((word, idx) => {
	tst.put(word, idx);
});
console.log(tst);
console.log(tst.get('code'));