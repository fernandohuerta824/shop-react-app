import { useState } from "react"
import type { ProductFilters } from "../../types"

type ProductFilterProps = {
    onSetFilters: (filters: Pick<ProductFilters, 'isAvailable' | 'maxPrice' | 'minPrice'>) => void
}

export default function ProductFilter({
    onSetFilters
}: ProductFilterProps) {

    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [isAvailable, setIsAvailable] = useState("")

    const onChangeFilters = () => {

       
        onSetFilters({
            isAvailable: !isAvailable ? null : isAvailable === "true" ? true : false,
            maxPrice: !maxPrice ? null : +maxPrice,
            minPrice: !minPrice ? null : +minPrice
        })
    }

    const onResetFilters = () => {  
        setMinPrice("")
        setMaxPrice("")
        setIsAvailable("")
        onSetFilters({
            isAvailable: null,
            maxPrice: null,
            minPrice: null
        })
    }
    


    return (
        <section className="container mx-auto p-2">

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
        </section>
    )
}