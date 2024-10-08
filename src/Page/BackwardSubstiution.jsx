import React from "react";
import { MathJax } from "better-react-mathjax";
import Card from "../Components/Card";
import { useUpper, useX, useZ } from "../Context/MatrixContext";
import { handFrac } from "../Algo/DecToFrac";
import { generateMatrixString } from "../Algo/StringGenerate";

export default function BackgroundSubstitution() {
    const { upper } = useUpper();
    const { Z } = useZ();
    const { X } = useX();

    return (
        <Card>
            <h1 className="text-[1.02em] font-bold">
                Step 4: Solving UX = Z using Backward Substitution
            </h1>
            Now, the vector 𝑋 is defined as:
            <br />
            <div className="flex items-center justify-center">
                <span>X =</span>
                <MathJax>{`\\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix}`}</MathJax>
            </div>
            <br />
            The equation UX = Z is set up:
            <br />
            <div className="flex items-center justify-center">
                <span>Z =</span>
                <MathJax>{`\\begin{bmatrix} ${handFrac(Z[0])} \\\\ ${handFrac(
                    Z[1]
                )} \\\\ ${handFrac(Z[2])} \\end{bmatrix}`}</MathJax>
            </div>
            <br />
            so, This gives the system of equations:
            <br />
            <div>
                <div className="flex items-center justify-center">
                    <span>Z =</span>
                    <MathJax>{generateMatrixString(upper)}</MathJax>
                    <MathJax>{`\\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix}`}</MathJax>
                    <MathJax>{`\\begin{bmatrix} ${handFrac(
                        Z[0]
                    )} \\\\ ${handFrac(Z[1])} \\\\ ${handFrac(
                        Z[2]
                    )} \\end{bmatrix}`}</MathJax>
                </div>
            </div>
            <br />
            Thus, the system of equations for backward substitution is:
            <br />
            <div>
                <MathJax>
                    {`\\begin{align*}
                    x_3 & = \\frac{${Z[2]}}{${upper[2][2]}} \\\\
                    x_2 & = \\frac{${Z[1]} - ${upper[1][1]} x_3}{${upper[1][1]}} \\\\
                    x_1 & = \\frac{${Z[0]} - ${upper[0][1]} x_2 - ${upper[0]} x_3}{${upper[0][0]}} 
                    \\end{align*}`}
                </MathJax>
            </div>
            <br />
            Thus, the solution for 𝑋 is:
            <br />
            <div className="flex items-center justify-center font-semibold m-10 text-lg">
                <div className="flex items-center justify-center border border-gray-500 rounded-lg p-3 sm:px-10 lg:px-20">
                    <span>X =</span>
                    <MathJax>{`\\begin{bmatrix} ${handFrac(
                        X[0]
                    )} \\\\ ${handFrac(X[1])} \\\\ ${handFrac(
                        X[2]
                    )} \\end{bmatrix}`}</MathJax>
                </div>
            </div>
        </Card>
    );
}
