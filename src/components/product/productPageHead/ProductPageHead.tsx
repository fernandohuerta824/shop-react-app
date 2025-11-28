import { usePageContext } from "../../hooks/usePageContext";
import SearchBar from "../../UI/SearchBar";
import AddProduct from "./AddProduct";
import ProductFilter from "./ProductFilter";

export default function ProductPageHead() {

    const { onSetFilters } = usePageContext("products")


    const onSearch = (search: string) => {
        if (!search) {
            onSetFilters({ name: null })
            return
        }

        if (search.length < 4) {
            return
        }
        onSetFilters({ name: search.trim() })
    }

    return (
        <header>
            <SearchBar onSearch={onSearch} />
            <section className="container mx-auto p-4 flex justify-between">
                <ProductFilter />
                <AddProduct />
            </section>
        </header>
    )
}