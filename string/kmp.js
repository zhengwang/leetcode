class KMP {
	constructor(pat_str) {
		// build dfa
		const dfa = new Map;
		const LEN = pat_str.length;
		// initialize dfa
		pat_str.split("").forEach((ch, idx) => {
			let arr = dfa.get(ch);
			if (!arr) {
				arr = new Array(LEN).fill(0);
				if (idx === 0) {
					arr[0] = 1;
				}
				dfa.set(ch, arr);
			}
		});

		for(let X=0, j=1; j < LEN; j++) {
			let pre;
			// mismatch
			dfa.forEach((v, key) => {
				v[j] = v[X];
				if (pat_str.charAt(j) === key) {
					// match
					v[j] = j +1;
					pre = v[X];
				}
			});
			// update restart 
			X = pre;
		}

		this.dfa = dfa;
		this.M = LEN;
	}

	search(txt) {
		let j=0;
		txt.split("").forEach((ch, idx) => {
			let arr = this.dfa.get(ch);
			j = arr ? arr[j] : 0;
			if (j === this.M) {
				console.log(`FOUND idx=${idx - this.M + 1}`);
				j=0;
			}
		});
	}
}

const kmp = new KMP("ABABAC");
console.log(kmp);
kmp.search("AAAAABABACCCCCEREABABACEWRWER");