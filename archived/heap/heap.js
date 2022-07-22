// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
function MinHeap(data) {
    this.queue=data ? data : [];
    this.heap_size=data ? data.length:0;
}

/**
 * @param {number} id
 * @return {number}
 */
MinHeap.prototype.parent = function(id) {
    return id > 0 ? (id-1) >> 1 : 0;
}

/**
 * @param {number} id
 * @return {number}
 */
MinHeap.prototype.left = function(id) {
    return (id << 1)+1;
}

/**
 * @param {number} id
 * @return {number}
 */
MinHeap.prototype.right = function(id) {
    return (id << 1) + 2;
}

/**
 * @param {number} id
 */
MinHeap.prototype.minHeapify = function(id) {
    let left_idx = this.left(id);
    let right_idx = this.right(id);
    let left = this.queue[left_idx];
    let right = this.queue[right_idx];
    let current = this.queue[id];
    
    let smallest = current, smallest_id=id;
    if(left != undefined && left < smallest) {
        smallest = left;
        smallest_id = left_idx;
    }
    if (right != undefined && right < smallest) {
        smallest = right;
        smallest_id = right_idx;
    }
    if (smallest_id !== id) {
        [this.queue[smallest_id], this.queue[id]] = 
        [this.queue[id], this.queue[smallest_id]];
        this.minHeapify(smallest_id);
    }
}

/**
 * @param {number} key
 * @param {number} id
 */
MinHeap.prototype.insert = function(key) {
    if(this.heap_size===0) {
        this.queue.push(key);
        this.heap_size++;
        return;
    }
    this.queue.push(key);
    this.heap_size++;
    this.decrease(key, this.queue.length-1);
}

/**
 * @param {number} key
 * @param {number} id
 */
MinHeap.prototype.decrease = function(key, id) {
    let parent_id = this.parent(id);
    let parent = this.queue[parent_id];
    console.log(`decrease key=${key} id=${id} parent_id=${parent_id} parent=${parent}`);
    if(key < parent) {
        [this.queue[parent_id], this.queue[id]] = 
        [this.queue[id], this.queue[parent_id]];
        this.decrease(key, parent_id);
    }
}

MinHeap.prototype.extract_min = function() {
    let min = this.queue[0];
    this.queue[0]=this.queue[this.heap_size-1];
    this.queue.pop();
    this.heap_size--;
    this.minHeapify(0);
    return min;
}

MinHeap.prototype.buildHeap = function() {
    if (this.heap_size === 0) {
        return;
    }
    
    for(let i=Math.floor(this.heap_size/2)-1;i>=0;i--) {
        this.minHeapify(i);
    }
}

// let arr = [16,14,10];
// let heap = new MinHeap();
// heap.insert(10);
// console.log(heap);
// heap.insert(8);
// console.log(heap);
// heap.insert(14);
// console.log(heap);
// console.log(heap.extract_min());
// heap.insert(7);
// console.log(heap);
// heap.insert(1);
// console.log(heap);

let heap2 = new MinHeap([27,17,3,16,13,10,1,5,7,12,4,8,9,0]);
heap2.buildHeap();
console.log(heap2);