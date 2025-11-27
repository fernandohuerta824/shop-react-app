import React, { useMemo, useState } from "react";
import Modal from "../UI/Modal";
import ProductForm from "./ProductForm";
import { type Product } from "./../../types";
import { usePageContext } from "../hooks/usePageContext";

type ProductModalFormsMap = {
    generalInfo: React.ReactNode
    categories: React.ReactNode
    image: React.ReactNode
    none: null
}

type ProductModalFormsProps = {
    product: Product,
    onUpdateProduct: (product: Partial<Product>) => void
}

type ProductModalFormsModals = keyof ProductModalFormsMap

export default function ProductModalForms({
    onUpdateProduct,
    product
}: ProductModalFormsProps) {
    const [modal, setModal] = useState<ProductModalFormsModals>('none')



    const onClose = () => setModal('none')

    const { pageData: { fetchElements } } = usePageContext('products')

    const onModalInfo = () => {
        setModal('categories')
    }


    const mapModal: ProductModalFormsMap = useMemo(() => ({
        generalInfo: <ProductForm update={false} onModalInfo={onModalInfo} product={product} onPrev={onClose} onUpdateProduct={onUpdateProduct} />,
        categories: null,
        none: null,
        image: null
    }), [product, modal])


    return (
        <section>
            <button
                className="mt-5 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 transition hover:scale-95"
                onClick={() => setModal('generalInfo')}
            >
                Agregar producto
            </button>
            <Modal
                open={modal != 'none'}
                onClose={onClose}
            >

                {mapModal[modal]}
            </Modal>
        </section>
    )
}