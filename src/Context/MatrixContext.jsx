import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { luDecomposition } from "../Algo/LUDecompose";
import { forwardSubstitution } from "../Algo/ForwardSubstitution";
import { backwardSubstitution } from "../Algo/BackgroundSubstitution";

// [[0, 0 , 0], [0, 0 , 0], [0, 0 , 0]]
const MatrixContext = createContext();
const SetMatrixContext = createContext();

// [0, 0, 0]
const ConstantContext = createContext();
const SetConstantContext = createContext();

// [[0, 0 , 0], [0, 0 , 0], [0, 0 , 0]]
const LowerContext = createContext();
const SetLowerContext = createContext();

// [[0, 0 , 0], [0, 0 , 0], [0, 0 , 0]]
const UpperContext = createContext();
const SetUpperContext = createContext();

// [0, 0, 0]
const ZContext = createContext();
const setZContext = createContext();

// [0, 0, 0]
const XContext = createContext();
const setXContext = createContext();

const ResetFuncContext = createContext();

const ErrorContext = createContext();

export const default2D = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

export const default1D = [0, 0, 0];

/**
 * @param {Object} param
 * @param {React.ReactNode} param.children
 * @returns {JSX.Element}
 */
export default function MatrixProvider({ children }) {
    const [matrix, setMatrix] = useState(default2D);
    const [constant, setConstant] = useState(default1D);
    const [lower, setLower] = useState(default2D);
    const [upper, setUpper] = useState(default2D);
    const [Z, setZ] = useState(default1D);
    const [X, setX] = useState(default1D);
    const [error, setError] = useState("");

    useEffect(() => {
        if (error != "") {
            setError("");
        }
    }, [matrix, constant, lower, upper, Z, X]);

    useEffect(() => {
        if (matrix != default2D && constant != default1D) {
            try {
                const [l, u] = luDecomposition(matrix);
                setLower(l);
                setUpper(u);
                
            } catch (err) {
                setError(err.message);
            }
        } else {
            setLower(default2D);
            setUpper(default2D);
        }
    }, [matrix, constant]);

    useEffect(() => {
        if (constant != default1D && lower != default2D) {
            try {
                const forward = forwardSubstitution(lower, constant);
                setZ(forward);
                
            } catch (err) {
                setError(err.message);
            }
        } else {
            setZ(default1D);
        }
    }, [lower, constant]);

    useEffect(() => {
        if (Z != default1D && upper != default2D) {
            try {
                const back = backwardSubstitution(upper, Z);
                setX(back);
                
            } catch (err) {
                setError(err.message);
            }
        } else {
            setX(default1D);
        }
    }, [upper, Z]);

    const resetInput = useCallback(() => {
        setMatrix(default2D);
        setConstant(default1D);
        
    }, []);

    return (
        <MatrixContext.Provider value={matrix}>
            <SetMatrixContext.Provider value={setMatrix}>
                <ConstantContext.Provider value={constant}>
                    <SetConstantContext.Provider value={setConstant}>
                        <LowerContext.Provider value={lower}>
                            <SetLowerContext.Provider value={setLower}>
                                <UpperContext.Provider value={upper}>
                                    <SetUpperContext.Provider value={setUpper}>
                                        <ZContext.Provider value={Z}>
                                            <setZContext.Provider value={setZ}>
                                                <XContext.Provider value={X}>
                                                    <setXContext.Provider
                                                        value={setX}
                                                    >
                                                        <ResetFuncContext.Provider
                                                            value={resetInput}
                                                        >
                                                            <ErrorContext.Provider value={error}>
                                                                {children}
                                                            </ErrorContext.Provider>
                                                        </ResetFuncContext.Provider>
                                                    </setXContext.Provider>
                                                </XContext.Provider>
                                            </setZContext.Provider>
                                        </ZContext.Provider>
                                    </SetUpperContext.Provider>
                                </UpperContext.Provider>
                            </SetLowerContext.Provider>
                        </LowerContext.Provider>
                    </SetConstantContext.Provider>
                </ConstantContext.Provider>
            </SetMatrixContext.Provider>
        </MatrixContext.Provider>
    );
}

/**
 * Hook to display error
 * @returns {{error: string}}
 */
export function useError() {
    const error = useContext(ErrorContext);
    return {error};
}

/**
 * Hook to access and update the matrix state.
 * @returns {{ matrix: Array<Array<number>>, setMatrix: React.Dispatch<React.SetStateAction<Array<Array<number>>>>, resetInput: Function }} The current matrix and a function to update it.
 */
export function useMatrix() {
    const matrix = useContext(MatrixContext);
    const setMatrix = useContext(SetMatrixContext);
    const resetInput = useContext(ResetFuncContext);

    return { matrix, setMatrix, resetInput };
}

/**
 * Hook to access and update the constant value.
 * @returns {{ constant: Array<number>, setConstant: React.Dispatch<React.SetStateAction<Array<number>>> }} The current constant and a function to update it.
 */
export function useConstant() {
    const constant = useContext(ConstantContext);
    const setConstant = useContext(SetConstantContext);
    return { constant, setConstant };
}

/**
 * Hook to access and update the lower matrix state.
 * @returns {{ lower: Array<Array<number>>, setLower: React.Dispatch<React.SetStateAction<Array<Array<number>>>> }} The current lower matrix and a function to update it.
 */
export function useLower() {
    const lower = useContext(LowerContext);
    const setLower = useContext(SetLowerContext);
    return { lower, setLower };
}

/**
 * Hook to access and update the upper matrix state.
 * @returns {{ upper: Array<Array<number>>, setUpper: React.Dispatch<React.SetStateAction<Array<Array<number>>>> }} The current upper matrix and a function to update it.
 */
export function useUpper() {
    const upper = useContext(UpperContext);
    const setUpper = useContext(SetUpperContext);
    return { upper, setUpper };
}

/**
 * Hook to access and update the Z value.
 * @returns {{ Z: Array<number>, setZ: React.Dispatch<React.SetStateAction<Array<number>>> }} The current Z value and a function to update it.
 */
export function useZ() {
    const Z = useContext(ZContext);
    const setZ = useContext(setZContext);
    return { Z, setZ };
}

/**
 * Hook to access and update the X value.
 * @returns {{ X: Array<number>, setX: React.Dispatch<React.SetStateAction<Array<number>>> }} The current X value and a function to update it.
 */
export function useX() {
    const X = useContext(XContext);
    const setX = useContext(setXContext);
    return { X, setX };
}
