import { useState } from "react"
import type { Product, ProductRequest } from "../../types"

type ProductFormProps = {
    initialProduct?: Product
    update: boolean,
    onSubmit: (product: Product) => void
}

export default function ProductForm({ initialProduct, update }: ProductFormProps) {
    const [product, setProduct] = useState(initialProduct);

    return (
        <div className="space-y-6 w-full">

            <h2 className="text-xl font-semibold text-gray-800">
                {update ? `Actualizar producto: ${product?.code}` : "Agregar un nuevo producto"}
            </h2>

            <form className="space-y-5">

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-medium text-gray-700">Nombre</label>
                    <input 
                        id="name" 
                        type="text"
                        placeholder="Ej: Televisión 4K"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-medium text-gray-700">Descripción</label>
                    <textarea 
                        id="description"
                        placeholder="Ej: Televisión de 34 pulgadas..."
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="font-medium text-gray-700">Precio</label>
                    <input 
                        id="price"
                        type="number"
                        placeholder="Ej: 5999"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="stock" className="font-medium text-gray-700">Stock</label>
                    <input 
                        id="stock"
                        type="number"
                        placeholder="Ej: 31"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="discount" className="font-medium text-gray-700">Descuento (%)</label>
                    <input 
                        id="discount"
                        type="number"
                        placeholder="Ej: 20"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="available" className="font-medium text-gray-700">
                        Disponible
                    </label>
                    <input 
                        id="available" 
                        type="checkbox"
                        className="w-5 h-5"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    
                    <form method="dialog">
                        <button
                            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer hover:scale-95"
                        >
                            Cerrar
                        </button>
                    </form>

                    <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer hover:scale-95"
                    >
                        {update ? "Actualizar producto" : "Agregar producto"}
                    </button>
                </div>

            </form>
        </div>
    );
}