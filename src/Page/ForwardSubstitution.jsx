import React from "react";
import { MathJax } from "better-react-mathjax";
import { useConstant, useLower, useZ } from "../Context/MatrixContext";
import Card from "../Components/Card";
import { handFrac } from "../Algo/DecToFrac";
import { generateMatrixString } from "../Algo/StringGenerate";

export default function ForwardSubstitution() {
    const { lower } = useLower();
    const { constant } = useConstant();
    const { Z } = useZ();

    return (
        <Card>
            <h1 className="text-[1.02em] font-bold">
                Step 3: Solving LZ = constant using Forward Substitution
            </h1>
            Now, the vector 𝑍 is defined as:
            <br />
            <div className="flex items-center justify-center">
                <span>Z =</span>
                <MathJax>{`\\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix}`}</MathJax>
            </div>
            <br />
            The equation LZ = constant is set up:
            <br />
            <div className="flex items-center justify-center">
                <span>L =</span>
                <MathJax>{generateMatrixString(lower)}</MathJax>
                <span>, C =</span>
                <MathJax>{`\\begin{bmatrix} ${handFrac(
                    constant[0]
                )} \\\\ ${handFrac(constant[1])} \\\\ ${handFrac(
                    constant[2]
                )} \\end{bmatrix}`}</MathJax>
            </div>
            <br />
            Thus, this gives the system of equations:
            <br />
            <div className="ml-6">
                <MathJax>
                    {`\\begin{align*}
                    z_1 & = \\frac{${constant[0]}}{${lower[0][0]}} \\\\
                    z_2 & = \\frac{${constant[1]} - ${lower[1][0]} \\cdot z_1}{${lower[1][1]}} \\\\
                    z_3 & = \\frac{${constant[2]} - ${lower[2][0]} \\cdot z_1 - ${lower[2][1]} \\cdot z_2}{${lower[2][2]}} 
                    \\end{align*}`}
                </MathJax>
            </div>
            <br />
            Therefore, the solution for 𝑍 is:
            <div className="flex items-center justify-center">
                <span>Z =</span>
                <MathJax>{`\\begin{bmatrix} ${handFrac(Z[0])} \\\\ ${handFrac(
                    Z[1]
                )} \\\\ ${handFrac(Z[2])} \\end{bmatrix}`}</MathJax>
            </div>
        </Card>
    );
}
