import { useRef } from "react"

type SearchBarProps = {
    onSearch: (search: string) => void
}

export default function SearchBar({
    onSearch
}: SearchBarProps) {

    const refInput = useRef<HTMLInputElement>(null);



    return (
        <section className="container mx-auto flex justify-center gap-4 mt-5">
            <input 
                className="bg-white py-2 px-4 rounded-2xl shadow"
                type="text" 
                name="" 
                id="" 
                placeholder="Ej: Audifonos" 
                ref={refInput}
            />

            <button
                className="font-bold py-2 px-8 text-white bg-blue-500 rounded-xl hover:cursor-pointer hover:bg-blue-600 hover:transition"
                onClick={() => onSearch(refInput.current?.value || "")}
            >
                Buscar
            </button>
        </section>
    )
}