
export type Product = {
    name: string
    price: number
    code: string
    stock: number
    discount: null | number
    imageUrl: string
}

export type FetchError = null | any