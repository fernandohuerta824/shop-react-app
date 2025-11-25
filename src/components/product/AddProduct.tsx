import { useState } from "react";
import Modal from "../UI/Modal";
import ProductForm from "./ProductForm";
import type { Product } from "../../types";


export default function AddProduct() {
    const [open, setOpen] = useState(false)

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

                <div></div>
            </Modal>
        </section>
    )
}