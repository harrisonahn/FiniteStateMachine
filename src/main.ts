import { modThree } from "./ModThree";

function main() {
    const numbers = ["1101", "1110", "1111", "1010111"]; // 13, 14, 15, 87

    for (const num of numbers) {
        console.log(`${num} mod 3 = ${modThree(num)}`);
    }
}

main();
