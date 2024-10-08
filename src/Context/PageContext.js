import { createContext, useContext, useState } from "react";

const PageContext = createContext();
const SetPageContext = createContext();

/**
 * 
 * @param param
 * @param {React.ReactNode} param.children
 * @returns 
 */
export default function PageProvider({children}) {
    const [page, setPage] = useState(0);

    return <PageContext.Provider value={page}>
        <SetPageContext.Provider value={setPage}>
            {children}
        </SetPageContext.Provider>
    </PageContext.Provider>
}

export function usePage() {
    const page = useContext(PageContext);
    const setPage = useContext(SetPageContext);

    if (!page && !setPage) {
        throw new Error("PageProvider not found in ancestral tree");
    }

    return {page, setPage};
}