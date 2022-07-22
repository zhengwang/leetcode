/**
 * @param {number} i
 * @param {number} j
 */
function cellIdx(i, j, COLUMNS) {
  return i * COLUMNS + j;
}

function Vertex(label, weight) {
  this.label = label;
  this.weight = weight;
}

/**
 * build Map
 * ----
 * | 1 | 2 | 3 |
 * | 4 | 5 | 6 |
 * ....
 * @param {number[][]} grid
 */
function buildGraph(grid) {
  const g = new Map;
  // const ROWS = grid.length, COLUMNS = grid[0].length;
  const LEN = grid.length;

  for(let i=0;i<LEN;i++) {
    for(let j=0;j<LEN;j++) {
      let cell_idx=cellIdx(i, j, LEN);
      let adjs = g.get(cell_idx);
      if (!adjs) {
        adjs = [];
      }
      g.set(cell_idx, adjs);

      if (grid[i][j] === 0) {
        // LEFT-TOP
        if (i-1 >= 0 && j-1 > 0 && grid[i-1][j-1] === 0){
          let adj_idx = cellIdx(i-1,j-1,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }
        // MIDDLE-TOP
        if (j-1>=0 && grid[i][j-1] === 0) {
          let adj_idx = cellIdx(i, j-1,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }
        // RIGHT-TOP
        if ((i+1) < LEN && j - 1 > 0 && grid[i+1][j-1] === 0) {
          let adj_idx = cellIdx(i+1, j-1,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }

        //LEFT
        if (i-1>=0 && grid[i-1][j] === 0) {
          let adj_idx = cellIdx(i-1, j,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }

        // RIGHT
        if (i+1<LEN && grid[i+1][j] === 0) {
          let adj_idx = cellIdx(i+1, j,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }

        // BOTTOM-LEFT
        if (i-1>=0 && j+1< LEN && grid[i-1][j+1] === 0) {
          let adj_idx = cellIdx(i-1, j+1,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }

        // BOTTOM
        if (j+1<LEN && grid[i][j+1] === 0) {
          let adj_idx = cellIdx(i,j+1,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }

        if (i+1<LEN && j+1<LEN && grid[i+1][j+1]===0) {
          let adj_idx= cellIdx(i+1,j+1,LEN);
          adjs.push(new Vertex(adj_idx, 1));
          g.set(cell_idx, adjs);
        }

        if (i===LEN-1 && j===LEN-1) {
          g.set(cell_idx, adjs);
        }
      } else {
        // block cell doesn't have neighbors.
        g.set(cell_idx, adjs);
      }
    }
  }

  return g;
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
  const g = buildGraph(grid);
  console.log(g);
  const COLUMNS = grid[0].length, ROWS = grid.length;
  const rec_stack = new Array(COLUMNS * ROWS).fill(Number.MAX_VALUE);
  rec_stack[0] = 0; // start cell

  var dsf = (root_lbl, curr_time) => {
    if (root_lbl === undefined) {
      return 0;
    }

    let adjs = g.get(root_lbl);

    let LEN = adjs.length;
    for(let i=0; i<LEN; i++) {
      let temp = curr_time + adjs[i].weight;

      if (temp < rec_stack[adjs[i].label]) {
        // console.log(rec_stack);
        rec_stack[adjs[i].label] = temp;
        dsf(adjs[i].label, temp);
      }
    }
  }

  dsf(0, 0);
  console.log(rec_stack);
};

// var map = [[0,0,0],[1,1,0],[1,1,0]];
var map = [[0,1,1,0,0,0],[0,1,0,1,1,0],[0,1,1,0,1,0],[0,0,0,1,1,0],[1,1,1,1,1,0],[1,1,1,1,1,0]];
shortestPathBinaryMatrix(map);
