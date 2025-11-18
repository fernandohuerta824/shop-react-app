import type { Product } from "../../types"
import Modal from "../UI/Modal"

type ProductInfoProps = {
    open: boolean
    onClose: () => void,
    product: Product
}

export default function ProductInfo({
    onClose,
    open,
    product
}: ProductInfoProps) {

    if (!product) {
        return null
    }

    return (
        <Modal
            onClose={onClose}
            open={open}
        >
            <section>
                <div
                    className="flex justify-end"
                >
                    <form method="dialog">
                        <button
                            className="text-xl cursor-pointer"
                        >
                            X
                        </button>
                    </form>
                </div>

                <div
                    className="container mx-auto py-2"
                >
                    <img className="block object-contain mx-auto w-full max-h-60" src={product.imageUrl || undefined} alt="" />
                </div>


                <div className="border-t border-dashed py-4 flex flex-col gap-6">


                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold text-gray-800">
                            {product.name}
                        </p>
                        <p className="text-sm text-gray-500">Código: <span className="font-medium">{product.code}</span></p>
                    </div>


                    <div className="flex flex-col gap-1">
                        <p className="text-base text-gray-700">
                            Precio: <span className="font-semibold">${product.price.toFixed(2)} mxn</span>
                        </p>
                        {product.discount && (
                            <>
                                <p className="text-sm text-red-500">Descuento: <span className="font-medium">{product.discount}%</span></p>
                                <p className="text-base text-green-600 font-semibold">
                                    Precio final: ${(product.price - (product.price * (product.discount / 100))).toFixed(2)} mxn
                                </p>
                            </>
                        )}
                    </div>


                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-700">
                            Stock: <span className="font-medium">{product.stock} unidades</span>
                        </p>
                        <p className={`text-sm font-medium ${product.isAvailable ? "text-green-600" : "text-red-500"}`}>
                            {product.isAvailable ? "Disponible" : "No disponible"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-gray-800">Descripción:</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                </div>

                <div
                    className="border-t border-dashed py-4 flex gap-4 justify-between"
                >
                    <form method="dialog">
                        <button
                            className="py-2 px-6 font-bold rounded bg-blue-500 w-full p-2 text-white hover:cursor-pointer hover:bg-blue-600 hover:transition hover:scale-95"
                        >
                            Cerrar
                        </button>
                    </form>

                    <button
                        className="py-2 px-6 font-bold rounded bg-red-500 p-2 text-white hover:cursor-pointer hover:bg-red-600 hover:transition hover:scale-95"

                    >
                        Eliminar
                    </button>
                </div>
            </section>
        </Modal>
    )
}