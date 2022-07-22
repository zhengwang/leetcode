function Node(label, weight) {
  this.label = label;
  this.weight = weight;
  this.color = "white";
}

function buildGraph(times) {
  let g = new Map;
  times.forEach(time => {
    let adj = g.get(time[0]);
    if(!adj) {
      g.set(time[0], [new Node(time[1], time[2])]);
    } else {
      adj.push(new Node(time[1], time[2]));
      g.set(time[0], adj);
    }
  });
  return g;
}

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime_dsf = function(times, n, k) {
  const g = buildGraph(times);
  const visited = new Set();
  const time_stack = new Array(n).fill(Number.MAX_VALUE);

  var dsf = function(root_lbl, current_time) {
    if (time_stack[root_lbl-1] < current_time) {
      return;
    }

    time_stack[root_lbl-1] = current_time;

    let adjs = g.get(root_lbl);
    if (adjs) {
      adjs.forEach(adj => {
        dsf(adj.label, current_time + adj.weight);
      });
    }
  }
  dsf(k, 0);
  console.log(time_stack);
};

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime_loop_dsf = function(times, n, k) {
  const g = buildGraph(times);
  let rec_time = new Array(n).fill(Number.MAX_VALUE);

  let queue = [k];
  rec_time[k-1] = 0; // initial source vertex time to 0

  while(queue.length) {
    let node_lbl = queue.pop();
    let adjs = g.get(node_lbl);

    current_time = rec_time[node_lbl-1];

    if (adjs) {
      adjs.forEach(adj => {
        if (current_time + adj.weight < rec_time[adj.label-1]) {
          rec_time[adj.label-1] = adj.weight + current_time;
          queue.push(adj.label);
        }
      });
    }
  }

  console.log(rec_time);
}

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime_dijkstra = function(times, n, k) {
  const g = buildGraph(times);

}

// let times = [[2,1,1],[2,3,1],[3,4,1]], k=2, n=4; // ans=2
// let times = [[1,2,1]], n = 2, k = 2; // ans=-1
// let times = [[1,2,1],[2,1,3]], k=2, n=2; // loop // 3
let times = [[1,2,1],[2,3,2],[1,3,2]], k=1, n=3; // ans = 2
// console.log(networkDelayTime(times, n, k));
networkDelayTime_loop_dsf(times, n, k);
