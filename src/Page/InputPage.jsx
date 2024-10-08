import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../Components/Card";
import {
    default1D,
    default2D,
    useConstant,
    useMatrix,
} from "../Context/MatrixContext";
import { MathJax } from "better-react-mathjax";
import { convertToMathJaxEquation } from "../Algo/StringGenerate";
import Button from "../Components/Button";

function subs(n) {
    return ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"][n];
}

export default function InputPage() {
    const { matrix, setMatrix, resetInput } = useMatrix();
    const { constant, setConstant } = useConstant();

    useEffect(() => {
        resetInput();
    }, []);

    const [inputMatrix, setInputMatrix] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [inputConstant, setInputConstant] = useState(["", "", ""]);

    const handleChange = (row, col, value) => {
        const newMatrix = inputMatrix.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? value : cell))
        );
        setInputMatrix(newMatrix);
    };

    const handleConstantChange = (index, value) => {
        const newConstant = inputConstant.map((c, i) =>
            i === index ? value : c
        );
        setInputConstant(newConstant);
    };

    const handleTextSize = useCallback(() => {}, []);

    const inputReady = useMemo(() => {
        return (
            inputMatrix.every((value) =>
                value.every((value) => !isNaN(value) && value != "")
            ) && inputConstant.every((value) => !isNaN(value) && value != "")
        );
    }, [inputMatrix, inputConstant]);

    const updateMatrix = useCallback(() => {
        if (inputReady) {
            const matrixNum = inputMatrix.map((row) =>
                row.map((value) => Number(value))
            );
            const constantNum = inputConstant.map((value) => Number(value));

            setMatrix(matrixNum);
            setConstant(constantNum);
        }
    }, [setMatrix, setConstant, inputMatrix, inputConstant, inputReady]);

    const resetMatrix = useCallback(() => {
        resetInput();
        setInputMatrix([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        setInputConstant(["", "", ""]);
    }, [resetInput]);

    return (
        <Card className="w-full h-full flex flex-col items-center gap-10">
            <label className="text-2xl">Enter your Matrix Equation:</label>
            <div className="flex gap-5 sm:gap-8 lg:gap-10 items-center justify-center overflow-y-auto lg:overflow-y-visible w-[80vw] md:w-full">
                <div className="grid grid-cols-3 gap-2.5 justify-center">
                    {inputMatrix.map((row, i) =>
                        row.map((value, j) => (
                            <div
                                key={`div-${i}-${j}`}
                                className="flex justify-center"
                            >
                                <input
                                    className="p-2 lg:text-5xl border border-gray-300 rounded text-center text-black w-14 sm:w-24 lg:w-48"
                                    key={`X-${i}-${j}`}
                                    type="number"
                                    value={value || ""}
                                    onChange={(e) =>
                                        handleChange(i, j, e.target.value)
                                    }
                                    placeholder={`x${subs(i + 1)}${subs(
                                        j + 1
                                    )}`}
                                />
                            </div>
                        ))
                    )}
                </div>
                <label className="text-2xl sm:text-4xl lg:text-5xl">=</label>
                <div className="grid grid-cols-1 gap-2.5">
                    {inputConstant.map((value, i) => (
                        <input
                            key={`C-${i}`}
                            type="number"
                            value={value || ""}
                            onChange={(e) =>
                                handleConstantChange(i, e.target.value)
                            }
                            placeholder={`c${subs(i + 1)}`}
                            className="p-2 lg:text-5xl border border-gray-300 rounded text-center text-black w-14 sm:w-24 lg:w-48"
                        />
                    ))}
                </div>
            </div>
            <div className="flex gap-2 justify-between">
                <Button
                    className="bg-gray-200 text-blue-700"
                    onClick={resetMatrix}
                >
                    Reset
                </Button>
                <Button onClick={updateMatrix} disabled={!inputReady}>
                    Solve
                </Button>
            </div>
            <hr className="bg-white h-[1px] w-full" />
            {matrix.every((value) => value.some((value) => value != 0)) &&
                constant.some((value) => value != 0) && (
                    <div className="flex flex-col items-start text-2xl">
                        <label>Here's your equation:</label>
                        {constant.map((c, index) => (
                            <MathJax key={`math-jax-${index}`}>
                                {convertToMathJaxEquation(matrix[index], c)}
                            </MathJax>
                        ))}
                    </div>
                )}
        </Card>
    );
}
