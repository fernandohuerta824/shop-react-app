
type ProductPriceProps = {
    price: number
    discount: boolean
}

export default function ProductPrice({
    discount,
    price
}: ProductPriceProps) {
    return (
        <p
            className={(discount ? "line-through text-xl " : "text-3xl ") + " text-blue-800 font-black"}
        >
            ${price.toFixed(2)}
            <span
                className="text-base"
            >
                {` MXN`}
            </span>
        </p>
    )
}