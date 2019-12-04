const fs = require('fs');

const [wire1, wire2] = fs.readFileSync('./input', "utf8").split('\n').map(line => line.split(','));

console.log('Got input');

path1 = [];
path2 = [];

var x=0;
var y=0;
wire1.forEach(move => {
    const direction = move[0];
    const amount = move.slice(1);

    if (direction === 'U') {
        for (var i=0; i<amount; i++) {
            y--;
            path1.push(x + ',' + y);
        }
    } else if (direction === 'D') {
        for (var i=0; i<amount; i++) {
            y++;
            path1.push(x + ',' + y);
        }
    } else if (direction === 'R') {
        for (var i=0; i<amount; i++) {
            x++;
            path1.push(x + ',' + y);
        }
    } else if (direction === 'L') {
        for (var i=0; i<amount; i++) {
            x--;
            path1.push(x + ',' + y);
        }
    }
});

console.log('Got path1');

x=0;
y=0;
wire2.forEach(move => {
    const direction = move[0];
    const amount = move.slice(1);

    if (direction === 'U') {
        for (var i=0; i<amount; i++) {
            y--;
            path2.push(x + ',' + y);
        }
    } else if (direction === 'D') {
        for (var i=0; i<amount; i++) {
            y++;
            path2.push(x + ',' + y);
        }
    } else if (direction === 'R') {
        for (var i=0; i<amount; i++) {
            x++;
            path2.push(x + ',' + y);
        }
    } else if (direction === 'L') {
        for (var i=0; i<amount; i++) {
            x--;
            path2.push(x + ',' + y);
        }
    }
});

console.log('Got path2');

const unsortedPath1 = path1.slice();
const unsortedPath2 = path2.slice();

path1.sort();
path2.sort();
var i=0;
var j=0;
const intersections = [];

while (i<path1.length && j<path2.length) {
    if (path1[i] === path2[j]) {
        intersections.push(path1[i])
    }

    if (path1[i] <= path2[j]) {
        i++;
    } else {
        j++;
    }
}

console.log('Got intersections');

const stringToDistance = (s) => {
    const d1 = unsortedPath1.indexOf(s) + 1;
    const d2 = unsortedPath2.indexOf(s) + 1;

    return d1 + d2;
}

const distances = intersections.map(intersection => {
    const distance = stringToDistance(intersection);
    console.log(intersection, distance);
    return distance;
});

console.log('Got distances');

const result = Math.min(...distances);

console.log('result', result);

