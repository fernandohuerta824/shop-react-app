import React, { useMemo, useState } from "react";
import Modal from "../../UI/Modal";
import ProductForm from "./ProductForm";
import { type Product } from "../../../types";
import { usePageContext } from "../../hooks/usePageContext";
import { validateProductDescription, validateProductDiscount, validateProductName, validateProductPrice } from "../../utils/productValidation";

type ProductModalFormsMap = {
    generalInfo: React.ReactNode
    none: null
}

type ProductModalFormsProps = {
    product: Product,
    onFileSelect: (file: File | null) => void
    file: File | null
    onUpdateProduct: (product: Partial<Product>) => void,
    onSubmit: () => Promise<any>
    update?: boolean
    errors: Record<keyof Product, string | null>
    setNewErrors: (errors: Partial<Record<keyof Product, string | null>>) => void
}

type ProductModalFormsModals = keyof ProductModalFormsMap

export default function ProductModalForms({
    onUpdateProduct,
    product,
    onFileSelect,
    file,
    onSubmit,
    update,
    errors,
    setNewErrors
}: ProductModalFormsProps) {
    const [modal, setModal] = useState<ProductModalFormsModals>('none')
 

    const onClose = () => setModal('none')

    const onModalInfo = () => {

        // const name = validateProductName(product.name);
        // const description = validateProductDescription(product.description)
        // const price = validateProductPrice(product.price)
        // const discount = validateProductDiscount(product.discount)
        // const stock = validateProductDiscount(product.stock)
        // let imageUrl = null

        // if(!update) {
        //     imageUrl = file == null ? "La imagen es obligatoria" : null
        // }
        // const errors = {
        //     name, description, price, discount, stock, imageUrl
        // }

        // const errorValues = Object.values(errors)

        // const hasError = errorValues.some(e => e != null)

        // setNewErrors(errors)


        if(true) {
            onSubmit()
        }
    }

    const mapModal: ProductModalFormsMap = useMemo(() => ({
        generalInfo: <ProductForm errors={errors} file={file} onFileSelect={onFileSelect} update={update} onModalInfo={onModalInfo} product={product} onPrev={onClose} onUpdateProduct={onUpdateProduct} />,
        none: null,
    }), [product, modal, file, errors])


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