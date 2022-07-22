function ListNode(val, next) {
  this.val = val ? val : 0;
  this.next = next ? next : null;
}

function LinkList() {
  this.head = null;
}

LinkList.prototype.insert = function(val) {
  if (this.head == null) {
    this.head = new ListNode();
  }
  let next = this.head.next;
  let newNode = new ListNode(val, next);
  this.head.next = newNode;
}

LinkList.prototype.printList = function() {
  let tail = this.head;
  let path = '';
  while(tail) {
    path += `${tail.val}->`;
    tail = tail.next;
  }
  console.log(path);
}

/**
 * @param {number} key
 * @return {LinkNode|null}
 */
LinkList.prototype.search = function(key) {
  let tail = this.head;
  while(tail) {
    if (tail.val === key) {
      return tail;
    }
    tail = tail.next;
  }
  return null;
}

/**
 * @param {number} key
 */
LinkList.prototype.delete = function(key) {
  let ptr=this.head, ptrprev;
  while(ptr) {
    if (ptr.val === key) {
      break;
    }
    ptrprev = ptr;
    ptr=ptr.next;
  }
  if (ptr != null) {
    ptrprev.next = ptr.next;
  }
}

let list = new LinkList();
list.insert(5);
console.log(list);
list.insert(4);
console.log(list);
list.printList();
console.log(list.search(4));
list.insert(7);
list.delete(5);
console.log(list);
list.printList();