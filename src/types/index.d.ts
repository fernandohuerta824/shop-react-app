
export type ProductList = {
    name: string
    price: number
    code: string
    stock: number
    discount: null | number
    imageUrl: string | null
}

export type CategoryBase = {
    id: number
    name: string
    description: string
}

export type CategoryList = {
    childCategories: CategoryList[]
} & CategoryBase

export type Category = Pick<CategoryBase, 'description' | 'id' | 'name'> & {
    parentCategory: number | null
}
export type CategorySelect = CategoryBase & { isSelected?: true, parentCategories: number[], childCategories: CategorySelect[] }

export type Product = {
    name: string
    description: string
    code: string
    price: number
    stock: number
    isAvailable: boolean
    discount: number | null
    imageUrl: string | null
    categories: Category[]

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

type PageContextMap = {
  products: ProductList
  categories: CategoryList
};

type ContextKeys = keyof PageContextMap

