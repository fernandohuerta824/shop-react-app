import { ProductProvider } from "./context/ProductContext";
import ProductPage from "./product/ProductPage";


export default function HomePage() {
    return (
        <ProductProvider>
            <ProductPage/>
        </ProductProvider>
    )
}