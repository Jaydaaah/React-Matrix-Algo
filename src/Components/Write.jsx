import TypewriterComponent from "typewriter-effect";


/**
 * A simple writer to speed up things
 * @typedef {Object} Props 
 * @property {number} [speed]
 * @property {string} children
 * @property {number} [delay_start]
 * @property {React.Dispatch<React.SetStateAction<boolean>>} [setDone]
 * 
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function Write({speed = 30, children, delay_start, setDone}) {
    return (
        <TypewriterComponent
            options={{
                cursor: ""
            }}
            onInit={(typewriter) => {
                typewriter
                    .changeDelay(speed)
                    .pauseFor(delay_start * 1000)
                    .typeString(children)
                    .callFunction((state) => {
                        if (setDone) {
                            setDone(true);
                        }
                    })
                    .start();
            }}
        />
    );
}
