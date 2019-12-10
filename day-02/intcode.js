// https://adventofcode.com/2019/day/2

const fs = require('fs');
let program_input = fs.readFileSync('input.txt', 'utf-8');
program_input = program_input.trim();
program_input = program_input.split('\n').join(',');
program_input = JSON.parse(`[${program_input}]`);
// Fixup the code according to the instructions;
program_input[1] = 12;
program_input[2] = 2;

const program_0 = [1,9,10,3,2,3,11,0,99,30,40,50];
const program_1 = [1, 0, 0, 0, 99];
const program_2 = [2,3,0,3,99];
const program_3 = [2,4,4,5,99,0];
const program_4 = [1,1,1,4,99,5,6,0,99];

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
      case 99: console.log('BREAK'); break program;
      default: console.log('invalid opcode', opcode);
    }
    pc += 4;
  }
}

const program = program_input;
executeBytecode(program);
console.log(program);
