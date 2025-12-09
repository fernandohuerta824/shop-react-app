import { useContext } from "react";
import { SingleProductContext } from "../context/SingleProductContext";

export function useSingleProductContext() {
    const ctx = useContext(SingleProductContext)

    if(!ctx) {
        throw new Error("El contexto no puede ser usado fuera de un provider")
    }

    return ctx;
}