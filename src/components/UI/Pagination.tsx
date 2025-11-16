
type PaginationProps = {
    page: number
    hasNext: boolean
    hasPreviuos: boolean,
    changePage: (page: number) => void
    startProduct: number,
    endProduct: number
    totalElements: number
}

export default function Pagination({
    page,
    changePage,
    hasNext,
    hasPreviuos,
    startProduct,
    endProduct,
    totalElements
}: PaginationProps) {

    const setPreviousPage = () => changePage(page - 1)
    const setNextPage = () => changePage(page + 1)

    return (
        <section
            className="flex justify-between items-end"
        >
            <div
                className="flex gap-2 items-center p-4"
            >
                {
                    hasPreviuos &&
                    <button
                        onClick={setPreviousPage}
                        className="py-2 px-4 text-white bg-blue-500 rounded-xl hover:cursor-pointer hover:bg-blue-600 hover:transition"
                    >
                        Anterior
                    </button>
                }
                <span
                    className="py-2 px-4 border border-blue-500 rounded-xl"
                >
                    {page + 1}
                </span>
                {

                    hasNext && 
                    <button
                        onClick={setNextPage}
                        className="py-2 px-4 text-white bg-blue-500 rounded-xl hover:cursor-pointer hover:bg-blue-600 hover:transition"
                    >
                        Siguiente
                    </button>
                }
            </div>

            <div
                className="p-4"
            >
                <span> { startProduct } - { endProduct } de { totalElements } </span>
            </div>
        </section>
    )
}