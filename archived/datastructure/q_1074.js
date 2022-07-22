/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
const numSubmatrixSumTarget = (matrix, target) => {
	const cols = matrix[0].length;
	const rows = matrix.length;

	let sum_matrix = new Array(rows);
	for (let i = 0; i < rows; i++) {
		sum_matrix[i] = new Array(cols);
	}

	console.log(sum_matrix);

	// update sum_matrix
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (r == 0 && c == 0) {
				sum_matrix[0][0] = matrix[0][0];
			} else if (r == 0) {
				sum_matrix[r][c] = sum_matrix[r][c - 1] + matrix[r][c];
			} else if (c == 0) {
				console.log(`c=${c} | r=${r}`);
				sum_matrix[r][c] = sum_matrix[r - 1][c] + matrix[r][c];
			} else {
				sum_matrix[r][c] = sum_matrix[r - 1][c] + sum_matrix[r][c - 1] -
					sum_matrix[r - 1][c - 1] + matrix[r][c];
			}
		}
	}
	// console.log(sum_matrix);

	// scan all submatrix
	for (let r0 = 0; r0 < rows; r0++) {
		for (let c0 = 0; c0 < cols; c0++) {
			for (let r1 = r0; r1 < rows; r1++) {
				for (let c1 = c0; c1 < cols; c1++) {
					 submatrix_total = sum_matrix[r1][c1] 
					 	- (c0-1 >= 0 ? sum_matrix[r1][c0-1] : 0)
					 	- (r0-1 >= 0 ? sum_matrix[r0-1][c1] : 0)
					 	+ (r0-1 >= 0 && c0-1 >= 0 ? sum_matrix[r0-1][c0-1] : 0);

					 if (submatrix_total == target) {
					 	console.log(`${r0},${c0} - ${r1}, ${c1}`);
					 }
				}
			}
		}
	}
}

numSubmatrixSumTarget([[0,0,0,1,1],[1,1,1,1,1],[0,1,0,0,0],[0,1,0,0,0],[1,1,1,1,0],[1,1,1,0,1]], 0);