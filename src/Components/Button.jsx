
/**
 * Button component that renders a styled button element.
 * 
 * @typedef {Object} Props - The props for the Button component.
 * @property {React.ReactNode} children - The content to be displayed inside the button.
 * @property {string} className
 * 
 * 
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement> | Props} props - Any additional button attributes (e.g., onClick, disabled).
 * @returns {JSX.Element} The rendered button component.
 */
export default function Button({ className = "bg-blue-700 text-white", children, ...props }) {
    return (
        <button
            {...props}
            type="button"
            className={`${className} disabled:bg-gray-500 enabled:hover:bg-opacity-90 enabled:focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
        >
            {children}
        </button>
    );
}
