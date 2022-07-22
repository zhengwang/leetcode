/**
 * @param {number[]} nums
 */
function initRadix() {
  let radix = new Array(10);
  for(let i=0; i<10; i++) {
    radix[i] = [];
  }
  return radix;
}

/**
 * @param {number} num
 */
function getDigit(num, j) {
  let arr = num.toString().split("");
  return arr.length > j ? arr[j]: 0;
}

/**
 * @param {number[]} nums
 */
function radixSort(nums) {
  let LEN = nums.length;
  let radix = initRadix();

  for(let i=0; i<=1; i++) {
    for(let j=0; j<LEN; j++) {
      let digit = Math.floor(nums[j]/Math.pow(10, i)) % 10;
      // let digit = getDigit(nums[j], i);
      console.log(digit);
      radix[digit].push(nums[j]);
    }

    console.log(radix);
    let k=0;
    for(let i=0; i<radix.length; i++) {
      for(let j=0; j<radix[i].length; j++) {
        if (!isNaN(radix[i][j])) {
          nums[k] = radix[i][j];
          k++;
        }
      }
    }
    // console.log(nums);
    radix = initRadix();
  }
  // return nums;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
  if(nums.length === 1) {
    return 0;
  }

  radixSort(nums);
  console.log(nums);
  let gap = 0;
  for(let i=1; i<nums.length-1; i++) {
    let temp = nums[i+1] - nums[i];
    if (temp > gap) {
      gap = temp;
    }
  }
  console.log(gap);
};

maximumGap([10000000, 1]);
