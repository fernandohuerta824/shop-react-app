import { createContext, useMemo } from "react";
import type { CategoryList, ContextPageType } from "../../types";
import { usePaginatedFetch } from "../hooks/usePaginatedFecth";

export const CategoryContext = createContext<ContextPageType<CategoryList, {}> | undefined>(undefined)


export function CategoryProvider({ children }: { children: React.ReactNode }) {
    
    const pageData = usePaginatedFetch<CategoryList, {}>(
        'http://localhost:8080/api/v1/categories/tree',
        {}
    )

    const contextValue = useMemo(() => ({
         pageData,
        filters: {},
        onSetFilters: () => {}
    }), [pageData]);

    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    )
}