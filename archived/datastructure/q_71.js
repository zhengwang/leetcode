/**
 *
 * @param {string} path
 */
var simplifyPath = function(path) {
	let stack = [];
	const arr = path.split("/");
	const LEN = arr.length;

	if (!arr.length) {
		return "/";
	}

	for(let i=0; i < LEN; i++) {
		if (stack.length > 0 && arr[i] === "..") {
			stack.pop();
		} else if (arr[i] != "." && arr[i] != ".." && arr[i] != "") {
			stack.push(arr[i]);
		}
	}

	let rst = "/";
	console.log(stack);
	if (stack.length > 0) {
		rst = rst.concat(stack.join("/"));
	}

	return rst;
}

console.log(simplifyPath("/a/b/./../../c"));