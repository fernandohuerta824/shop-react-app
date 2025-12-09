import type { Product } from "../../../../types"
import LoadingGif from "../../../UI/LoadingGif"
import Modal from "../../../UI/Modal"
import ProductInfoCard from "./ProductInfoCard"

type ProductInfoProps = {
    open: boolean
    onClose: () => void,
    product?: Product
}

export default function ProductInfo({
    onClose,
    open,
    product
}: ProductInfoProps) {

    return (
        <Modal
            onClose={onClose}
            open={open}
        >
            {!product && <LoadingGif />}
            {product && 
            <>
            
                <ProductInfoCard product={product} />

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
            </>
            }

        </Modal>
    )
}