import type { Product } from "../../types"
import ProductPrice from "./ProductPrice";

type ProductInfoPriceProps = Pick<Product, 'discount' | 'price'>

export default function ProductInfoPrice({
    discount,
    price
}: ProductInfoPriceProps) {
    
    const realDiscount =( discount ? discount : 0);
    const isDiscount = discount ? true : false;

    return (
        <>
            { 
                isDiscount && 
                <>
                    <p className="font-medium p-2 bg-red-500 text-white inline-block w-auto self-start">!!Descuento del {realDiscount}%</p>
                    <ProductPrice discount={!isDiscount} price={price - (price * (realDiscount / 100))} /> 
                    <ProductPrice discount={isDiscount} price={price} />
                </>
            }
            {
                !isDiscount && <ProductPrice discount={isDiscount} price={price} />
            }
        </>
    )
}