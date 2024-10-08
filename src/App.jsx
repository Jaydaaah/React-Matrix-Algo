import { useMemo, useState } from "react";
import Button from "./Components/Button";
import InputPage from "./Page/InputPage";
import {
    default1D,
    default2D,
    useConstant,
    useError,
    useMatrix,
} from "./Context/MatrixContext";
import LUShow from "./Page/LUShow";
import ForwardSubstitution from "./Page/ForwardSubstitution";
import BackgroundSubstitution from "./Page/BackwardSubstiution";
import { AnimatePresence } from "framer-motion";
import Card from "./Components/Card";
import WelcomePage from "./Page/WelcomePage";

function App() {
    const [screen, setScreen] = useState(-1);
    const { matrix } = useMatrix();
    const { constant } = useConstant();
    const { error } = useError();

    const disableSolveBTN = useMemo(() => {
        return (
            !!error ||
            !(
                matrix.every((value) => value.some((value) => value != 0)) &&
                constant.some((value) => value != 0)
            )
        );
    }, [matrix, constant, error]);

    return (
        <div className="max-w-5xl w-full h-screen bg-inherit flex flex-col p-4 sm:p-12">
            {screen == -1 && <WelcomePage onClick={() => setScreen(0)}/>}

            <div className="h-full w-full flex flex-col relative justify-center">
                <AnimatePresence>
                    {screen == 0 && <InputPage key={`screen-0`} />}
                    {screen == 1 && <LUShow key={`screen-1`} />}
                    {screen == 2 && <ForwardSubstitution key={`screen-2`} />}
                    {screen == 3 && <BackgroundSubstitution key={`screen-3`} />}
                </AnimatePresence>
            </div>
            <div className="flex justify-center m-4 mt-10">
                {screen == 0 ? (
                    <div className="flex flex-col items-center">
                        <label className="text-red-400">{error}</label>
                        <Button
                            disabled={disableSolveBTN}
                            onClick={() => setScreen(1)}
                        >
                            Next
                        </Button>
                    </div>
                ) : (
                    <>
                        {screen < 3 ? (
                            <Button
                                onClick={() => setScreen((prev) => prev + 1)}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button onClick={() => setScreen(0)}>Reset</Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
