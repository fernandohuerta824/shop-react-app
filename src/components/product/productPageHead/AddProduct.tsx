import React, { useState } from "react";
import { type NormalResponse, type Product } from "../../../types";
import ProductModalForms from "../productForm/ProductModalForms";

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
    })

    const [errors, setErrors] = useState<Record<keyof Product, string | null>>({
        code: null,
        description: null,
        discount: null,
        imageUrl: null,
        isAvailable: null,
        name: null,
        price: null,
        stock: null
    })

    const [productError, setProductError] = useState<boolean>(false)
    const [imgError, setImgError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const setNewErrors = (errors: Partial<Record<keyof Product, string | null>>) => setErrors(prevErrors => ({ ...prevErrors, ...errors }))

    const [file, setFile] = useState<File | null>(null)

    const onFileSelect = (file: File | null) => {

        setFile(file)
    }

    const onUpdateProduct = (product: Partial<Product>) => {
        setProduct(prevProduct => ({ ...prevProduct, ...product }))
    }

    const onSubmit = async () => {
        setLoading(true);
        setProductError(false);
        setImgError(false);
        setSubmitted(false);

        try {
            const resProduct = await fetch("http://localhost:8080/api/v1/products", {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!resProduct.ok) {
                if (resProduct.status === 422) {
                    const errors = await resProduct.json();
                    setErrors(prev => ({ ...prev, ...errors.data }));
                } else {
                    setProductError(true);
                }
                return; 
            }

            const resJsonProduct: NormalResponse<Product> = await resProduct.json();

            if (file) {
                try {
                    const fd = new FormData();
                    fd.append("file", file);

                    const resImg = await fetch(
                        `http://localhost:8080/api/v1/products/${resJsonProduct.data.code}/image`,
                        {
                            method: "POST",
                            body: fd,
                        }
                    );

                    if (!resImg.ok) {
                        setImgError(true);
                    }

                } catch (err) {
                    setImgError(true);
                }
            }

            setSubmitted(true);
        } catch (err) {
            setProductError(true);
        } finally {
            setLoading(false);
        }
    };



    return (
        <ProductModalForms errors={errors} setNewErrors={setNewErrors} onSubmit={onSubmit} file={file} onFileSelect={onFileSelect} onUpdateProduct={onUpdateProduct} product={product} />
    )
}