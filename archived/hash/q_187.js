/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function(s) {
    var hash = new Map;
    const LEN = s.length;
    const WIN_SIZE = 10;

    for(let i=0; i<LEN; i++) {
      let substr = s.substring(i, i+WIN_SIZE);
      hash.set(substr, 0);
      for(let j=0;j<LEN;j++) {
        //console.log(s.substring(j, j + WIN_SIZE));
        if (s.substring(j, j + WIN_SIZE)===substr) {
          let num = hash.get(substr);
          hash.set(substr, ++num);
        }
      }
    }
    console.log(hash);
};

findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT");