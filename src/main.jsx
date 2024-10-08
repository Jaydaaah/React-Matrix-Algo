import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.tw.css";
import MatrixProvider from "./Context/MatrixContext.jsx";
import { MathJaxContext } from "better-react-mathjax";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MathJaxContext>
            <MatrixProvider>
                <App />
            </MatrixProvider>
        </MathJaxContext>
    </StrictMode>
);
