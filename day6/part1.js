const fs = require('fs');
const readlineSync = require('readline-sync');

const map = fs.readFileSync('./input', "utf8").split('\n').map(s => s.split(')'));

const orbits = {};

for (var i=0; i<map.length-1; i++) {
    const [orbitee, orbiter] = map[i];
    if (!orbits[orbitee]) {
        orbits[orbitee] = [];
    }

    orbits[orbitee].push(orbiter);
}

console.log(orbits);

const pile = [{ name: 'COM', depth: 0 }];
var cpt = 0;

while (pile.length) {
    const current = pile.pop();
    cpt += current.depth;

    console.log(current);
    console.log(orbits[current.name]);

    if (orbits[current.name]) {
        orbits[current.name].forEach(o => {
            pile.push({name: o, depth: current.depth+1});
        });
    }
}

console.log('result', cpt);
