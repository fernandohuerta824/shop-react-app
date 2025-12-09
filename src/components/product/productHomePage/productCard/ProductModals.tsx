import { useEffect, useState } from "react";
import type { NormalResponse, Product, ProductModalFormsModals } from "../../../../types";
import ProductInfo from "./ProductInfo";
import { SingleProductProvider } from "../../../context/SingleProductContext";
import ProductModalForms from "../../productForm/ProductModalForms";

type ProductModalsProps = {
    openInfo: boolean
    onCloseProductInfo: () => void
    code: String,
    modal: ProductModalFormsModals
    onCloseModal: () => void
}

export default function ProductModals({
    onCloseProductInfo,
    openInfo,
    code,
    modal,
    onCloseModal

}: ProductModalsProps) {
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState(false)


    const fetchProduct = async () => {
        
        try {
            setError(false)
            const response = await fetch("http://localhost:8080/api/v1/products/" + code)
    
            if (!response.ok) {
                throw new Error("")
            }
    
            const data: NormalResponse<Product> = await response.json()
            setProduct(data.data)
            
        } catch(e) {
            setError(true)
        }
        
    }

    useEffect(() => {

        if(openInfo || modal != 'none') {
            fetchProduct()
        }
        
    }, [openInfo, modal])



    return <>
        <ProductInfo product={product} onClose={onCloseProductInfo} open={openInfo} />
        
        <SingleProductProvider initialProduct={product} mode="update" isReady={!!product} error={error} fetchInitialProduct={fetchProduct}>

            <ProductModalForms modal={modal} onCloseModal={onCloseModal} />
        </SingleProductProvider>
    </>
}