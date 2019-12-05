const fs = require('fs');
const readlineSync = require('readline-sync');

const OP_ADD = 1;
const OP_MUL = 2;
const OP_IN = 3;
const OP_OUT = 4;
const OP_HALT = 99;

// Get the intcode
const originalIntCode = fs.readFileSync('./input', "utf8").split(',').map(Number);

const processOpCode = (fullCode) => {
    return {
        modes: String(fullCode).slice(0, -2).split('').map(Number).reverse(),
        opCode: Number(String(fullCode).slice(-2))
    };
};
const runCode = (intcode) => {
    var instructionPointer = 0;
    var instructionCode = processOpCode(intcode[instructionPointer]);

    while (instructionCode.opCode !== OP_HALT) {
        // console.log(instructionCode);
        var step;
        switch (instructionCode.opCode) {
            case OP_ADD:
                step = add(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_MUL:
                step = multiply(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_IN:
                step = input(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_OUT:
                step = output(instructionPointer, intcode, instructionCode.modes);
                break;
            default:
                console.log('    something went wrong');
                return -1;
                break;
        }

        instructionPointer += step;
        instructionCode = processOpCode(intcode[instructionPointer]);
    }

    return;
}

const add = (i, intcode, modes) => {
    const operand1    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const operand2    = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);
    const destination = intcode[i+3];

    // console.log('add', operand1, '+', operand2, '=>', destination);
    intcode[destination] = operand1 + operand2;

    return 4;
};

const multiply = (i, intcode, modes) => {
    const operand1    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const operand2    = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);
    const destination = intcode[i+3];

    // console.log('multiply', operand1, '*', operand2, '=>', destination);
    intcode[destination] = operand1 * operand2;

    return 4;
};

const input = (i, intcode, modes) => {
    const destination = intcode[i+1];
    const userInput = readlineSync.question(`Input to ${destination}: `);
    intcode[destination] = userInput;

    return 2;
};

const output = (i, intcode, modes) => {
    const destination = intcode[i+1];
    console.log(`value at ${destination}: ${intcode[destination]}`);

    return 2;
};

const intcode = originalIntCode.slice();
return runCode(intcode); // 9938601
