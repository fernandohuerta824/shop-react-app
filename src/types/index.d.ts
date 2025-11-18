
export type ProductList = {
    name: string
    price: number
    code: string
    stock: number
    discount: null | number
    imageUrl: string | null
}

export type Product = {
    name: string
    description: string
    code: string
    price: number
    stock: null
    isAvailable: boolean
    discount: number | null
    imageUrl: string | null
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

export type NormalResponse<T> = {
    code: null
    message: string
    timeStamp: string
    data: T
}

export type FetchError = null | any