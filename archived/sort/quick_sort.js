function quick(nums, lo, hi) {
  if (hi > lo) {
    console.log(`lo=${lo}, hi=${hi}`);
    let pivot = partition(nums, lo, hi);
    quick(nums, lo, pivot-1);
    quick(nums, pivot+1, hi);
  }
}

function partition(nums, lo, hi) {
  let idx = hi;
  let x = nums[idx];
  let i=lo-1;
  for(let j=lo;j<=hi;j++) {
    if (nums[j]<x) {
      i++;
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
    }
  }
  i++; // i point to last smallest number
  console.log(`pivot=${i}, ${nums[idx]}`);
  nums[idx] = nums[i];
  nums[i] = x;
  return i;
}

let arr = [2,8,7,1,3,5,6,4]
quick(arr, 0, arr.length-1);
console.log(arr);
