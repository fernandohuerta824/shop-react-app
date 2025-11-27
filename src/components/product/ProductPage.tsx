import ProductComponent from "./productHomePage/Product";
import PaginationLayout from "../layouts/PaginationLayout";
import { usePageContext } from "../hooks/usePageContext";
import LoadingGif from "../UI/LoadingGif";
import FetchError from "../UI/FecthError";
import ProductPageHead from "./productPageHead/ProductPageHead";

export default function ProductPage() {
    const { pageData } = usePageContext("products")


    return (
        <>
            <ProductPageHead />
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