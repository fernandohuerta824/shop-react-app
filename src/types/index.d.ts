
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
    stock: number
    isAvailable: boolean
    discount: number | null
    imageUrl: string | null
}

export type ProductRequest = {
    name?: string
    description?: string
    price?: number
    stock?: number
    isAvailable?: boolean
    discount?: number
}

export type ProductFilters = {
    name: string | null
    minPrice: number | null
    maxPrice: number | null
    isAvailable: boolean | null
    sortBy: "price" | "name" | null
    sortDir: "asc" | "desc" | null
}

export type ProductSorting =  {
    noSort: null,
    priceAsc: {sortBy: "price", sortDir: "asc"},
    priceDesc: {sortBy: "price", sortDir: "desc"},
    nameAsc: {sortBy: "name", sortDir: "asc"},
    nameDesc: {sortBy: "name", sortDir: "desc"},
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

export type ImagePostResponse = {
    publicId: string
    url: string
}

export type usePaginatedFetchReturn<T> = {
    pageResponse: Pick<PageResponse<T>, 'pageSize' | 'actualPage' | 'totalElements' | 'hasNext' | 'hasPrevious'  | 'data'>
    isLoading: boolean
    error: FetchError
    changePage: (page: number) => void
    fetchElements: () => Promise<void>
}

export type ContextPageType<T, F> = {
    pageData: usePaginatedFetchReturn<T>,
    filters: F,
    onSetFilters: (filters: Partial<F>) => void
}

export type PageContextMap = {
  products: ProductList
};

export type ContextKeys = keyof PageContextMap

export type AddProductMap = {
    generalInfo: React.ReactNode
    none: null
}

export type AddProduct = keyof AddProductMap

export type ProductModalFormsMap = {
    generalInfo: React.ReactNode
    none: null
}

export type ProductModalFormsModals = keyof ProductModalFormsMap