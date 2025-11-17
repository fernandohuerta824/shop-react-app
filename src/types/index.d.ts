
export type Product = {
    name: string
    price: number
    code: string
    stock: number
    discount: null | number
    imageUrl: string
}

export type ProductFilters = {
    name: string | null
    minPrice: number | null
    maxPrice: number | null
    isAvailable: boolean | null
}

export type PageResponse<T> = {
    code: number
    message: string
    timestamp: string
    data: T[]
    totalElements: number,
    actualPage: number,
    pageSize: number,
    totalPages: number,
    numElements: number,
    hasNext: boolean,
    hasPrevious: boolean
}

export type FetchError = null | any