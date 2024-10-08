const getFraction = (decimal) => {
    for (var denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
    return { numerator: decimal * denominator, denominator: denominator };
};

const fraction = 1/3;
const frac = getFraction(fraction);
console.log(frac);
