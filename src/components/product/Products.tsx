import type { ProductFilters, ProductList } from "../../types";
import ProductComponent from "./Product";
import PaginationLayout from "../layouts/PaginationLayout";
import SearchBar from "../UI/SearchBar";
import ProductFilter from './ProductFilter'
import { ProductContext } from "./context/ProductContext";
import { usePageContext } from "../hooks/usePageContext";
import AddProduct from "./AddProduct";
import LoadingGif from "../UI/LoadingGif";
import FetchError from "../UI/FecthError";

export default function Products() {
    const { onSetFilters, pageData } = usePageContext("products")

    const onSearch = (search: string) => {
        if(!search) {
            onSetFilters({name: null})
            return
        }

        if(search.length < 4) {
            return
        }
        onSetFilters({name: search.trim()})
    }

    return (
        <>
            <SearchBar onSearch={onSearch} />
            <section className="container mx-auto p-4 flex justify-between">
                <ProductFilter/>
                <AddProduct />
            </section>
            <PaginationLayout
                context={'products'}
                loadingComponent={<LoadingGif/>}
                errorComponent={<FetchError message="Intente de nuevo mas tarde" title="Algo salio mal" fetchFun={pageData.fetchElements} />}
            >
                {(products) => (
                    <>
                        {products.length === 0 && (
                            <div className="text-center text-gray-500 mt-8 p-8 border border-dashed rounded-xl">
                                <p className="text-lg font-medium">No se encontraron productos</p>
                                <p className="text-sm">Intenta cambiar los filtros o recargar la página.</p>
                            </div>
                        )}
                        {
                            products.length > 0 &&
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <li key={product.code}>
                                        <ProductComponent product={product} />
                                    </li>
                                ))}
                            </ul>
                        }
                    </>
                )}

            </PaginationLayout>
        </>
    )
}