import type { Product } from "../../../../types"

type ProductInfoCardProps = {
    product: Product
}

export default function ProductInfoCard({ product }: ProductInfoCardProps) {
    return (
        <div>

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
                        {(product.discount != null && product.discount > 0) && (
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
            </div>
    )
}