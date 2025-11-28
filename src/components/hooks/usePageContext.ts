import { useContext } from "react";
import { ProductContext } from "../context/ProductContext"
import type { ContextKeys, ProductFilters, ProductList, ContextPageType } from "../../types";


export function usePageContext(contextType: 'products'): ContextPageType<ProductList, ProductFilters>;
export function usePageContext(contextType: ContextKeys) {
    if (contextType === 'products') {
        const context = useContext(ProductContext);
        if (!context) throw new Error("usePageContext debe ser usado dentro de un Provider");
        return context;
    }



    throw new Error("usePageContext: contextType inválido");
}