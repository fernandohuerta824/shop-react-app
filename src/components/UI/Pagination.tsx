
type PaginationProps = {
    page: number
    hasNext: boolean
    hasPrevious: boolean,
    changePage: (page: number) => void
    start: number,
    end: number
    totalElements: number
}

export default function Pagination({
    page,
    changePage,
    hasNext,
    hasPrevious,
    start,
    end,
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
                    hasPrevious &&
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
                <span> { start } - { end } de { totalElements } </span>
            </div>
        </section>
    )
}