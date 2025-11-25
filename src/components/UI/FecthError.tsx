type FetchErrorProps = {
    title: string
    message: string
    fetchFun?: () => Promise<any>
}

export default function FetchError({
    message,
    title,
    fetchFun
}: FetchErrorProps) {
    return (
        <section className="w-full h-full grid place-items-center py-20">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center border border-gray-200">

                <div className="flex justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                {fetchFun && (
                    <button
                        onClick={fetchFun}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium"
                    >
                        Try again
                    </button>
                )}
            </div>
        </section>
    )
}
