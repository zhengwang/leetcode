/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
	this.val = (val === undefined ? 0 : val)
	this.next = (next === undefined ? null : next)
}

var printList = (head) => {
	let msg = "\n===";
	while(head) {
		msg = msg.concat(`${head.val}\t`)
		head = head.next;
	}
	msg = msg.concat('===\n')
	console.log(msg);
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
	let before = new ListNode(0),  after = new ListNode(0);
	const before_head = before, after_head = after;

	while(head) {
		if (head.val < x) {
			before.next = head;
			before = before.next;
		} else {
			after.next = head;
			after = after.next;
		}
		head = head.next;
	}

	// === combine both list ===
	before.next = after_head.next;
	after.next = null;

	return before_head.next;
}

let head = new ListNode(1);
let pivot = head;

[4,3,2,5,2].forEach((elem) => {
	pivot.next = new ListNode(elem);
	pivot = pivot.next;
});

// printList(head);

let tmp = partition(head, 3);
printList(tmp);