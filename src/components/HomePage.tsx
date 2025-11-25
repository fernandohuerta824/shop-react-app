import { ProductProvider } from "./product/context/ProductContext";
import Products from "./product/Products";


export default function HomePage() {
    return (
        <ProductProvider>
            
            <Products/>
        </ProductProvider>
    )
}