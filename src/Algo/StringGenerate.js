import { handFrac } from "./DecToFrac";

/**
 * Converts a 2D array matrix into a MathJax string format.
 * @param {Array<Array<number>>} matrix - The matrix to be converted.
 * @returns {string} - The MathJax formatted string.
 */
export const convertMatrixToMathJax = (matrix) => {
    const rows = matrix
        .map((row) => row.map((value) => handFrac(value)).join(" & "))
        .join(" \\\\ ");
    return `\\begin{bmatrix} ${rows} \\end{bmatrix}`;
};

/**
 * Converts a 3x1 constant vector into a MathJax string format.
 * @param {Array<number>} vector - The constant vector to be converted.
 * @returns {string} - The MathJax formatted string.
 */
export const convertConstantToMathJax = (vector) => {
    if (vector.length !== 3) {
        throw new Error("Vector must be of length 3.");
    }
    vector = vector.map((value) => handFrac(value));
    const elements = vector.join(" \\\\ ");
    return `\\begin{bmatrix} ${elements} \\end{bmatrix}`;
};

/**
 * Converts coefficients and a constant term into a MathJax equation string.
 * @param {Array<number>} coefficients - The coefficients of the variables.
 * @param {number} constant - The constant term.
 * @returns {string} - The MathJax formatted equation string.
 */
export const convertToMathJaxEquation = (coefficients, constant) => {
    const variables = coefficients
        .map((coef, index) => {
            if (coef == 0) {
                coef = "";
            }
            const variable = `x_${index + 1}`; // Create variable names like x_1, x_2, ...
            return `${
                coef != 0
                    ? (coef > 0 ? "+" : "") + (coef != 1 ? coef : "") + variable
                    : ""
            }`;
        })
        .join(" ");

    // Remove leading '+' sign if it exists
    const formattedEquation = variables.replace(/^\+/, "") + ` = ${constant}`;
    return `\\begin{equation} ${formattedEquation} \\end{equation}`;
};

/**
 * Function to generate a string representation of the upper matrix for MathJax rendering
 * @param {Array<Array<number>>} matrix
 * @returns
 */
export function generateMatrixString(matrix) {
    const matrixString = matrix
        .map((row) => row.map((value) => handFrac(value)).join(" & "))
        .join(" \\\\\n");
    return `\\begin{bmatrix} ${matrixString} \\end{bmatrix}`;
}


export function generateEquation(lower0, constant0) {
    // Generate the MathJax formatted equation
    const equation = `z = \\frac{${constant0} - ${lower0} \\cdot z}{1} \\quad \\text{(Substituting for } z)`;
    return equation;
}