/**
 * 
 * @param {Array<Array<number>>} upper 
 * @param {Array<number>} Z 
 * @returns {Array<number>}}
 */
export function backwardSubstitution(upper, Z) {
    // Get the size of the system (number of rows)
    const n = Z.length;
    const X = new Array(n).fill(0); // Initialize X with zeroes

    // Perform backward substitution
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;

        // Summation of upper(i,j) * X(j) for j > i
        for (let j = i + 1; j < n; j++) {
            sum += upper[i][j] * X[j];
        }

        // Calculate X[i] (upper[i][i] * X[i] = Z[i] - sum)
        if (upper[i][i] === 0) {
            throw new Error("Zero encountered on diagonal, cannot solve system.");
        }

        X[i] = (Z[i] - sum) / upper[i][i];
    }

    return X; // Return the solution vector X
}