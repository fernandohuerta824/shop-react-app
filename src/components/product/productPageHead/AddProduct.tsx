import { useState } from "react";
import ProductModalForms from "../productForm/ProductModalForms";
import { SingleProductProvider } from "../../context/SingleProductContext";
import type { ProductModalFormsModals } from "../../../types";



export default function AddProduct() {
    const [modal, setModal] = useState<ProductModalFormsModals>('none')

    const onCloseModal = () => {
        setModal('none')
    }

    return (
        <section>
            <button
                className="mt-5 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 transition hover:scale-95"
                onClick={() => setModal('generalInfo')}
            >
                Agregar producto
            </button>
            <SingleProductProvider initialProduct={{
                code: "",
                description: "",
                discount: 0,
                imageUrl: "",
                isAvailable: true,
                name: "",
                price: 0,
                stock: 0
            }} isReady error={false} fetchInitialProduct={async () => {}}>

                <ProductModalForms modal={modal} onCloseModal={onCloseModal} />
            </SingleProductProvider>
        </section>
    )
}