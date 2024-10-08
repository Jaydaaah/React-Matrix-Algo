function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function getFraction(decimal) {
    const precision = 1e-10; // Precision threshold
    let denominator = 1;
    let numerator = Math.round(decimal * denominator);

    // Continue until we find a denominator that gives a valid numerator
    while (Math.abs(decimal - numerator / denominator) > precision) {
        denominator++;
        numerator = Math.round(decimal * denominator);
    }

    // Simplify the fraction
    const divisor = gcd(numerator, denominator);
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor,
    };
}

function convertFraction(numerator, denominator) {
    if (denominator === 0) {
        return "Error: Denominator cannot be zero.";
    }

    // Determine if the fraction is improper
    const isImproper = Math.abs(numerator) >= Math.abs(denominator);

    if (isImproper) {
        // Mixed fraction
        const wholeNumber = Math.floor(numerator / denominator);
        const newNumerator = Math.abs(numerator % denominator);
        const sign = numerator < 0 ? "-" : "";

        // Render using MathJax
        return `${sign}${wholeNumber} \\frac{${newNumerator}}{${Math.abs(
            denominator
        )}}`;
    } else {
        // Proper fraction
        // Render using MathJax
        return `\\frac{${numerator}}{${denominator}}`;
    }
}

/**
 *
 * @param {number} n
 * @returns {string} Mathjax format
 */
export function handFrac(n) {
    const { numerator, denominator } = getFraction(n);
    if (denominator == 1) {
        return `${n}`;
    } else if (denominator != 0) {
        return convertFraction(numerator, denominator);
    } else {
        `0`;
    }
}
