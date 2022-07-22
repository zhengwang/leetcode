class Heap {
  /**
   * @param {number[]} data
   */
  constructor(data) {
    this.queue = data;
    this.heap_size = data.length;
  }

  parent(i) {
    return (i-1) >> 1;
  }

  left(i) {
    return (i << 1) + 1;
  }

  right(i) {
    return (i << 1) + 2;
  }

  /**
   * @param {number} val
   */
  maxHeapify(i) {
    let left_idx = this.left(i);
    let right_idx = this.right(i);
    let left = left_idx < this.heap_size ? this.queue[left_idx] : null;
    let right = right_idx < this.heap_size ? this.queue[right_idx] : null;
    let val = this.queue[i];

    let largest=val, l_idx=i;
    if (left && largest < left) {
      largest = left;
      l_idx = left_idx;
    }
    if (right && largest < right) {
      largest = right;
      l_idx = right_idx;
    }
    if (l_idx !== i) {
      let temp = this.queue[i];
      this.queue[i] = largest;
      this.queue[l_idx] = temp;
      this.maxHeapify(l_idx);
    }
  }

  buildHeap() {
    for(let i=Math.floor(this.queue.length/2); i>=0; i--) {
      // swap to first
      this.maxHeapify(i);
    }
  }

  extract_max() {
    if (this.heap_size === 1) {
      this.heap_size = 0;
      return this.queue[0];
    }
    if (this.heap_size === 0) {
      return null;
    }
    let max = this.queue[0];
    this.queue[0] = this.queue[this.heap_size-1];
    this.maxHeapify(0);
    this.heap_size--;
    return max;
  }
}

var findKthLargest = function(nums, k) {
  const heap = new Heap(nums);
  heap.buildHeap();
  console.log(heap);
  let res;
  for(let i=0; i<k;i++) {
    if (i === k-1) {
      console.log(i);
      res = heap.extract_max();
    } else {
      heap.extract_max();
    }
  }
  console.log(heap);
  return res;
}

// var heap = new Heap([3,2,1,5,6,4]);
// heap.buildHeap();
// console.log(heap);
// let max = heap.extract_max();
// console.log(heap);
const data = [-1,2, 0];
console.log(findKthLargest(data, 2));
