import { useEffect, useState } from "react";
import type { NormalResponse, Product } from "../../../../types";
import ProductInfo from "./ProductInfo";

type ProductModalsProps = {
    openInfo: boolean
    onCloseProductInfo: () => void
    code: String
}

export default function ProductModals({
    onCloseProductInfo,
    openInfo,
    code

}: ProductModalsProps) {
    const [product, setProduct] = useState<Product>();
    const [retriveProduct, setRetriveProduct] = useState(true)

    const fetchProduct = async () => {
        const response = await fetch("http://localhost:8080/api/v1/products/" + code)

        if(!response.ok) {
            throw new Error("")
        }

        const data: NormalResponse<Product> = await response.json()
        setProduct(data.data)
    }

    useEffect(() => {

        if(retriveProduct && openInfo) {
            fetchProduct()
            setRetriveProduct(false)
        }
    }, [retriveProduct, openInfo])


    return <>
        <ProductInfo product={product!} onClose={onCloseProductInfo} open={openInfo} />
    </>
}