function bubbleSort(nums) {
	const LEN = nums.length;
	for(let i=0;i<LEN;i++) {
		for(let j=1;j<LEN-i;j++) {
			if (nums[j-1]>nums[j]) {
				[nums[j-1], nums[j]] = [nums[j], nums[j-1]];
			}
		}
	}
	console.log(nums);
}

function insertSort(nums) {
	const LEN = nums.length;
	for(let i=1;i<LEN;i++) {
		for(let j=i;j>=0;j--) {
			if(nums[j-1]>nums[j]) {
				[nums[j-1],nums[j]]=[nums[j],nums[j-1]];
			}
		}
	}
	console.log(nums);
}

function quicksort(nums, lo, hi) {
	if (lo > hi) return; 
	let pivot = partition(nums, lo, hi);	
	quicksort(nums, lo, pivot-1);
	quicksort(nums, pivot+1, hi);
}

function partition(nums,lo,hi) {
	const X = nums[hi];
	let i=-1;
	for(let j=0;j<hi;j++) {
		if (nums[j]<X) {
			i++;
			[nums[i], nums[j]] = [nums[j], nums[i]];
		}
	}
	i++;
	[nums[i], nums[hi]] = [nums[hi], nums[i]];
	return i;
}

function radixSort(nums) {
	let radix = new Array(10);
	const R = 10;
	for(let i=0;i<R;i++) {
		radix[i]=[];
	}

	const getDigit = (num, d) => {
		return Math.floor(num/Math.pow(10,d))%10;
	};

	/**
	 * @param {number[][]} radix
	 * @param {number[]} aux
	 */
	const distribute = (radix, aux) => {
		let j=0;
		for(let i=0;i<R;i++) {
			const radix_LEN = radix[i].length;
			if (radix_LEN) {
				for(let k=0;k<radix_LEN;k++) {
					aux[j] = radix[i][k];
					j++;
				}
			}
		}
	}

	const LEN = nums.length;
	// const aux = nums.slice();

	for(let i=0;i<5;i++) {
		for(let j=0;j<LEN;j++) {
			let idx = getDigit(nums[j], i);
			radix[idx].push(nums[j]);
		}
		
		distribute(radix, nums);
		// clear radix
		radix = new Array(R);
		for(let i=0;i<R;i++) {
			radix[i]=[];
		}
	}
	console.log(nums);
}

/**
 * lower-case only
 * @param {string[]} arr
 * @param {number} w_len
 */
function LSD_sort(arr, w_len) {
	
	const LEN = arr.length, R=256;
	
	for(let d=w_len-1;d>=0;d--) {
		const counter = new Array(R).fill(0);
		// counter	
		for(let i=0;i<LEN;i++) {
			counter[arr[i].charCodeAt(d)+1]++;
		}

		// counter -> index
		for(let r=0;r<R;r++) {
			counter[r+1] += counter[r];
		}
		console.log('index counter');
		console.log(counter);

		// distribute
		let aux = new Array(LEN);
		for(let i=0;i<LEN;i++) {
			let counter_idx = arr[i].charCodeAt(d);
			console.log(`counter_idx=${counter_idx}, arr[i]=${arr[i]}`);
			aux[counter[counter_idx]++] = arr[i];
		}
		console.log(aux);
		// console.log(counter);

		// copy back
		for(let i=0;i<LEN;i++) {
			arr[i] = aux[i];
		}
	}
}

/**
 * @param {string[]} arr
 * @param {number} lo
 * @param {number} hi
 * @param {number} d
 */
function MSD_sort(arr) {
	const LEN = arr.length;
	const R = 26;

	/**
	 * @param {string} str
	 * @param {number} d
	 */
	function charAt(str, d) {
		return isNaN(str.charCodeAt(d)) ? -1 : (str.charCodeAt(d)-97);
	}

	function sort(arr, lo, hi, d) {
		if (lo >= hi) return;

		const counter = new Array(R+2).fill(0);

		// counter
		for(let i=lo;i<=hi;i++) {
			let charIdx = charAt(arr[i], d);
			counter[charIdx+2]++;
		}
		console.log(counter);

		// counter to index
		for(let i=0;i<R+1;i++) {
			counter[i+1] += counter[i];
		}

		// distribute
		let aux = new Array(LEN);
		for(let i=lo;i<=hi;i++) {
			aux[counter[charAt(arr[i], d)+1]++] = arr[i];
		}
		
		// copy back to arr
		for(let i=lo;i<=hi;i++) {
			arr[i] = aux[i-lo];
		}

		console.log(arr);
		for(let r=0;r<R;r++) {
			sort(arr,lo+counter[r],lo+counter[r+1]-1, d+1);
		}
	}

	sort(arr, 0, arr.length-1, 0);
}

function mergeSort(nums, lo, hi) {
	if (lo >= hi) return;
	let mid = lo + Math.floor((hi-lo)/2);
	mergeSort(nums, lo, mid);
	mergeSort(nums, mid+1, hi);
	merge(nums, lo, mid, hi);
}

function mergeSort_BU(nums) {
	const LEN = nums.length;
	for(let sz=1;sz<LEN;sz=(sz+sz)) {
		for(let k=0;k<LEN-sz;k+=sz+sz) {
			merge(nums, k, k+sz-1, Math.min(k+sz+sz-1,LEN-1));
		}
	}
}

function merge(nums, lo, mid, hi) {
	let aux = new Array(hi-lo+1);
	for(let k=lo;k<=hi;k++) {
		aux[k]=nums[k];
	}
	let i=lo, j=mid+1;
	for(let k=lo;k<=hi;k++) {
		if (i>mid) {
			nums[k]=aux[j++];
		} else if (j>hi) {
			nums[k]=aux[i++];
		} else if (aux[i]>aux[j]) {
			nums[k]=aux[j++];
		} else {
			nums[k]=aux[i++];
		}
	}
}

function ListNode(val, next) {
	this.val = val ? val:0;
	this.next = next ? next:null;
}

function SortList(nums) {
	this.head = new ListNode();
	let tail = this.head;

	nums.reduce((carry, num) => {
		carry.next = new ListNode(num);
		carry = carry.next;
		return carry;
	}, tail);
	
	this.head = this.head.next;
	this.nexSubList = null;
	this.tail = null;
	this.printList(this.head);
};

/**
 * @param {ListNode} head
 * @param {number} size
 * @return {ListNode}
 */
SortList.prototype.split = function(head, size) {
	let midprev = head, end=head.next;
	for(let idx=1;idx<size && (end.next || midprev);idx++) {
		if (end.next) {
			end = end.next.next ? end.next.next:end.next;	
		}

		if (midprev.next) {
			midprev = midprev.next;
		}
	}
	

	let mid = midprev.next;
	midprev.next = null;
	this.nexSubList = end.next; // save next sublist head
	console.log('===== split function =====');
	console.log(this.nexSubList);
	console.log('=========================');
	end.next = null;
	return mid;
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 */
SortList.prototype.merge = function(list1, list2) {
	console.log('======= in merge ========');
	console.log(list1);
	console.log(list2);
	let dummyHead = new ListNode(), newtail = dummyHead;
	while(list1 && list2) {
		if (list1.val > list2.val) {
			newtail.next = list2;
			list2 = list2.next;
		} else {
			newtail.next = list1;
			list1 = list1.next;
		}
		newtail = newtail.next;
	}
	
	newtail.next = list1 ? list1 : list2;

	while(newtail.next) {
		newtail = newtail.next;
	}

	this.tail.next = dummyHead.next;
	console.log(this.tail);	
	this.tail = newtail;
	console.log(this.tail);
	console.log('=========================');
}

SortList.prototype.getCount = function() {
	let cnt = 0;
	let ptr = this.head;
	while(ptr) {
		cnt++;
		ptr = ptr.next;
	}
	return cnt;
}

SortList.prototype.printList = function() {
	let msg = "", ptr = this.head;
	while(ptr) {
		msg += `${ptr.val}->`;
		ptr = ptr.next;
	}
	console.log(msg);
}

SortList.prototype.sort = function() {
	let start = this.head;
	let N = this.getCount();
	let dummyHead = new ListNode();
	for(let sz=1;sz<3;sz=sz*2) {
		console.log(`++++++++++++merge window size ${sz}++++++++++`);
		this.tail = dummyHead;
		console.log(this);
		console.log(start);
		while(start) {
			if (!start.next) {
				this.tail.next = start;
				break;
			}
			let mid=this.split(start, sz);
			this.merge(start, mid);
			console.log('after merge');
			console.log(dummyHead);

			start = this.nextSubList;
		}
		this.printList(start);
		start = dummyHead.next;

	}
	
}


const nums = [2,8,7,1,3,5,9,6,4];
// bubbleSort(nums);
// insertSort(nums);
// quicksort(nums, 0, nums.length-1);
// console.log(nums);
// radixSort([12,51,870,29]);
// LSD_sort(['4PGC938','2IYE230','3CIO720','1ICK750'],7);
// const arr=['che', 'by', 'be', 'bee', 'dell', 'cilly', 'china','celery', 'dave', 'dinner', 'apple', 'abby'];
// MSD_sort(arr, 0, arr.length-1, 0);
// console.log(arr);
// mergeSort(nums,0,nums.length-1);
// mergeSort_BU(nums);
// console.log(nums);
// const test = [7,8,9,1,2,3];
// merge(test,0,3,5);
//console.log(test);

//console.log(nums);
let arr = [5,1,2];
var sortList = new SortList(arr);
sortList.sort();
console.log(SortList);
