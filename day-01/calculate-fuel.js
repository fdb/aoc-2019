// https://adventofcode.com/2019/day/1

const fs = require('fs');

function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

console.log(calculateFuel(12));
console.log(calculateFuel(14));
console.log(calculateFuel(1969));
console.log(calculateFuel(100756));

let masses = fs.readFileSync('input.txt', 'utf-8').trim();
masses = masses.split('\n').map(line => parseInt(line));

let sum = 0;
for (const mass of masses) {
  sum += calculateFuel(mass);
  console.log(mass, calculateFuel(mass), sum);
}

console.log('Total fuel:', sum);

