/** @format */

// Hat Puzzle
// https://www.youtube.com/watch?v=6hVPNONm7xw
// NOTE: DO NOT USE n = 7 or MORE
// IT wILL crash
// It has like O(n^n) time complexity and O(n^n) space complexity too - you will run out of memory and space
// It might be even more than O(n^n)

// Usage: `node hat_algorithm.js <n> <algorithm name>
// Working algo: `node hat_algorithm.js 4 genAlg`

const shwijs = require("shwi-js"); // Not used in general algorithm but used to make the other ones a bit better

function generateCombinations(n) {
	const results = [];

	function backtrack(currentCombo) {
		if (currentCombo.length === n) {
			results.push([...currentCombo]);
			return;
		}

		for (let i = 1; i <= n; i++) {
			currentCombo.push(i);
			backtrack(currentCombo);
			currentCombo.pop();
		}
	}

	backtrack([]);

	return results;
}
// Maybe we can skip over storing these but I'm storing these so I can check it actually generated correctly.

const n = process.argv[2] ? Number(process.argv[2]) : 2;
const allCombos = generateCombinations(n);

/**
 * Just a simple function that loops out of bound indices to the start of the list
 * @param {Array} listToCall List to get items out of
 * @param {Number} callNumber
 * @returns
 */
function listCallRound(listToCall, callNumber) {
	return listToCall[callNumber % listToCall.length];
}

const HATS = Array.from({ length: n }, (_, index) => index + 1);

/**
 * Input any number, get a hat number from it (loops back to 1 if input > n)
 * @param {Number} index
 * @returns
 */
function getHatNumber(index) {
	return HATS[(index - 1) % HATS.length];
}

// What each prisoner would call out in each scenario
let calls = [];

// For n = 2
function algo21(input = []) {
	// 1 -> 2
	// 2 -> not 1
	return [input[1], getHatNumber(input[0] + 1)];
}

// For n = 3
function algo31(inputCombo = []) {
	// 1 -> 2
	// 2 -> 3 + 1
	// 3 -> 1 + 2
	let outCache = [];
	outCache.push(inputCombo[1]);
	outCache.push(getHatNumber(inputCombo[2] + 1));
	outCache.push(getHatNumber(inputCombo[0] + 2));
	return outCache;
}
function algo32(input = []) {
	// 1 -> 2
	// 2 -> 3
	// 3 -> 1
	return [
		getHatNumber(input[1]),
		getHatNumber(input[2]),
		getHatNumber(input[0]),
	];
}

function algo33(input = []) {
	// 1 -> 2 + 1
	// 2 -> 3 + 1
	// 3 -> 1 + 1
	return [
		getHatNumber(input[1] + 1),
		getHatNumber(input[2] + 2),
		getHatNumber(input[0] + 3),
	];
}

function algo34(input = []) {
	// 1 -> not a2 and not a3
	// 2 -> 1 + 1
	// 3 -> 2 + 1
	let tc1 = 1;
	let availableHats = HATS;
	for (let i = 0; i < input.length; i++) {
		if (i == 0) continue;
		if (availableHats.includes(input[i]))
			availableHats = availableHats.filter((h) => h !== input[i]);
	}
	return [
		availableHats[0],
		getHatNumber(input[0] + 1),
		getHatNumber(input[1] + 1),
	];
}

// Does what it says.. gets a random hat from HATS
function getRandomHat() {
	let rng = Math.floor(Math.random() * n);
	return getHatNumber(rng + 1);
}

const ALGOS = {
	21: algo21,
	31: algo31,
	32: algo32,
	33: algo33,
	34: algo34,
	35: (input) => {
		// 1 -> 2
		// 2 -> 3+1
		// 3 -> 1 + 2
		return [input[1], getHatNumber(input[2] + 1), getHatNumber(input[0] + 2)];
	},
	36: (input) => {
		// 1 -> 2
		// 2 -> 3
		// 3 -> nc1 and nc2
		let c1 = input[1];
		let c2 = input[2];
		let c3 = HATS.filter((h) => h !== c1 && h !== c2)[0];
		return [c1, c2, c3];
	},
	37: (input) => {
		// 1 -> 2 but not 3
		// 2 -> 3 but not 1
		// 3 -> 1 but not 2
		let c1 = input[1] != input[2] ? input[1] : getHatNumber(input[1] + 1);
		let c2 = input[2] != input[0] ? input[2] : getHatNumber(input[2] + 1);
		let c3 = input[0] != input[1] ? input[0] : getHatNumber(input[0] + 1);
		return [c1, c2, c3];
	},
	38: (input) => {
		// 1 -> rng
		// 2 -> rng
		// 3 -> rng
		return [getRandomHat(), getRandomHat(), getRandomHat()];
	},
	39: (input) => {
		// 1 -> rng
		// 2 -> rng but not 1
		// 3 -> rng but not 1 or 2
		let c1 = getRandomHat();
		let remainingHats = HATS.filter((h) => h !== c1);
		let c2 = shwijs.Random(...remainingHats);
		let c3 = shwijs.Random(...remainingHats.filter((h) => h !== c2));
		return [c1, c2, c3];
	},
	three1: (input) => {
		// 1 -> not 2 and not 3
		// 2 -> not 1 and not 3
		// 3 -> not 1 and not 2
		let c1 = shwijs.Random(
			...HATS.filter((h) => h !== input[1] && h !== input[2]),
		);
		let c2 = shwijs.Random(
			...HATS.filter((h) => h !== input[2] && h !== input[1]),
		);
		let c3 = shwijs.Random(
			...HATS.filter((h) => h !== input[1] && h !== input[0]),
		);
		return [c1, c2, c3];
	},
	three2: (input) => {
		// 1 -> remainder is 0
		// 2 -> remainder is 1
		// 3 -> remainder is 2
		let c1 = getRandomHat();
		let r1 = (i1) => {
			return (i1 + input[1] + input[2]) % n;
		};

		let c2 = getRandomHat();
		let r2 = (i2) => {
			return (i2 + input[0] + input[2]) % n;
		};

		let c3 = getRandomHat();
		let r3 = (i3) => {
			return (i3 + input[0] + input[1]) % n;
		};
		HATS.forEach((hat) => {
			if (r1(hat) == 0) c1 = hat;
			if (r2(hat) == 1) c2 = hat;
			if (r3(hat) == 2) c3 = hat;
		});
		return [c1, c2, c3];
	},
	genAlg: (input = []) => {
		let returnList = [];
		for (let i = 0; i < input.length; i++) {
			let prelim = getRandomHat();
			let rem = (hCheck) => {
				let filteredArr = input.filter((val, ind) => ind !== i);
				let sum = 0;
				for (let j = 0; j < filteredArr.length; j++) {
					sum += filteredArr[j];
				}
				sum += hCheck;
				return sum % n;
			};
			HATS.forEach((hat) => {
				if (rem(hat) == i) prelim = hat;
			});
			returnList.push(prelim);
		}
		return returnList;
	},
};

allCombos.forEach((combo) => {
	let algoToUse = process.argv[3] || 21;
	calls.push(ALGOS[algoToUse](combo));
});

// Check
let comboWins = [];
for (let i = 0; i < allCombos.length; i++) {
	let winCondition = false;
	for (let j = 0; j < allCombos[i].length; j++) {
		if (allCombos[i][j] == calls[i][j]) winCondition = true;
	}
	comboWins.push(winCondition);
}

for (let i = 0; i < allCombos.length; i++) {
	console.log(allCombos[i], calls[i], comboWins[i]);
}

let totalWins = 0;
for (let i = 0; i < comboWins.length; i++) {
	if (comboWins[i]) totalWins++;
}
console.log(
	`Wins: ${totalWins}/${comboWins.length} (${((totalWins / comboWins.length) * 100).toFixed(2)}%)`,
);
