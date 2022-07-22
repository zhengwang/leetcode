/**
 * time complexity n^2
 */
function bubbleSort(nums) {
  const LEN = nums.length;
  for(let i=0; i<LEN; i++) {
    for(let j=0; j<LEN-i-1; j++) {
      if (nums[j+1] < nums[j]) {
        let temp = nums[j+1];
        nums[j+1] = nums[j];
        nums[j] = temp;
      }
    }
  }
  // console.log(nums);
}

/**
 * time complexity is n^2
 */
function insertSort(nums) {
  const LEN = nums.length;
  for(let i=1; i <LEN; i++) {
    let X = nums[i];
    let j=i-1;
    while(j >=0 && nums[j] > X) {
      nums[j+1] = nums[j];
      j--;
    }

    nums[j+1] = X;
  }

  console.log(nums);
}

/**
 * @param {number[]} nums
 */
function radixSort(nums, asc=true) {
  let radix = new Array(10);
  for(let i=0; i<10; i++) {
    radix[i] = [];
  }

  const LEN = nums.length;
  const arr = new Array(LEN);
  for(let i=0; i<=4; i++) {
    for(let j=0; j<LEN; j++) {
      let digit = Math.floor(nums[j] / Math.pow(10, i)) % 10;
      // console.log(`digit=${digit} nums[j]=${nums[j]}`);
      if (asc) {
        radix[digit].push(nums[j]);
      } else {
        radix[10 - digit - 1].push(nums[j]);
      }
    }

    // follow radix order put number back
    let k=0;
    for(let i=0; i<radix.length; i++) {
      for(let j=0; j <radix[i].length; j++) {
        if (!isNaN(radix[i][j])) {
          nums[k] = radix[i][j];
          k++;
        }
      }
    }
    //reset radix
    radix = new Array(10);
    for(let i=0; i<10; i++) {
      radix[i] = [];
    }
  }
  return nums;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  let neg_arr = nums.filter(n => n < 0).map(n => n * -1);
  let pos_arr = nums.filter(n => n >= 0);
  neg_arr = radixSort(neg_arr, false).map(n => n * -1);
  pos_arr = radixSort(pos_arr, true);
  console.log(neg_arr.concat(pos_arr));
};

sortArray([3,-1]);
// bubbleSort([5,2,3,1]);
// insertSort([5,2,3,1]);
