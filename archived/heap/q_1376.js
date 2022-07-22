function getSub(manager, man_id) {
	return manager.reduce((carry, empId, idx) => {
		if (empId === man_id) {
			carry.push(idx);
		}
		return carry;
	}, []);
}
/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
	const g = new Map;
	manager.forEach((man, idx) => {
		let sub = g.get(idx);
		if (!sub) {
			sub = getSub(manager, idx);
		}
		g.set(idx, sub);
	});
	console.log(g);
	let totalcost = 0;

	const bfs = (headId) => {
		let visited= new Set;
		let queue = [headId];
		while(queue.length) {
			let empId = queue.shift();

			if (!visited.has(empId)) {

				if (g.get(empId).length === 0) {
					console.log(`empId=${empId}`);
					break;
				}
				let cost = informTime[empId];
				totalcost += cost;
				visited.add(empId);
				g.get(empId).forEach(sub => {
					queue.push(sub);
				});
			}
		}
	};
	bfs(headID);
	console.log(totalcost);
	return totalcost;
};

let n = 15, headID = 0, manager = [-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6], informTime = [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0];
// console.log(getSub(manager, 2));
numOfMinutes(n, headID, manager, informTime);