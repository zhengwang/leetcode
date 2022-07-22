function Node(val) {
  this.val=val;
  this.next = new Array(26);
}

var Trie = function() {
  this.R=26;
  this.root = new Node('');
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  this.root=this._insert(this.root, word, 0, word.length);
};

/**
 * @param {Node} root
 * @param {string} word
 * @param {number} d
 * @param {number} LEN
 */
Trie.prototype._insert = function(root, word, d, LEN) {
  if (!root) {
    root = new Node(null);
  }

  if (d === LEN-1) {
    root.val = 1;
    return root;
  }

  let charIdx = word.charCodeAt(d)-97;
  root.next[charIdx] = this._insert(root.next[charIdx], word, d+1, LEN);
  return root;
}

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  return this._search(this.root, word, 0, word.length);
};

Trie.prototype._search = function(root, word, d, LEN) {
  if (d===LEN-1) {
    return root && root.val === 1 ? true : false;
  }

  let charIdx = word.charCodeAt(d)-97;
  return this._search(root.next[charIdx], word, d+1, LEN);
}

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  return this._startsWith(this.root, prefix, 0, prefix.length);
};

Trie.prototype._startsWith = function(root, prefix, d, LEN) {
  if (!root) {
    return false;
  }
  if (root.val === 1 || d === LEN-1) {
    return true;
  }

  let charIdx = prefix.charCodeAt(d)-97;
  return this._startsWith(root.next[charIdx], prefix, d+1, LEN);
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

let trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));
console.log(trie.search("app"));
console.log(trie.startsWith("app"));
trie.insert("app");
console.log(trie.search("app"));
