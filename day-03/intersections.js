// https://adventofcode.com/2019/day/3

const fs = require('fs');
const wires = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

const xs = [];
const ys = [];

function moveWire(x, y, dx, dy, distance) {
  const intersections = [];
  for (let i = 0; i < distance; i++) {
    x += dx;
    y += dy;
    if (xs[x] === 1 && ys[y] === 1) {
      intersections.push([x, y]);
    }
    xs[x] = 1;
    ys[y] = 1;
  }
  return intersections;
}

function runWire(wire) {
  let d = '';
  let x = 50000;
  let y = 50000;
  d += 'M50000 50000';
  xs[x] = 1;
  ys[y] = 1;
  const intersections = [];
  wire = wire.split(',');
  for (const instr of wire) {
    const dir = instr[0];
    const delta = parseInt(instr.substring(1));
    if (dir === 'U') {
      intersections.push(...moveWire(x, y, 0, -1, delta));
      y -= delta;
      d += `v${-delta}`;
    } else if (dir === 'D') {
      intersections.push(...moveWire(x, y, 0, 1, delta));
      y += delta;
      d += `v${delta}`;
    } else if (dir === 'L') {
      intersections.push(...moveWire(x, y, -1, 0, delta));
      x -= delta;
      d += `h${-delta}`;
    } else if (dir === 'R') {
      intersections.push(...moveWire(x, y, 1, 0, delta));
      x += delta;
      d += `h${delta}`;
    }
    console.assert(x >= 0 && y >= 0);
  }
  console.log(intersections);
  return d;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100000 100000" width="500" height="500">\n`;
for (let i = 0; i < wires.length; i++) {
  const wire = wires[i];
  const color = i === 0 ? 'red' : 'blue';
  const d = runWire(wire);
  svg += `  <path d="${d}" fill="none" stroke="${color}" stroke-width="10"/>\n`;
}
svg += `</svg>\n`;
fs.writeFileSync('out.svg', svg);
