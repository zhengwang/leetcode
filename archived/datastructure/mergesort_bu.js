function ListNode(val, next) {
	this.val = val ? val : null;
	this.next = next ? next : null;
}

function SortList() {}

SortList.prototype.merge = function(list1, list2) {
	let dummyHead = new ListNode,
		tail = dummyHead;
	while (list1 && list2) {
		if (list1.val > list2.val) {
			tail.next = list2;
			list2 = list2.next;
		} else {
			tail.next = list1;
			list1 = list1.next;
		}
		tail = tail.next;
	}
	tail.next = list1 ? list1 : list2;

	while (tail.next) {
		tail = tail.next;
	}
	return [dummyHead.next, tail];
}

/**
 * @param {ListNode} head
 * @param {number} size
 */
SortList.prototype.split = function(head, size) {
	let midprev = head,
		end = head.next;
	for (let idx = 1; idx < size && (midprev.next ||end.next); idx++) {
		if (end && end.next) {
			end = end.next.next ? end.next.next : end.next;
		}
		if (midprev && midprev.next) {
			midprev = midprev.next;
		}
	}

	let mid = midprev.next;
	midprev.next = null;
	let nextsublist = end.next;
	end.next = null;
	return [mid, nextsublist];
}

/**
 * @param {ListNode} head
 * @return {number}
 */
SortList.prototype.getCount = function(head) {
	let cnt = 0;
	while (head) {
		cnt++;
		head = head.next;
	}
	return cnt;
}

SortList.prototype.sort_bu = function(head) {
	const N = this.getCount(head);
	let dummyHead = new ListNode,
		tail, start = head;
	for (let sz = 1; sz < N; sz = sz * 2) {
		tail = dummyHead;
		while (start) {
			if (!start.next) {
				// one node only
				tail.next = start;
				break;
			}

			let [mid, nextsublist] = this.split(start, sz);
			let [newhead, newtail] = this.merge(start, mid); // 

			start = nextsublist;
			tail.next = newhead;
			tail = newtail;
		}
		start = dummyHead.next;
	}

	this.print(dummyHead);
}

SortList.prototype.print = function(head) {
	let path = '';
	while (head) {
		path += `${head.val}->`;
		head = head.next;
	}
	console.log(path);
}

let head = new ListNode,
	tail = head;
[2,8,7,1,3,5,6,4].forEach((num) => {
	tail.next = new ListNode(num);
	tail = tail.next;
});
head = head.next;
let sort = new SortList;
let sorted_head = sort.sort(head);
console.log(sorted_head);
// sort.sort_bu(head);
// console.log(sort.split(head, 4));