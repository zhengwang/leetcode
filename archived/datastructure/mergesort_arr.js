function MergeSort(nums) {
  this.nums = nums;
}

MergeSort.prototype.merge = function(lo, mid, hi) {
  let aux = new Array(hi-lo+1);
  for(let k=lo;k<=hi;k++) {
    aux[k] = this.nums[k];
  }

  let i=lo, j=mid+1;
  for(let k=lo;k<=hi;k++) {
    if (j>hi) {
      // only left
      this.nums[k] = aux[i++];
    } else if (i > mid) {
      // only right
      this.nums[k] = aux[j++];
    } else if (aux[i] < aux[j]) {
      this.nums[k] = aux[i++];
    } else {
      this.nums[k] = aux[j++];
    }
  }
}

MergeSort.prototype.sort = function(lo, hi) {
  if (lo >=hi ) return;
  let mid = lo + Math.floor((hi-lo)/2);
  this.sort(lo, mid);
  this.sort(mid+1, hi);
  this.merge(lo, mid, hi);
}

MergeSort.prototype.sort_bu = function() {
  const LEN = this.nums.length;
  for(let sz=1;sz<LEN;sz=sz*2) {
    for(let i=0;i<LEN-sz+1;i+=sz*2) {
      this.merge(i, i+sz-1, Math.min(i+sz*2-1, LEN-1));
    }
  }
}

let arr = [2,7,8,1,3,5,6,4];
let mergesort = new MergeSort(arr);
// mergesort.sort(0, arr.length-1);
mergesort.sort_bu();
console.log(arr);