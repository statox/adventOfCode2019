const fs = require('fs');

const OP_ADD = 1;
const OP_MUL = 2;
const OP_HALT = 99;

// Setup to recreate the "1202 intcode alarm" state
const originalIntCode = fs.readFileSync('./input', "utf8").split(',').map(Number);

const runCode = (intcode) => {
    var intructionPointer = 0;
    var opCode = intcode[intructionPointer];

    while (opCode !== OP_HALT) {
        switch (opCode) {
            case OP_ADD:
                add(intructionPointer, intcode);
                break;
            case OP_MUL:
                multiply(intructionPointer, intcode);
                break;
            default:
                console.log('    something went wrong');
                return -1;
                break;
        }
        intructionPointer += 4;
        opCode = intcode[intructionPointer];
    }

    return intcode[0];
}

const setupAndRun = (noun, verb) => {
    const intcode = originalIntCode.slice();
    intcode[1] = noun;
    intcode[2] = verb;

    return runCode(intcode);
}

const add = (i, intcode) => {
    // console.log(`    pos ${i} add ${intcode[intcode[i+1]]} + ${intcode[intcode[i+2]]} to ${i+3}`);
    intcode[intcode[i + 3]] = intcode[intcode[i + 1]] + intcode[intcode[i + 2]];
}

const multiply = (i, intcode) => {
    // console.log(`    pos ${i} mul ${intcode[intcode[i+1]]} * ${intcode[intcode[i+2]]} to ${i+3}`);
    intcode[intcode[i + 3]] = intcode[intcode[i + 1]] * intcode[intcode[i + 2]];
}

for (var verb=0; verb<=99; verb++) {
    for (var noun=0; noun<=99; noun++) {
        const result = setupAndRun(noun, verb);

        if (result === 19690720) {
            const expr = 100 * noun + verb;
            console.log(`Found verb: ${verb}, noun: ${noun}, expr ${expr}`);
            return;
        }
    }
}
// result: 9425
