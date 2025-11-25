import { useContext } from "react";
import { ProductContext } from "../product/context/ProductContext";
import type { ContextKeys } from "../../types";



export function usePageContext(contextType: ContextKeys) {
    let context = null;
    if (contextType == 'products') {
        context = useContext(ProductContext)
    }

    if (!context) throw new Error("usePageContext deber ser usado dentro un Provider");
    return context;
}