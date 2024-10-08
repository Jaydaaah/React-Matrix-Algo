import Button from "../Components/Button";
import Card from "../Components/Card";

/**
 *
 * @param {Object} param
 * @param {Function} param.onClick
 * @returns
 */
export default function WelcomePage({ onClick = () => {} }) {
    return (
        <div className="bg-inherit top-0 left-0 z-10 fixed w-screen h-screen flex flex-col justify-center items-center">
            <span className="text-sm fixed left-5 top-5 opacity-50 scale-75">
                By: JD, Mica, Clarence
            </span>
            <Card className="w-96 flex flex-col items-center justify-between gap-5 h-72">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-7xl font-serif">Welcome</h1>
                    <span className="text-lg font-light">to</span>
                    <h2 className="text-2xl font-light">
                        Matrix Calculator <i className="">v2</i>
                    </h2>
                </div>
                <Button onClick={onClick}>Continue</Button>
            </Card>
        </div>
    );
}
