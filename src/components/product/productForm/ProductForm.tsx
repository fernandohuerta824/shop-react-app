import type { Product } from "../../../types"
import { useSingleProductContext } from "../../hooks/useSingleProductContext"
import ImageInput from "../../UI/ImageInput"
import ProductInfoCard from "../productHomePage/productCard/ProductInfoCard"

type ProductFormProps = {

    onModalInfo: () => void
    onClose: () => void

}

export default function ProductForm({ onModalInfo, onClose }: ProductFormProps) {

    const { onUpdateProduct, mode, product, errors, submitted, productError, loading } = useSingleProductContext()

    const changePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onClose()
    }

    const handleUpdateField = (key: keyof Product, value: any) => {
        if (key == 'discount' || key == 'price' || key == 'stock') {
            value = +value;
        }
        onUpdateProduct({ [key]: value })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onModalInfo()
    }

    if (submitted) {
        return (
            <div className="space-y-6 w-full overflow-hidden">
                 <h2 className="text-2xl font-semibold text-green-600 text-center">
                    Producto {mode == 'create' ? "creado" : "actualizado"} correctamente
                </h2>
                <ProductInfoCard product={product} />
                <button
                    onClick={changePrev}
                    className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer hover:scale-95"
                >
                    Cerrar
                </button>
            </div>
        )
    }

  

    return (
        <div className="space-y-6 w-full overflow-hidden">

            <h2 className="text-xl font-semibold text-gray-800">
                {mode == 'update' ? `Actualizar producto: ${product.code}` : "Agregar un nuevo producto"}
            </h2>


            {productError && (
                <h3 className="text-xl font-semibold text-red-600">
                    Un error ha ocurrido, por favor intente mas tarde
                </h3>
            )}


            <form className="space-y-5 px-2" onSubmit={onSubmit}>
                <div className="overflow-y-auto max-h-[70vh] flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        {errors.name && <p className="text-red-500 text-base">{errors.name}</p>}
                        <label htmlFor="name" className="font-bold text-gray-700">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ej: Televisión 4K"
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={product.name}
                            name="name"
                            onChange={e => handleUpdateField(e.target.name as keyof Product, e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        {errors.description && <p className="text-red-500 text-base">{errors.description}</p>}
                        <label htmlFor="description" className="font-bold text-gray-700">Descripción</label>
                        <textarea
                            id="description"
                            placeholder="Ej: Televisión de 34 pulgadas..."
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                            value={product.description}
                            name="description"
                            onChange={e => handleUpdateField(e.target.name as keyof Product, e.target.value)}
                        />
                    </div>

                    <ImageInput />

                    <div className="flex flex-col gap-1">
                        {errors.price && <p className="text-red-500 text-base">{errors.price}</p>}
                        <label htmlFor="price" className="font-bold text-gray-700">Precio</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Ej: 5999"
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={product.price}
                            onChange={e => handleUpdateField(e.target.name as keyof Product, e.target.value)}
                            name="price"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        {errors.stock && <p className="text-red-500 text-base">{errors.stock}</p>}
                        <label htmlFor="stock" className="font-bold text-gray-700">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="Ej: 31"
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={e => handleUpdateField(e.target.name as keyof Product, e.target.value)}
                            value={product.stock}
                            name="stock"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        {errors.discount && <p className="text-red-500 text-base">{errors.discount}</p>}
                        <label htmlFor="discount" className="font-bold text-gray-700">Descuento (%)</label>
                        <input
                            id="discount"
                            type="number"
                            placeholder="Ej: 20"
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={product.discount || 0}
                            onChange={e => handleUpdateField(e.target.name as keyof Product, e.target.value)}
                            name="discount"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="available" className="font-bold text-gray-700">
                            Disponible
                        </label>
                        <input
                            id="available"
                            type="checkbox"
                            className="w-5 h-5"
                            checked={product.isAvailable}
                            onChange={e => handleUpdateField(e.target.name as keyof Product, !product.isAvailable)}
                            name="isAvailable"

                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">

                    <button
                        onClick={changePrev}
                        className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer hover:scale-95 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        Cerrar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer hover:scale-95 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Siguiente"}
                    </button>
                </div>

            </form>
        </div>
    );
}