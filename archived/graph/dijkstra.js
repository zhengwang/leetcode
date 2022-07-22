class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  /**
   * @param {number} i
   */
  parent(i) {
    return (i-1) >> 1;
  }

  /**
   * @param {number} i
   */
  left(i) {
    return (i << 1) + 1;
  }

  /**
   * @param {number} i
   */
  right(i) {
    return (i << 1) + 2;
  }

  /**
   * @param {string} label
   */
  getIndex(label) {
    for(let i=0; i<this.queue.length; i++) {
      if(this.queue[i].label === label) {
        console.log(`getIndex of ${label}=${i}`);
        console.log(this.queue[i]);
        return i;
      }
    }
  }

  /**
   * @param {number} key
   * @param {number} i
   */
  decrease(key, i, parent_lbl) {
    if (this.queue[i].key < key) {
      // already small value
      return;
    }

    if (i > 0) {
      console.log(`key=${key} i=${i}`);
      let parent_idx = this.parent(i);
      let parent = this.queue[parent_idx];
      let current = this.queue[i];
      current.key = key;
      current.parent= parent_lbl;

      if (current.key<parent.key) {
        this.queue[i] = parent;
        this.queue[parent_idx] = current;
        this.decrease(key, parent_idx, parent_lbl);
      }
    } else {
      let current = this.queue[i];
      console.log(current);
      current.key = key;
      current.parent= parent_lbl;
      this.queue[i] = current;
    }
  }

  /**
   * @param {number} key
   * @param {string} label
   */
  insert(key, label) {
    this.queue.push(new Node(label, key));
    this.decrease(key, this.queue.length-1);
  }

  /**
   * @param {number} idx
   */
  minHeapify(idx) {
    let left_idx = this.left(idx);
    let right_idx = this.right(idx);
    let left = this.queue[left_idx];
    let right = this.queue[right_idx];
    let current = this.queue[idx];

    let smallest = current, smallest_idx = idx;
    if (left && smallest.key > left.key) {
      smallest = left;
      smallest_idx = left_idx;
    }
    if (right && smallest.key > right.key) {
      smallest = right;
      smallest_idx = right_idx;
    }
    if (smallest_idx !== idx) {
      this.queue[smallest_idx] = current;
      this.queue[idx] = smallest;
      this.minHeapify(smallest_idx);
    }
  }

  extract_min() {
    if (this.queue.length === 0) {
      return null;
    }

    let min = this.queue[0];
    this.queue[0] = this.queue[this.queue.length - 1];
    this.queue.pop();
    this.minHeapify(0);
    return min;
  }
}

function Node(label, weight) {
  this.label = label;
  this.key = weight;
}

function buildGraph(data) {
  let g = new Map;
  data.forEach(pair => {
    let adj = g.get(pair[0]);
    if (!adj) {
      g.set(pair[0], [new Node(pair[1], pair[2])]);
    } else {
      adj.push(new Node(pair[1], pair[2]));
      g.set(pair[0], adj);
    }
  });
  return g;
}

function Dijkstra() {
  const data = [["s", "t", 10], ["s", "y", 5],
                ["t", "x", 1], ["t", "y", 2],
                ["y", "t", 3], ["y", "z", 2], ["y", "x", 9],
                ["z", "s", 7], ["z", "x", 6],
                ["x", "z", 4]
              ];
  let g = buildGraph(data);

  let queue = new PriorityQueue();
  // initial PriorityQueue
  for(let [key] of g.entries()) {
    if (key === 's') {
      queue.insert(0, key);
    } else {
      queue.insert(Number.MAX_VALUE, key);
    }
  }
  console.log(queue);
  let path = [];

  while(queue.queue.length) {
    let node = queue.extract_min();
    path.push(node);
    let adjs = g.get(node.label);
    adjs.forEach(adj => {
      let idx = queue.getIndex(adj.label);
      console.log(`label=${adj.label}, key=${adj.key}, idx=${idx}`);
      if (idx>=0) {
        console.log(`-------- check queue status BEFORE DECREASE --------`);
        console.log(queue);
        console.log('-------- queue status --------');
        queue.decrease(adj.key, idx, node.label);
      }

    });

  }

  console.log(path);
}

Dijkstra();
