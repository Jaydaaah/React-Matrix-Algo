import { MathJax } from "better-react-mathjax";
import { convertMatrixToMathJax } from "../Algo/StringGenerate";
import { useLower, useUpper } from "../Context/MatrixContext";
import Card from "../Components/Card";

export default function LUShow() {
    const { lower } = useLower();
    const { upper } = useUpper();

    return (
        <Card className="flex h-full gap-5 lg:gap-10">
            <div className="w-1/2 flex flex-col justify-center items-center text-xl lg:text-3xl">
                <h1 className="font-semibold">Lower Matrix (L)</h1>
                <span className="text-sm lg:text-lg text-center my-4">
                    The Lower Triangular Matrix (L) is used in LU Decomposition
                    to represent the factors below the diagonal, where all
                    elements above the diagonal are zero. The diagonal elements
                    are always 1.
                </span>
                <div className="font-bold text-2xl lg:text-5xl">
                    <MathJax>{convertMatrixToMathJax(lower)}</MathJax>
                </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center text-xl lg:text-3xl">
                <h1 className="font-semibold">Upper Matrix (U)</h1>
                <span className="text-sm lg:text-lg text-center my-4">
                    The Upper Triangular Matrix (U) contains the factors above
                    the diagonal, where all elements below the diagonal are
                    zero. The LU decomposition expresses a matrix as a product
                    of L and U.
                </span>
                <div className="font-bold text-2xl lg:text-5xl">
                    <MathJax>{convertMatrixToMathJax(upper)}</MathJax>
                </div>
            </div>
        </Card>
    );
}
