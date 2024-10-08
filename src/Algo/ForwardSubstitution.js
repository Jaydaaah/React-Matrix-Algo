/**
 * 
 * @param {Array<Array<number>>} lower 
 * @param {Array<number>} constant 
 * @returns {Array<number>}
 */
export function forwardSubstitution(lower, constant) {
    // Get the size of the system (number of rows)
    const n = constant.length;
    const Z = new Array(n).fill(0); // Initialize Z with zeroes

    // Perform forward substitution
    for (let i = 0; i < n; i++) {
        let sum = 0;

        // Summation of lower(i,j) * Z(j) for j < i
        for (let j = 0; j < i; j++) {
            sum += lower[i][j] * Z[j];
        }

        // Calculate Z[i] (lower[i][i] * Z[i] = constant[i] - sum)
        if (lower[i][i] === 0) {
            throw new Error("Zero encountered on diagonal, cannot solve system.");
        }

        Z[i] = (constant[i] - sum) / lower[i][i];
    }

    return Z; // Return the solution vector Z
}
