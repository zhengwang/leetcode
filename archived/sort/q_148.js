/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  let length = 0;
  let pivot = head.next;
  while (pivot) {
    length++;
    pivot = pivot.next;
  }
  console.log(`length=${length}`);

};

function merge(head, lo, mid, hi) {
  let dummy_head = new ListNode(),
    dummy = dummy_head;
  let pivot_lo = head,
    pivot_hi = head,
    pivot_mid = head;

  let i = 0;
  // 1. find pivot_i
  while (i <= lo) {
    console.log(`i=${i}`);
    console.log(pivot_lo);
    pivot_lo = pivot_lo.next;
    i++;
  }
  i = 0;
  while (i <= mid) {
    pivot_hi = pivot_hi.next;
    i++;
  }
  pivot_mid = pivot_hi;

  console.log('--------- pivot low --------');
  console.log(pivot_lo);
  console.log(`--------- pivot high -------`);
  console.log(pivot_hi);
  console.log('----------- end ------------');
  
  while(pivot_hi && pivot_lo !== pivot_mid) {
    if (pivot_lo.val < pivot_hi.val) {
      dummy.next = pivot_lo;
      pivot_lo = pivot_lo.next;
    } else {
      dummy.next = pivot_hi;
      pivot_hi = pivot_hi.next;
    }
    console.log(`******* connect dummy node ********`);
    dummy = dummy.next;
    dummy.next = null;
    console.log(dummy);
  }

  console.log('after attach');
  // console.log(pivot_lo);
  // console.log(pivot_mid);
  // if any low pivot left
  while(pivot_lo !== pivot_mid) {
    console.log('------- pivot_lo -------');
    console.log(pivot_lo);
    dummy.next = pivot_lo;
    dummy=dummy.next;
    pivot_lo = pivot_lo.next;
  }
  
  // if any high pivot left
  if (pivot_hi) {
    console.log('--------- pivot hi --------');
    console.log(pivot_hi);
    dummy.next = pivot_hi;    
    dummy = dummy.next;
  }

  dummy.next = null;

  console.log('--------- after sorted -----------');
  printList(dummy_head);
}

function printList(head) {
  let path = '';
  while(head) {
    path += `->${head.val}`;
    head = head.next;
  }
  console.log(path);
}

function sort(head, lo, hi) {
  if (hi < lo) {
    return;
  }
  let mid = lo + Math.floor((hi - lo) / 2);
  console.log(`mid=${mid}`);

  sort(head, lo, mid - 1);
  sort(head, mid + 1, hi);
  merge(head, lo, mid, hi);
}

var head = new ListNode(null);
let pivot = head;
[4,2,6,8,1,3,5,7].forEach(num => {
  let node = new ListNode(num);
  pivot.next = node;
  pivot = node;
});
printList(head);
// sort(head, 0, 8);
merge(head, 0, 1, 3);