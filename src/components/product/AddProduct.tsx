import { useState } from "react";
import Modal from "../UI/Modal";
import ProductForm from "./ProductForm";
import type { Product } from "../../types";
import { usePageContext } from "../hooks/usePageContext";
import { ProductContext } from "./context/ProductContext";


export default function AddProduct() {
    const [open, setOpen] = useState(false)
    const { pageData: { fetchElements } } = usePageContext('products')

    const onSubmit = () => {
        
        fetchElements();
    }

    return (
        <section>
            <button
                className="mt-5 font-bold rounded bg-blue-500 p-2 text-white hover:cursor-pointer hover:bg-blue-600 transition hover:scale-95"
                onClick={() => setOpen(true)}
            >
                Agregar producto
            </button>
            <Modal
                open={open}
                onClose={() => setOpen(false)} 
            >

                <ProductForm update={false} onSubmit={()=>{}} />
            </Modal>
        </section>
    )
}