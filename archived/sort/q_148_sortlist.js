function ListNode(val, next) {
	this.val = val ?? 0;
	this.next = next ?? null;
}

/**
 * @param {ListNode} head
 */
function getMid(head) {
	let midPre = head;
	while(head && head.next && head.next.next) {
		midPre = midPre.next;
		head = head.next.next;
	}

	let mid = midPre.next;
	midPre.next = null;
	return mid;
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 */
function merge(list1, list2) {
	const dummy = new ListNode();
	let tail = dummy;
	while(list1 && list2) {
		if (list1.val < list2.val) {
			tail.next = list1;
			list1 = list1.next;
		} else {
			tail.next = list2;
			list2 = list2.next;
		}
		tail = tail.next;
	}

	tail.next = (list1) ? list1 : list2;
	return dummy.next;
}

var sortList = function(head) {
	if (!head || !head.next) {
		return head;
	}
	let mid = getMid(head);
	let left = sortList(head);
	let right = sortList(mid);

	return merge(left, right);
}

let head = new ListNode(), tail = head;
[4,2,1].reduce((carry, num) => {
	carry.next = new ListNode(num);
	carry = carry.next;
	return carry;
}, tail);
let sorted = sortList(head.next);
console.log(sorted);