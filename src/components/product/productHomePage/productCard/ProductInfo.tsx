import { useState } from "react"
import type { Product } from "../../../../types"
import LoadingGif from "../../../UI/LoadingGif"
import Modal from "../../../UI/Modal"
import ProductInfoCard from "./ProductInfoCard"
import ProductDeleteModal from "./ProductDeleteModal"
import FetchError from "../../../UI/FecthError"
import { usePageContext } from "../../../hooks/usePageContext"

type ProductInfoProps = {
    open: boolean
    onClose: () => void,
    product?: Product
    isReady: boolean
    error: boolean
    fetchInitialProduct: () => Promise<void>
}

export default function ProductInfo({
    onClose,
    open,
    product,
    error,
    fetchInitialProduct,
    isReady
}: ProductInfoProps) {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { pageData: { fetchElements } } = usePageContext('products')

    
    const onCloseDeleteModal = () => setShowDeleteModal(false)

    const onDelete = () => {
        onCloseDeleteModal()
        onClose()
        fetchElements()
    }
    return (
        <Modal
            onClose={onClose}
            open={open}
        >
            {error && <FetchError message="Algo malio sal" title="Error" fetchFun={fetchInitialProduct}/>} 
            { !isReady && <LoadingGif />}
            {(isReady && !error) &&
                <>

                    <ProductInfoCard product={product!} />
                    
                    {showDeleteModal && <ProductDeleteModal onDelete={onDelete} onClose={onCloseDeleteModal} open={showDeleteModal} code={product!.code} />}
                    <div
                        className="border-t border-dashed py-4 flex gap-4 justify-between"
                    >
                        <button
                            onClick={onClose}
                            className="py-2 px-6 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 hover:transition hover:scale-95"
                        >
                            Cerrar
                        </button>


                        <button
                            className="py-2 px-6 font-bold rounded bg-red-500 p-2 text-white hover:cursor-pointer hover:bg-red-600 hover:transition hover:scale-95"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Eliminar
                        </button>
                    </div>
                </>
            }

        </Modal>
    )
}