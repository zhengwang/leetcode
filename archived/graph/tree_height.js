function createTree(nums) {

}

var bsf = (root) => {
  if (!root) {
    return 0;
  }
  let height = 0;
  root.children.forEach(node => {
    let temp = bsf(node) + 1;
    if (temp > height) {
      height = temp;
    }
  });
  return height;
}
