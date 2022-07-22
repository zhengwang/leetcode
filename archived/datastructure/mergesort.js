function ListNode(val, next) {
  this.val = val ? val: 0;
  this.next = next ? next : null;
}
function MergeSort() {}

MergeSort.prototype.getMid = function(head) {
  let midprev = head, tail = head.next;
  while(tail && tail.next) {
    tail = tail.next ? tail.next.next : tail.next;
    midprev = midprev.next;
  }

  let mid = midprev.next;
  midprev.next = null;
  return [head, mid];
}

MergeSort.prototype.merge = function(list1, list2) {
  let dummyHead = new ListNode, tail = dummyHead;
  while(list1 && list2) {
    if (list1.val > list2.val) {
      tail.next = list2;
      list2 = list2.next;
    } else {
      tail.next = list1;
      list1 = list1.next;
    }
    tail = tail.next;
  }

  // connect left node
  tail.next = list1 ? list1 : list2;

  return dummyHead.next;
}

/**
 * @param {LinkNode} head
 */
MergeSort.prototype.sort = function(head) {
  if (!head || !head.next) {
    return head;
  }

  let [newhead, mid] = this.getMid(head);
  let left = this.sort(newhead);
  let right = this.sort(mid);
  return this.merge(left, right);
}

let head= new ListNode, tail=head;
[2,8,7,1,3,5,6,4].forEach(n => {
  tail.next = new ListNode(n);
  tail = tail.next;
});
let mergeSort = new MergeSort();
let sorthead = mergeSort.sort(head.next);
console.log(`sorthead=${JSON.stringify(sorthead)}`);
