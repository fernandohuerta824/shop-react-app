import { useState } from "react"
import type { ProductList } from "../../types"
import ProductInfoPrice from "./ProductInfoPrice"
import ProductModals from "./ProductModals"


type ProductProps = {
    product: ProductList
}

export default function Product({
    product
}: ProductProps) {

    const [isOpenProductInfo, setIsOpenProductInfo] = useState(false)

    return (
        <>
            <ProductModals  code={product.code} onCloseProductInfo={() => setIsOpenProductInfo(false)} openInfo={isOpenProductInfo}/>
            <article className="shadow-md shadow-gray-300 rounded-2xl p-4 bg-white flex flex-col h-full gap-4">
                <header className="border-2 border-gray-300 rounded-2xl overflow-hidden">
                    <img className="w-full h-80 object-contain block" src={product.imageUrl || "https://picsum.photos/600"} alt={product.name} />
                </header>

                <section className="mt-5 flex-1 flex flex-col gap-4">
                    <h1 className="font-bold">{product.name}</h1>

                    <ProductInfoPrice discount={product.discount} price={product.price} />

                    <p className="font-bold text-neutral-700">
                        Disponibles: <span className="font-normal">{product.stock}</span>
                    </p>
                </section>

                <footer className="flex gap-4 justify-between items-center mt-auto">
                    <button 
                        className="font-bold rounded bg-green-700 w-full p-2 text-white hover:cursor-pointer hover:bg-green-800 hover:transition hover:scale-95"
                        onClick={() => setIsOpenProductInfo(true)}
                    >
                        Ver Info
                    </button>

                    <button className="font-bold rounded bg-blue-500 w-full p-2 text-white hover:cursor-pointer hover:bg-blue-600 hover:transition hover:scale-95">
                        Actualizar
                    </button>
                </footer>
            </article>
        </>

    )
}