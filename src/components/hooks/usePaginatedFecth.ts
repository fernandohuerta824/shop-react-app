import { useEffect, useState, useRef } from "react";
import type { PageResponse, usePaginatedFetchReturn } from "../../types";

export function usePaginatedFetch<T, F extends Record<string, any>>(
    url: string,
    filters: F
): usePaginatedFetchReturn<T> {
    const [elements, setElements] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null)
    const [page, setPage] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)
    const [totalElements, setTotalElements] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    const filtersRef = useRef<F>(filters);

    const changePage = (page: number) => {
        setPage(page)
    }

    let controller: AbortController | null = null;
    
    const fetchElements = async () => {
        if (controller != null) {
            controller.abort()
        }
        controller = new AbortController();
        setIsLoading(true)
        setError(null)
        try {

            const params = new URLSearchParams({
                ...Object.fromEntries(
                    Object.entries(filters).filter((v) => v[1] !== null)
                ),
                page: page.toString()
            })


            const response = await fetch(`${url}?${params.toString()}`, {signal: controller.signal})
            if (!response.ok) {
                throw new Error("Error")
            }

            const data: PageResponse<T> = await response.json()
            setElements(data.data);
            setHasNext(data.hasNext)
            setHasPrevious(data.hasPrevious)
            setTotalElements(data.totalElements)
            setPageSize(data.pageSize)
        } catch (e: any) {
            if (e.name === "AbortError") return;
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const changed = JSON.stringify(filtersRef.current) !== JSON.stringify(filters)

        if (changed) {
            filtersRef.current = filters
            if(page == 0) {
                fetchElements()
                return;
            }
            setPage(0)
        }
    }, [filters])

    useEffect(() => {
        fetchElements()
    }, [page])

    return {
        pageResponse: {
            actualPage: page,
            data: elements,
            hasNext,
            hasPrevious,
            totalElements,
            pageSize,
        },
        changePage,
        isLoading,
        error,
        fetchElements
    }
}
