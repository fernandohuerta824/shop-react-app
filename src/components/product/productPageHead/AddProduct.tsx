import React, { useState } from "react";
import { type Product } from "../../../types";
import ProductModalForms from "../ProductModalForms";

type AddProductMap = {
    generalInfo: React.ReactNode
    categories: React.ReactNode
    image: React.ReactNode
    none: null
}

type AddProduct = keyof AddProductMap

export default function AddProduct() {

    const [product, setProduct] = useState<Product>({
        code: "",
        description: "",
        discount: null,
        imageUrl: null,
        isAvailable: true,
        name: "",
        price: 0,
        stock: 0,
        categories: [{ id: 1, description: "", name: "", parentCategory: null }]
    })


    const onUpdateProduct = (product: Partial<Product>) => {
        setProduct(prevProduct => ({ ...prevProduct, ...product }))
    }


    return (
        <ProductModalForms onUpdateProduct={onUpdateProduct} product={product} />
    )
}