import { useState } from "react"
import Modal from "../../../UI/Modal"
import FetchError from "../../../UI/FecthError"

type ProductDeleteModalProps = {
    open: boolean,
    onClose: () => void
    onDelete: () => void
    code: string
}

export default function ProductDeleteModal({
    onClose,
    open,
    onDelete,
    code
}: ProductDeleteModalProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const onDeleteProduct = async () => {
        try {
            setLoading(true)
            setError(false)
            setDeleted(false)
            try {
                const resImage = await fetch('http://localhost:8080/api/v1/products/' + code + '/image', {
                    method: 'DELETE'
                })

                if(!resImage.ok) {
                    throw new Error("")
                }
            } catch (e) {
                
            }
            const resProduct = await fetch('http://localhost:8080/api/v1/products/' + code, {
                method: 'DELETE'
            })


            if (!resProduct.ok) {
                throw new Error("");
            }

            

            setDeleted(true)
        } catch (e) {
            setError(true)
        }
        setLoading(false)
    }

    return (
        <Modal open={open} onClose={deleted ? onDelete : onClose}>
            {deleted && <div>
                Producto Eliminado Correctamente
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer hover:scale-95 disabled:bg-gray-400"
                    >
                        Cerrar
                    </button>

                </div>
            </div>}
            {error && <h3 className="text-xl font-semibold text-red-600">Un error ha ocurrido, por favor intente mas tarde</h3>}
            {!deleted &&
                <div>
                    Esta seguro que quiere borrar el producto?

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer hover:scale-95 disabled:bg-gray-400"
                            disabled={loading}
                        >
                            No
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer hover:scale-95 disabled:bg-gray-400"
                            disabled={loading}
                            onClick={onDeleteProduct}
                        >
                            {loading ? "Borrando..." : "Si, borrar"}
                        </button>
                    </div>
                </div>
            }
        </Modal>
    )
}