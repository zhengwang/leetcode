/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  var hash = new Map;
  hash.set(2, ["a", "b", "c"]);
  hash.set(3, ["d", "e", "f"]);
  hash.set(4, ["g", "h", "i"]);
  hash.set(5, ["j", "k", "l"]);
  hash.set(6, ["m", "n", "o"]);
  hash.set(7, ["p", "q", "r", "c"]);
  hash.set(8, ["t", "u", "v"]);
  hash.set(9, ["w", "x", "y", "z"]);

  digits = digits.split("");
  let res = [];
  const LEN = digits.length;

  var recurs = (combs) => {
    if (combs.length ===LEN) {
      res.push(combs);
      return;
    }

    digits.forEach(d => {
      let candidate = hash.get(+d);
      let letter = candidate.pop();
      hash.set(d, candidate);

      recurs([...combs, letter]);
      
      candidate.push(letter);
      hash.set(d, candidate);
    });
  }

  recurs([]);
  console.log(res);
};

letterCombinations("23");
