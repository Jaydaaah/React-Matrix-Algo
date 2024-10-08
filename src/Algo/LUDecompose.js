// Javascript Program to decompose a matrix
// into lower and upper triangular matrix
// function MAX = 100;
var s = "";

/**
 * 
 * @param {Array<Array<number>>} mat 
 * @param {number} [n]
 * @returns {[Array<Array<number>>, Array<Array<number>>]}
 */
export function luDecomposition(mat, n = 3) {
    // Check if the matrix is square
    if (mat.length !== n || mat.some(row => row.length !== n)) {
        throw new Error("The matrix must be square (n x n).");
    }
    
    var lower = Array(n)
        .fill(0)
        .map((x) => Array(n).fill(0));
    var upper = Array(n)
        .fill(0)
        .map((x) => Array(n).fill(0));

    // Decomposing matrix into Upper and
    // Lower triangular matrix
    for (var i = 0; i < n; i++) {
        // Upper Triangular
        for (var k = i; k < n; k++) {
            // Summation of L(i, j) * U(j, k)
            var sum = 0;
            for (var j = 0; j < i; j++) sum += lower[i][j] * upper[j][k];

            // Evaluating U(i, k)
            upper[i][k] = mat[i][k] - sum;
        }

        // Lower Triangular
        for (var k = i; k < n; k++) {
            if (i == k)
                // Diagonal as 1
                lower[i][i] = 1;
            else {
                // Summation of L(k, j) * U(j, i)
                var sum = 0;
                for (var j = 0; j < i; j++) sum += lower[k][j] * upper[j][i];

                // Check for division by zero
                if (upper[i][i] === 0) {
                    throw new Error(
                        `Division by zero encountered at upper[${i}][${i}].`
                    );
                }

                // Evaluating L(k, i)
                lower[k][i] = parseInt((mat[k][i] - sum) / upper[i][i]);
            }
        }
    }
    return [lower, upper];
}