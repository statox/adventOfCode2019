const fs = require('fs');

const lines = fs.readFileSync('./input', "utf8");

// part 1
const res = lines.split('\n')
    .filter(s => s.length > 0)
    .map(Number)
    .map(m => Math.floor(m / 3) - 2)
    .reduce((a, b) => a + b, 0)

console.log(`result: ${res}`);
// result 3390830

// part 2
const getNeededFuel = (w) => {
    const remaining = Math.floor(w / 3) - 2;
    if (remaining < 0) {
        return 0;
    }
    return remaining;
};
const res = lines.split('\n')
    .filter(s => s.length > 0)
    .map(Number)
    .map(m => {
        var remaining = getNeededFuel(m);
        var total = remaining;

        while(remaining > 0) {
            remaining = getNeededFuel(remaining);
            total += remaining;
        }

        return total;
    })
    .reduce((a, b) => a + b, 0)

console.log(`result: ${res}`);
// result 5083370
