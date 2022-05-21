// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
function SortAlgorithm (data) {
    this.nums = data;
}

SortAlgorithm.prototype.quicksort = function() {
    let arr = this.nums.slice();
    function partition(lo, hi) {
        let X = arr[hi];
        let i=lo-1;
        for(let j=lo;j<=hi;j++) {
            if (arr[j] < X) {
                // swap
                i++;
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
        
        // find position
        i++;
        [arr[i], arr[hi]] = [arr[hi], arr[i]];
        return i;
    }
    
    function sort(lo,hi){
        if (lo >= hi) return;
        let pivot = partition(lo, hi);
        sort(lo, pivot-1);
        sort(pivot+1, hi);
    }
    sort(0, arr.length-1);
    console.log(arr);
}

SortAlgorithm.prototype.insertsort = function() {
    const arr = this.nums.slice();
    const LEN = arr.length;
    for(let i=1;i<LEN;i++) {
        for(let j=i;j>=0;j--) {
            if(arr[j]<arr[j-1]) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            }
        }
    }
    console.log(arr);
}

SortAlgorithm.prototype.bubblesort = function() {
    const arr = this.nums.slice();
    const LEN = arr.length;
    for(let i=0;i<LEN;i++) {
        for(let j=0;j<LEN-i;j++) {
            if (arr[j]<arr[j-1]) {
                [arr[j-1],arr[j]]=[arr[j],arr[j-1]];
            }
        }
    }
    console.log(arr);
}

SortAlgorithm.prototype.countingsort_singledigit = function() {
    const arr = this.nums.slice();
    const LEN = arr.length, R=10+1;
    const counter = new Array(R).fill(0);
    
    // counter
    for(let i=0;i<LEN;i++) {
        counter[arr[i]+1]++;    
    }
    
    //counter to index
    for(let i=0;i<R;i++) {
        counter[i+1] += counter[i];
    }
    
    // distribute to aux
    let aux = new Array(LEN);
    for(let i=0;i<LEN;i++) {
        let cnt_id = counter[arr[i]];
        aux[cnt_id] = arr[i];
        counter[arr[i]]++;
    }
    
    // copy back to arr
    for(let i=0;i<LEN;i++) {
        arr[i]=aux[i];
    }
    console.log(arr);
}

SortAlgorithm.prototype.countingsort = function(nums, d) {
    /**
     * @param {number} num
     * @param {number} d
     */
    function getDigit(num, d) {
        return Math.floor(num/Math.pow(10,d))%10;
    }
    
    const R = 11; // 10+1
    const LEN = nums.length;
    const counter = new Array(R).fill(0);
    
    // counter
    for(let i=0;i<LEN;i++) {
        let cnt_idx = getDigit(nums[i], d);
        counter[cnt_idx+1]++;
    }
    
    // counter to index
    for(let i=0;i<R-1;i++) {
        counter[i+1] += counter[i];
    }

    // distribute
    let aux = new Array(LEN);
    for(let i=0;i<LEN;i++) {
        let cnt_idx = getDigit(nums[i],d);
        let idx = counter[cnt_idx];
        aux[idx] = nums[i];
        counter[cnt_idx]++;
    }

    // copy back
    for(let i=0;i<LEN;i++) {
        nums[i]=aux[i];
    }
}

SortAlgorithm.prototype.radixsort = function(nums) {
    for(let d=0;d<5;d++) {
        this.countingsort(nums, d);
    }
    console.log(nums);
}

SortAlgorithm.prototype.MSD = function(nums) {
    const R=10; // 10+2, [null,0,1,2...]
    const LEN = nums.length;
    /**
     * @param {number} num
     * @param {number} d
     */
    function getDigit(num, d) {
        return Math.floor(num/Math.pow(10, d))%10;
    }
    
    function countering(nums, lo, hi, d) {
        // console.log(`lo=${lo} hi=${hi}`);
        if (lo >= hi) return;
        let counter = new Array(R+2).fill(0);
        
        // counter
        for(let i=lo;i<=hi;i++) {
            let cnt_idx = getDigit(nums[i], d);
            counter[cnt_idx+2]++;
        }
        
        // counter to index
        for(let i=0;i<R+1;i++) {
            counter[i+1] += counter[i];
        }
        console.log(counter);
        
        // distribute
        let aux = new Array(LEN);
        for(let i=lo;i<=hi;i++) {
            let cnt_idx = getDigit(nums[i], d)
            aux[counter[cnt_idx+1]++]=nums[i];
        }
        
        // copy
        for(let i=lo;i<=hi;i++) {
            nums[i]=aux[i-lo];
        }
        
        console.log(nums);
        console.log(counter);
        for(let i=0;i<R;i++) {
            countering(nums, lo+counter[i], lo+counter[i+1]-1, d-1);
        }
    }
    
    countering(nums, 0, nums.length-1, 4);
    console.log('after sorting.....');
    console.log(nums);
}


let algorithm = new SortAlgorithm([2,8,7,1,3,5,6,4]);
// algorithm.quicksort();
// algorithm.insertsort();
// algorithm.bubblesort();
// algorithm.countingsort_singledigit();
// algorithm.radixsort([12, 51,23,37,15,45]);
algorithm.MSD([564, 32, 71]);