import React, { createContext, useMemo, useState } from "react";
import type { ContextPageType, ProductFilters, ProductList, ProductSorting } from "../../types";
import { usePaginatedFetch } from "../hooks/usePaginatedFecth";

export const ProductContext = createContext<ContextPageType<ProductList, ProductFilters> | undefined>(undefined)


export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<ProductFilters>({
        name: null,
        isAvailable: null,
        maxPrice: null,
        minPrice: null,
        sortDir: null,
        sortBy: null
    })

    const onSetFilters = (newFilters: Partial<ProductFilters>) => {
        setFilters((filters) => ({ ...filters, ...newFilters }))
    }

    const pageData = usePaginatedFetch<ProductList, ProductFilters>(
        'http://localhost:8080/api/v1/products',
        filters
    )

    const contextValue = useMemo(() => ({
        pageData,
        filters,
        onSetFilters
    }), [pageData, filters]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}