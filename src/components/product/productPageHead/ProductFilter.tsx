import { useState } from "react"
import { usePageContext } from "../../hooks/usePageContext"
import type { ProductFilters, ProductSorting } from "../../../types"

export default function ProductFilter() {
    const { onSetFilters, filters, } = usePageContext('products')

    const [showFilters, setShowFilters] = useState(false)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [isAvailable, setIsAvailable] = useState("")
    const [sorting, setSorting] = useState<keyof ProductSorting>("noSort")

    const onChangeFilters = () => {
        let sortingValue: Pick<ProductFilters, 'sortBy' | 'sortDir'> = {
            sortBy: null,
            sortDir: null
        }

        if(sorting.startsWith("name")) {
            sortingValue.sortBy = 'name'
            if(sorting.endsWith("Asc")) sortingValue.sortDir = 'asc'
            else sortingValue.sortDir = 'desc'
        }

        if(sorting.startsWith("price")) {
            sortingValue.sortBy = 'price'
            if(sorting.endsWith("Asc")) sortingValue.sortDir = 'asc'
            else sortingValue.sortDir = 'desc'
        }

        onSetFilters({
            isAvailable: !isAvailable ? null : isAvailable === "true" ? true : false,
            maxPrice: !maxPrice ? null : +maxPrice,
            minPrice: !minPrice ? null : +minPrice,
            ...sortingValue
        })
    }

    const onResetFilters = () => {
        setMinPrice("")
        setMaxPrice("")
        setIsAvailable("")
        setSorting("noSort")
        onSetFilters({
            isAvailable: null,
            maxPrice: null,
            minPrice: null,
            sortBy: null,
            sortDir: null
        })
    }

    const onShowFilters = () => setShowFilters(showFilters => !showFilters)
    
    return (
        <div >
            <button
                className="mt-5 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 hover:transition hover:scale-95"
                onClick={onShowFilters}
            >
            {showFilters ? "Ocultar filtros" : "Mostrar Filtros"}
            </button>
            <div
             className={(showFilters ? "opacity-100 translate-y-0 " : "invisible opacity-0 h-0 -translate-y-1.5 ") + "transition duration-300"}
            >
                <div
                    className="flex gap-4 mt-4 items-center"
                >
                    <label
                        htmlFor="minPrice"
                        className="min-w-28"
                    >
                        Precio minimo:
                    </label>
                    <input
                        className="bg-white py-2 px-4 shadow rounded"
                        type="number"
                        step={0.1}
                        name="minPrice"
                        id="minPrice"
                        min={0}
                        placeholder="Ej: 100"

                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>

                <div
                    className="flex gap-4 mt-4 items-center"
                >
                    <label
                        htmlFor="maxPrice"
                        className="min-w-28"
                    >
                        Precio maximo:
                    </label>
                    <input
                        className="bg-white py-2 px-4 shadow rounded"
                        type="number"
                        step={0.1}
                        name="maxPrice"
                        id="maxPrice"
                        min={0}
                        placeholder="Ej: 900"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}

                    />
                </div>

                <div
                    className="flex gap-4 mt-4 items-center"
                >
                    <label
                        htmlFor="isAvailable"
                        className="min-w-28"
                    >
                        Disponible:
                    </label>

                    <select
                        name="isAvailable"
                        id="isAvailable"
                        className="bg-white py-2 shadow rounded"
                        value={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.value)}
                    >
                        <option value="" > -- </option>
                        <option value="true"> Si </option>
                        <option value="false" > No </option>
                    </select>
                </div>

                
                <div
                    className="flex gap-4 mt-4 items-center"
                >
                    <label
                        htmlFor="sorting"
                        className="min-w-28"
                    >
                        Ordenar por:
                    </label>

                    <select
                        name="sorting"
                        id="sorting"
                        className="bg-white py-2 shadow rounded"
                        value={sorting}
                        onChange={(e) => setSorting(e.target.value as keyof ProductSorting)}
                    >
                        <option value="NoSort" > -- </option>
                        <option value="priceAsc"> Precio: Menor a Mayor </option>
                        <option value="priceDesc"> Precio: Mayor a Menor </option>
                        <option value="nameAsc"> Nombre: Menor a Mayor </option>
                        <option value="nameDesc"> Nombre: Mayor a Menor </option>
                    </select>
                </div>


                <div className="flex gap-4">
                    <button
                        className="mt-5 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 hover:transition hover:scale-95"
                        onClick={onChangeFilters}

                    >
                        Aplicar filtros
                    </button>


                    <button
                        className="mt-5 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 hover:transition hover:scale-95"
                        onClick={onResetFilters}
                    >
                        Reset filtros
                    </button>
                </div>
            </div>

        </div>
    )
}