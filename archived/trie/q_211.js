function Node(val) {
  this.val = val;
  this.next = new Array(26);
}

var WordDictionary = function() {
  this.root = new Node('');
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
  this._addWord(this.root, word, 0, word.length);
};

/**
 * @param {Node} root
 * @param {string} word
 * @param {number} d
 * @param {number} LEN
 */
WordDictionary.prototype._addWord = function(root, word, d, LEN) {
  if (!root) {
    root = new Node(null);
  }
  if (d === LEN) {
    root.val = 1;
    return root;
  }

  let charIdx = word.charCodeAt(d) - 97;
  root.next[charIdx] = this._addWord(root.next[charIdx], word, d+1, LEN);
  return root;
}

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
  return this._search(this.root, word, 0, word.length);
};

/**
 * @param {Node} root
 * @param {string} word
 * @param {number} d
 * @param {number} LEN
 */
WordDictionary.prototype._search = function(root, word, d, LEN) {
  if (!root) {
    return false;
  }

  if (d === LEN && root.val === 1) {
    return true;
  }

  if (word.charAt(d) === '.') {
    let flag = false;
    for(let i=0; i<26; i++) {

      if (this._search(root.next[i], word, d+1, LEN)) {
        flag = true;
        break;
      }
    }
    return flag;
  } else {
    let charIdx = word.charCodeAt(d)-97;
    return this._search(root.next[charIdx], word, d+1, LEN);
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
 var obj = new WordDictionary();
obj.addWord("a");
console.log(obj.search("."));
console.log(obj.search("a"));
console.log(obj.search("aa"));
console.log(obj.search('.a'));
