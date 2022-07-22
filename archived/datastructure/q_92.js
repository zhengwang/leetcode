/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
	this.val = (val === undefined ? 0 : val);
	this.next = (next === undefined ? null : next);
}

function printList(head) {
	let pivot = head;
	while (pivot) {
		console.log(`${pivot.val}\t`);
		pivot = pivot.next;
	}
	console.log('\n');
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween_BF = function(head, left, right) {
	let start = head,
		end = start;
	console.log(JSON.stringify(head));

	// find start and end nodes
	while ((start && start.val != left) || (end && end.val != right)) {
		if (start.val != left) {
			start = start.next;
		}
		end = end.next;
	}
	// console.log(`start=${start.val}, end=${end.val}`);

	if (start && end) {
		let last = end,
			pivot = start,
			prev = start;
		while (last != start) {
			while (pivot != last) {
				next = pivot.next;
				[next.val, pivot.val] = [pivot.val, next.val];
				prev = pivot;
				pivot = pivot.next;
			}

			last = prev;
			pivot = start;
			console.log(`after swipe: \n`);
			printList(head);
		}
	} else {
		console.log(`=== Empty List === STOP ===`);
	}
};

// reverseBetween(head, 1, 1);

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 */
const reverseBetweenRecursive = (head, m, n) => {
	if (!head) {
		return null;
	}

	let left = head, right = left;
	let stop = false;
	
	const recurseAndReserve = (right, m, n) => {
		if(n == 1)
			return;

		right = right.next;

		if (m > 1) {
			// === find the left bound ===
			left = left.next;
		}

		recurseAndReserve(right, m-1, n-1);

		if (right == left || right.next == left) 
		{
			stop = true;
		}

		if (!stop) {
			// === SWAP ELEMENT ===
			[left.val, right.val] = [right.val, left.val];

			left = left.next;
		}
 	}

 	recurseAndReserve(right, m, n);
}

let head = new ListNode(1, null),
	pivot = head;
[2,3,4,5].forEach((val) => {
	let node = new ListNode(val, null);
	pivot.next = node;
	pivot = pivot.next;
});

reverseBetweenRecursive(head, 2, 4);
printList(head);

let head2 = new ListNode(5, null);
reverseBetweenRecursive(head2, 1, 1);
printList(head2);
