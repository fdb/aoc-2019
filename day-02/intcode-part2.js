// https://adventofcode.com/2019/day/2

const fs = require('fs');
let program_stream = fs.readFileSync('input.txt', 'utf-8');
program_stream = program_stream.trim();
program_stream = program_stream.split('\n').join(',');

function executeBytecode(bytecode) {
  let pc = 0;
  program:
  for (;;) {
    const opcode = bytecode[pc];
    switch(opcode) {
      case 1: {
        const addr1 = bytecode[pc + 1];
        const addr2 = bytecode[pc + 2];
        const addr_out = bytecode[pc + 3];
        const v1 = bytecode[addr1];
        const v2 = bytecode[addr2];
        const result = v1 + v2;
        bytecode[addr_out] = result;
        }
        break;
      case 2: {
        const addr1 = bytecode[pc + 1];
        const addr2 = bytecode[pc + 2];
        const addr_out = bytecode[pc + 3];
        const v1 = bytecode[addr1];
        const v2 = bytecode[addr2];
        const result = v1 * v2;
        bytecode[addr_out] = result;
        }
        break;
      case 99: break program;
      default: console.log('invalid opcode', opcode);
    }
    pc += 4;
  }
}

function fixupAndRun(noun, verb) {
  let program_input = JSON.parse(`[${program_stream}]`);
  program_input[1] = noun;
  program_input[2] = verb;
  executeBytecode(program_input);
  return program_input[0];
}

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const result = fixupAndRun(noun, verb);
    if (result === 19690720) {
      console.log(`Matching noun = ${noun} verb = ${verb}`);
      console.log(`Answer is ${100 * noun + verb}`);
    }
  }
}


