class KMPSearch {
	/**
	 * @param {string} pat
	 */
	constructor(pat) {
		const LEN = pat.length;
		const lps = new Array(LEN).fill(0);

		for(let i=1; i < LEN; i++) {
			let t = lps[i-1]; // get previous t value
			while(t > 0 && pat.charAt(i) !== pat.charAt(t)) {
				// if not match then rollback t
				t = lps[t-1];
			}
			//
			if (pat.charAt(i) == pat.charAt(t)) {
				t++;
			}
			lps[i] = t;
		}

		this.lps = lps;
		this.M = LEN;
		this.pat = pat;
	}

	/**
	 * @param {string} txt
	 */
	search(txt) {
		let i=0, j=0;
		let N = txt.length;

		while(i<N) {
			if (txt.charAt(i) === this.pat.charAt(j)) {
				i++;
				j++;
			}

			if (j === this.M) {
				console.log(`Found pattern at index ${i-this.M}`);
				j = this.lps[j-1]; // just rollback to previous 1 pos
			} else if (i<N && this.pat.charAt(j) !== txt.charAt(i)) {
				if (j!==0) {
					j = this.lps[j-1];
				} else {
					i+=1;
				}
			}
		}
	}
}

const txt = "ABABDABACDABABCABAB";
const pat = "ABABCABAB"
const kmp = new KMPSearch(pat);
console.log(kmp);
kmp.search(txt);
