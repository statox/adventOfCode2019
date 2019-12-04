// range 248345-746315

const range = [248345, 746315];

// There is probably a much cleaner solution
const isValidPassword = (p) => {
    if (typeof p !== 'string') {
        p = String(p);
    }
    var hasDoubleDigit = false;
    const digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    digits[p[0]] += 1;
    for (var i=1; i<6; i++) {
        if (p[i] < p[i-1]) {
            return false;
        } else if (p[i] === p[i-1]) {
            hasDoubleDigit = true;
        }

        digits[p[i]] += 1;
    }

    if (!hasDoubleDigit) {
        return false;
    }

    return digits.filter(i => i === 2).length > 0;
};

const possiblePasswords = [];
for (var i=range[0]; i<=range[1]; i++) {
    if (isValidPassword(i)) {
        possiblePasswords.push(i);
    }
}

console.log('result ', possiblePasswords.length); // 660
