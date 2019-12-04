// range 248345-746315

const range = [248345, 746315];

const isValidPassword = (p) => {
    if (typeof p !== 'string') {
        p = String(p);
    }
    var hasDoubleDigit = false;

    for (var i=1; i<6; i++) {
        if (p[i] < p[i-1]) {
            return false;
        } else if (p[i] === p[i-1]) {
            hasDoubleDigit = true;
        }
    }

    return hasDoubleDigit;
};

const possiblePasswords = [];
for (var i=range[0]; i<=range[1]; i++) {
    if (isValidPassword(i)) {
        possiblePasswords.push(i);
    }
}

console.log('result ', possiblePasswords.length); // 1019
