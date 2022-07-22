class DisjoinSet {
  constructor() {
    this.parent = new Map;
    this.rank = new Map;
  }

  /**
   * @param {number} x
   */
  find(x) {
    if (this.parent.get(x) == undefined) {
      this.parent.set(x, null);
      return x;
    }

    return this.find(this.parent.get(x));
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  union(x,y) {
    let parent_x = this.find(x);
    let parent_y = this.find(y);

    // console.log(`x=${x}, parent_x=${parent_x}, y=${y}, parent_y=${parent_y}`);

    if(parent_x === parent_y) {
      return false;
    }

    let rank_x = this.rank.get(x);
    let rank_y = this.rank.get(y);
    if (!rank_x) {
      this.rank.set(x, 0);
      rank_x = 0;
    }
    if (!rank_y) {
      this.rank.set(y, 0);
      rank_y = 0;
    }

    if (rank_x > rank_y) {
      // merge shorter to higher
      this.parent.set(parent_y, parent_x);
    } else if (rank_x < rank_y) {
      this.parent.set(parent_x, parent_y);
    } else {
      this.parent.set(parent_y, parent_x);
      this.rank.set(parent_x, ++rank_x);
    }

    // console.log(`after union`);
    // console.log(this);

    return true;
  }
}
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function(n, connections) {
    const ds = new DisjoinSet();
    const critical = [], redudent = [];

    connections.forEach(edge => {
      if (ds.union(edge[0], edge[1])) {
        critical.push(edge);
      } else {
        redudent.push(edge);
      }
    });
    console.log(critical);
    console.log(redudent);
    let temp = redudent.reduce((c,n) => {return c.concat(n)}, []);

    return connections.filter(edge => {
      return temp.indexOf(edge[0])<0 || temp.indexOf(edge[1])<0;
    });
};

console.log(criticalConnections(6, [[0,1],[1,2],[2,0],[1,3],[3,4],[4,5],[5,3]]));