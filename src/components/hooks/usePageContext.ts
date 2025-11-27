import { useContext } from "react";
import { ProductContext } from "../context/ProductContext"
import type { ContextKeys, ProductFilters, ProductList, ContextPageType, CategoryList } from "../../types";
import { CategoryContext } from "../context/CategoryContext";

export function usePageContext(contextType: 'products'): ContextPageType<ProductList, ProductFilters>;
export function usePageContext(contextType: 'categories'): ContextPageType<CategoryList, {}>;
export function usePageContext(contextType: ContextKeys) {
    if (contextType === 'products') {
        const context = useContext(ProductContext);
        if (!context) throw new Error("usePageContext debe ser usado dentro de un Provider");
        return context;
    }

    if (contextType === 'categories') {
        const context = useContext(CategoryContext);
        if (!context) throw new Error("usePageContext debe ser usado dentro de un Provider");
        return context;
    }

    throw new Error("usePageContext: contextType inválido");
}