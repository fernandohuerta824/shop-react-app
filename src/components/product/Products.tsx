import type { Product } from "../../types";
import ProductComponent from "./Product";
import PaginationLayout from "../layouts/PaginationLayout";

export default function Products() {

    return (
        <PaginationLayout<Product>
            url={'http://localhost:8080/api/v1/products'}
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
    )
}