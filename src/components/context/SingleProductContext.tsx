import { createContext, useEffect, useState } from "react"
import type { ImagePostResponse, NormalResponse, Product } from "../../types"
import { usePageContext } from "../hooks/usePageContext"


type ProductErrors = Partial<Record<keyof Product, string | null>>

export type SingleProductContextType = {
    product: Product
    errors: ProductErrors
    file: File | null
    loading: boolean
    submitted: boolean
    productError: boolean
    imgError: boolean

    mode: "create" | "update"

    setNewErrors: (errors: Partial<ProductErrors>) => void
    onUpdateProduct: (update: Partial<Product>) => void
    onFileSelect: (file: File | null) => void
    onSubmit: () => Promise<void>
    endForm: () => void
    resetErrors: () => void
    isReady: boolean
    error: boolean
    fetchInitialProduct: () => Promise<void>
}

export type SingleProductProviderProps = {
    initialProduct?: Product
    mode?: "create" | "update"
    isReady: boolean
    error: boolean
    fetchInitialProduct: () => Promise<void>
    children: React.ReactNode
}

export const SingleProductContext = createContext<SingleProductContextType | null>(null)


export function SingleProductProvider({
    children,
    initialProduct,
    mode = 'create',
    isReady,
    error,
    fetchInitialProduct
}: SingleProductProviderProps) {
    const { pageData: { fetchElements } } = usePageContext('products')

    const [product, setProduct] = useState<Product>(() => {
        if (!initialProduct) {
            return {
                code: "",
                description: "",
                discount: 0,
                imageUrl: "",
                isAvailable: true,
                name: "",
                price: 0,
                stock: 0
            }

        }
        return initialProduct
    })
    const [errors, setErrors] = useState<ProductErrors>({
        code: null,
        description: null,
        discount: null,
        imageUrl: null,
        isAvailable: null,
        name: null,
        price: null,
        stock: null
    })
    const [file, setFile] = useState<File | null>(null)
    const [productError, setProductError] = useState<boolean>(false)
    const [imgError, setImgError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const setNewErrors = (errors: Partial<ProductErrors>) => setErrors(prevErrors => ({ ...prevErrors, ...errors }))
    const onFileSelect = (file: File | null) => {
        setFile(file)
    }


    const onUpdateProduct = (product: Partial<Product>) => {
        setProduct(prevProduct => ({ ...prevProduct, ...product }))
    }

    const endForm = () => {
        setSubmitted(false)
        setFile(null)
        resetErrors()
        if (mode == 'create') {
            onUpdateProduct({
                code: "",
                description: "",
                discount: 0,
                imageUrl: "",
                isAvailable: true,
                name: "",
                price: 0,
                stock: 0
            })
        }
        fetchElements()
    }

    const resetErrors = () => {
        setProductError(false)
        setImgError(false)
        setErrors({
            code: null,
            description: null,
            discount: null,
            imageUrl: null,
            isAvailable: null,
            name: null,
            price: null,
            stock: null
        })
    }

    const onSubmit = async () => {
        setLoading(true);
        setProductError(false);
        setImgError(false);
        setSubmitted(false);

        try {
            const url =
                mode === "create"
                    ? "http://localhost:8080/api/v1/products"
                    : `http://localhost:8080/api/v1/products/${product.code}`

            const method = mode === "create" ? "POST" : "PATCH"
            const resProduct = await fetch(url, {
                method,
                body: JSON.stringify(Object.fromEntries(Object.entries(product).filter(([_, value]) => value != null && value != undefined))),
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
            onUpdateProduct(resJsonProduct.data)
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

                    const data: NormalResponse<ImagePostResponse> = await resImg.json();

                    onUpdateProduct({ imageUrl: data.data.url })

                } catch (err) {
                    setImgError(true);
                }
            }


            setSubmitted(true);

            //fetchElements()
        } catch (err) {
            setProductError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(initialProduct)
        setProduct(initialProduct)
    }, [isReady])

    return (
        <SingleProductContext.Provider value={{
            errors,
            file,
            imgError,
            loading,
            mode,
            onFileSelect,
            onUpdateProduct,
            product,
            productError,
            setNewErrors,
            submitted,
            onSubmit,
            endForm,
            resetErrors,
            isReady,
            error,
            fetchInitialProduct
        }}>
            {children}
        </SingleProductContext.Provider>
    )
}


