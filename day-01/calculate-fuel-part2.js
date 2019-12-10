// https://adventofcode.com/2019/day/1

const fs = require('fs');

function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function calculateCompoundingFuel(mass) {
  let totalFuel = 0;
  let additionalFuel = calculateFuel(mass);
  console.log('  initial fuel:', additionalFuel);
  totalFuel += additionalFuel;
  additionalFuel = calculateFuel(additionalFuel);
  while (additionalFuel >= 0) {
    console.log('  additional fuel:', additionalFuel);
    totalFuel += additionalFuel;
    additionalFuel = calculateFuel(additionalFuel);
  }
  return totalFuel;
}

console.log(calculateCompoundingFuel(14));
console.log(calculateCompoundingFuel(1969));
console.log(calculateCompoundingFuel(100756));

let masses = fs.readFileSync('input.txt', 'utf-8').trim();
masses = masses.split('\n').map(line => parseInt(line));

let sum = 0;
for (const mass of masses) {
  sum += calculateCompoundingFuel(mass);
  console.log(mass, calculateCompoundingFuel(mass), sum);
}

console.log('Total fuel:', sum);

