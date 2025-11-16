import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { FetchError, PageResponse } from "../../types";
import loadingImage from "../../assets/loading_img.gif"
import Pagination from "../UI/Pagination";

type PaginationLayoutProps<T> = {
    url: string
    children: (data: T[]) => ReactNode
    filters: Record<string, any>
}

export default function PaginationLayout<T>({
    children,
    url,
    filters
}: PaginationLayoutProps<T>) {
    const [elements, setElements] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<FetchError>(null)
    const [page, setPage] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPreviuos, setHasPreviuos] = useState(false)
    const [startProduct, setStartProduct] = useState(0)
    const [endProduct, setEndProduct] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    const filtersRef = useRef<Record<string, any>>(filters);

    const changePage = (page: number) => {
        setPage(page)
    }

    const fetchElements = async () => {
        setIsLoading(true)
        setError(null)
        try {

            const params = new URLSearchParams({
                ...Object.fromEntries(
                    Object.entries(filters).filter((v) => v[1] !== null)
                ),
                page: page.toString()
            })


            await new Promise(resolve => setTimeout(resolve, 300))
            const response = await fetch(`${url}?${params.toString()}`)
            if (!response.ok) {
                throw new Error("Error")
            }

            const data: PageResponse<T> = await response.json()
            setElements(data.data);
            setHasNext(data.hasNext)
            setHasPreviuos(data.hasPrevious)
            setTotalElements(data.totalElements)
            setStartProduct(data.pageSize * (data.actualPage - 1) + 1)
            setEndProduct(() => {
                if (!data.hasNext) {
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
        const changed = JSON.stringify(filtersRef.current) !== JSON.stringify(filters)
        if (changed) {
            filtersRef.current = filters
            setPage(0)
        }
    }, [filters])

    useEffect(() => {
        fetchElements()
    }, [page, filters])

    const content = useMemo(() => children(elements), [elements, children])

    if (isLoading) {
        return <main className="grid place-items-center h-dvh">
            <img src={loadingImage} alt="Cargando..." width={150} height={150} />
        </main>
    }

    if (error) {
        return (
            <main>
                <h1>Ocurrio un error</h1>
            </main>
        )
    }

    if (elements.length === 0) {
        return <main className="container mx-auto">
            {content}
        </main>
    }

    return (
        <main className="container mx-auto">
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
                {content}
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
        </main>
    )
}