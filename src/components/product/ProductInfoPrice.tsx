import type { Product } from "../../types"
import ProductPrice from "./ProductPrice";

type ProductInfoPriceProps = Pick<Product, 'discount' | 'price'>

export default function ProductInfoPrice({
    discount,
    price
}: ProductInfoPriceProps) {
    
    const realDiscount =( discount ? discount : 0);

    let hasDiscount = false; 
    if(realDiscount && realDiscount > 0) {
        hasDiscount = true;
    }

    return (
        <>
            
            { 
                hasDiscount && 
                <>
                    <p className="font-medium p-2 bg-red-500 text-white inline-block w-auto self-start">!!Descuento del {realDiscount}%</p>
                    <ProductPrice discount={!hasDiscount} price={price - (price * (realDiscount / 100))} /> 
                    <ProductPrice discount={hasDiscount} price={price} />
                </>
            }
            {
                !hasDiscount && <ProductPrice discount={hasDiscount} price={price} />
            }
            
        </>
    )
}