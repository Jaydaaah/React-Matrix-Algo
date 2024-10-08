import { AnimatePresence, motion } from "framer-motion";

/**
 *
 * @param {Object} param
 * @param {React.ReactNode | React.ReactNode[]} param.children
 * @param {string} param.className
 * @returns {JSX.Element}
 */
export default function Card({ children, className }) {
    return (
        <motion.div
            initial={{
                x: 1000,
                opacity: 0.5,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: -1000,
                opacity: 0.5,
            }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            className={`p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-h-[85vh] overflow-y-auto no-scrollbar absolute w-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
