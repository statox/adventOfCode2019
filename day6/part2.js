const fs = require('fs');
const readlineSync = require('readline-sync');

const map = fs.readFileSync('./input', "utf8").split('\n').map(s => s.split(')'));

const orbits = {};

for (var i=0; i<map.length-1; i++) {
    const [orbitee, orbiter] = map[i];
    if (!orbits[orbitee]) {
        orbits[orbitee] = new Set();
    }
    if (!orbits[orbiter]) {
        orbits[orbiter] = new Set();
    }

    orbits[orbitee].add(orbiter);
    orbits[orbiter].add(orbitee);
}

console.log(orbits);

const pile = [{ name: 'YOU', depth: 0 }];
const visited = new Set();
var result;

while (pile.length) {
    const current = pile.pop();
    visited.add(current.name);

    // console.log(current);
    // console.log(orbits[current.name]);

    if (orbits[current.name]) {
        orbits[current.name].forEach(o => {
            if (o === 'SAN') {
                result = current.depth - 1;
            }

            if (!visited.has(o)) {
                pile.push({name: o, depth: current.depth+1});
            }
        });
    }
}

console.log('result', result);
