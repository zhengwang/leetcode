/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {

};

let arr = [[2,4],[1,3],[2,4],[1,3]];
let root;
arr.forEach((adjs, idx) => {
  let node = new Node(idx+1);
  if (idx === 0) {
    root = node;
  }
  adjs.forEach(adj => {
    let _n = new Node(adj);
  });
});
