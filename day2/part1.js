const fs = require('fs');

const OP_ADD = 1;
const OP_MUL = 2;
const OP_HALT = 99;

// const intcode = [1,0,0,0,99];
// const intcode = [2,3,0,3,99];
// const intcode = [2,4,4,5,99,0]
// const intcode = [1,1,1,4,99,5,6,0,99]

// Setup to recreate the "1202 intcode alarm" state
const intcode = fs.readFileSync('./input', "utf8").split(',').map(Number);
intcode[1] = 12;
intcode[2] = 2;

const add = (i) => {
    console.log(`    pos ${i} add ${intcode[intcode[i+1]]} + ${intcode[intcode[i+2]]} to ${i+3}`);
    intcode[intcode[i + 3]] = intcode[intcode[i + 1]] + intcode[intcode[i + 2]];
}

const multiply = (i) => {
    console.log(`    pos ${i} mul ${intcode[intcode[i+1]]} * ${intcode[intcode[i+2]]} to ${i+3}`);
    intcode[intcode[i + 3]] = intcode[intcode[i + 1]] * intcode[intcode[i + 2]];
}

var intructionPointer = 0;
var opCode = intcode[intructionPointer];

while (opCode !== OP_HALT) {
    switch (opCode) {
        case OP_ADD:
            add(intructionPointer);
            break;
        case OP_MUL:
            multiply(intructionPointer);
            break;
        default:
            console.log('    something went wrong');
            return;
            break;
    }
    intructionPointer += 4;
    opCode = intcode[intructionPointer];
}

console.log(`result: ${intcode[0]}`);
// result: 3085697
