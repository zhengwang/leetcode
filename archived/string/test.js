function kmp(pat, txt) {
  // build lps
  let M = pat.length, N = txt.length;

  let lps = new Array(M).fill(0);

  // learn lps from pattern
  for(let i=1; i<M; i++) {
    let t = lps[i-1];
    while(t > 0 && pat.charAt(t) !== pat.charAt(i)) {
      t = lps[t-1];
    }
    if (pat.charAt(t) === pat.charAt(i)) {
      t++;
    }
    lps[i] = t;
  }

  // search text
  let i=0; // pivot in text
  let j=0; // pivot in pattern
  while(i < N) {
    if (txt.charAt(i) === pat.charAt(j)) {
      i++;
      j++;
    }
    if (j === M) {
      console.log("FOUND");
      console.log(i-M);
    }
    if (i < N && txt.charAt(i) !== pat.charAt(j)) {
      // not match
      if (j !== 0) {
        j = lps[j-1];
      } else {
        i++;
      }
    }
  }

  console.log(lps);
}

const txt = "ABABDABACDABABCABAB";
const pat = "abcddcba"
kmp(pat, txt);
