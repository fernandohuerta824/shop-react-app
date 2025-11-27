import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import ProductPage from "./product/ProductPage";


export default function HomePage() {
    return (
        <CategoryProvider>
            <ProductProvider>
                <ProductPage/>
            </ProductProvider>
        </CategoryProvider>
    )
}