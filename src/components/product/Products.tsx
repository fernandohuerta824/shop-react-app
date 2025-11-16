import { useEffect, useState } from "react";
import type { FetchError, Product } from "../../types";
import ProductComponent from "./Product";
import Pagination from "../UI/Pagination";
import loadingImage from "../../assets/loading_img.gif"

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<FetchError>(null)
    const [page, setPage] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPreviuos, setHasPreviuos] = useState(false)
    const [startProduct, setStartProduct] = useState(0)
    const [endProduct, setEndProduct] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    const hasProducts = products.length > 0

    const changePage = (page: number) => {
        setPage(page)
    }

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(null)
        try {
            await new Promise((resolve) => setTimeout(resolve, 250))
            const response = await fetch(`http://localhost:8080/api/v1/products?page=${page}`)
            if (!response.ok) {
                throw new Error("Error")
            }

            const data = await response.json()
            setProducts(data.data);
            setHasNext(data.hasNext)
            setHasPreviuos(data.hasPrevious)
            setTotalElements(data.totalElements)
            setStartProduct(data.pageSize * (data.actualPage - 1) + 1)
            setEndProduct(() => {
                if(!data.hasNext) {
                    return data.totalElements;
                }

                return data.pageSize * data.actualPage
            })
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }


    }

    useEffect(() => {
        fetchProducts()
    }, [page])


    if (error) {
        return (
            <h1>Ocurrio un error</h1>
        )
    }

    return (
        <main className="container mx-auto">
            { isLoading && 
            <section className="grid place-items-center h-dvh">
                <img src={loadingImage} alt="Cargando..."width={150} height={150} />
            </section> } 
            {
                !isLoading &&
                <>
                    <Pagination
                        page={page}
                        hasNext={hasNext}
                        hasPreviuos={hasPreviuos}
                        changePage={changePage}
                        startProduct={startProduct}
                        endProduct={endProduct}
                        totalElements={totalElements}
                    />

                    <section>
                        {hasProducts &&
                            <ul
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {products.map(product => <li key={product.code}> <ProductComponent product={product} /> </li>)}
                            </ul>
                        }
                        { !hasProducts && <p>No hay productos para mostrar</p> }

                    </section>

                    <Pagination
                        page={page}
                        hasNext={hasNext}
                        hasPreviuos={hasPreviuos}
                        changePage={changePage}
                        startProduct={startProduct}
                        endProduct={endProduct}
                        totalElements={totalElements}
                />
                </>
            }
        </main>
    )
}