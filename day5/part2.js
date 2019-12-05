const fs = require('fs');
const readlineSync = require('readline-sync');

const OP_ADD = 1;
const OP_MUL = 2;
const OP_IN = 3;
const OP_OUT = 4;
const OP_JUMP_IF_TRUE = 5;
const OP_JUMP_IF_FALSE = 6;
const OP_LESS_THAN = 7;
const OP_EQUALS = 8;
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
        switch (instructionCode.opCode) {
            case OP_ADD:
                instructionPointer = add(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_MUL:
                instructionPointer = multiply(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_IN:
                instructionPointer = input(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_OUT:
                instructionPointer = output(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_JUMP_IF_TRUE:
                instructionPointer = jumpIfTrue(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_JUMP_IF_FALSE:
                instructionPointer = jumpIfFalse(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_LESS_THAN:
                instructionPointer = lessThan(instructionPointer, intcode, instructionCode.modes);
                break;
            case OP_EQUALS:
                instructionPointer = equals(instructionPointer, intcode, instructionCode.modes);
                break;
            default:
                console.log('    something went wrong');
                return -1;
                break;
        }
        instructionCode = processOpCode(intcode[instructionPointer]);
    }

    return;
}

const jumpIfTrue = (i, intcode, modes) => {
    const test    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const value   = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);

    if (test !== 0) {
        return value;
    }

    return i+3;
};

const jumpIfFalse = (i, intcode, modes) => {
    const test    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const value   = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);

    if (test === 0) {
        return value;
    }

    return i+3;
};

const lessThan = (i, intcode, modes) => {
    const operand1    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const operand2    = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);
    const destination = intcode[i+3];

    if (operand1 < operand2) {
        intcode[destination] = 1;
    } else {
        intcode[destination] = 0;
    }

    return i+4;
}

const equals = (i, intcode, modes) => {
    const operand1    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const operand2    = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);
    const destination = intcode[i+3];

    if (operand1 === operand2) {
        intcode[destination] = 1;
    } else {
        intcode[destination] = 0;
    }

    return i+4;
}

const add = (i, intcode, modes) => {
    const operand1    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const operand2    = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);
    const destination = intcode[i+3];

    // console.log('add', operand1, '+', operand2, '=>', destination);
    intcode[destination] = operand1 + operand2;

    return i + 4;
};

const multiply = (i, intcode, modes) => {
    const operand1    = Number(modes[0] === 1 ? intcode[i+1] : intcode[intcode[i+1]]);
    const operand2    = Number(modes[1] === 1 ? intcode[i+2] : intcode[intcode[i+2]]);
    const destination = intcode[i+3];

    // console.log('multiply', operand1, '*', operand2, '=>', destination);
    intcode[destination] = operand1 * operand2;

    return i + 4;
};

const input = (i, intcode, modes) => {
    const destination = intcode[i+1];
    const userInput = readlineSync.question(`Input to ${destination}: `);
    intcode[destination] = userInput;

    return i + 2;
};

const output = (i, intcode, modes) => {
    const destination = intcode[i+1];
    console.log(`value at ${destination}: ${intcode[destination]}`);

    return i + 2;
};

const intcode = originalIntCode.slice();
return runCode(intcode); // 4283952

// It's weird that I get the right result because for the following test program
//
// 3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
// 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
// 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
//
// One test case doesn't work (if input < 8 I get undefined instead of 1000)
