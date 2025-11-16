
type PaginationProps = {
    page: number
    hasNext: boolean
    hasPreviuos: boolean,
    changePage: (page: number) => void
}

export default function Pagination({
    page,
    changePage,
    hasNext,
    hasPreviuos
}: PaginationProps) {

    const setPreviousPage = () => changePage(page - 1)
    const setNextPage = () => changePage(page + 1)

    return (
        <section
            className="inline"
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
                    {page}
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
        </section>
    )
}