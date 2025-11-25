import type React from "react";
import type { ContextPageType } from "../../types";
import { usePageContext } from "../hooks/usePageContext";
import Pagination from "../UI/Pagination";
import type { JSX } from "react";

type PaginationLayoutProps<T, F> = {
    context: React.Context<ContextPageType<T, F> | undefined>
    children: (items: T[]) => React.ReactNode
    loadingComponent: React.ReactNode,
    errorComponent:  React.ReactNode

}

export default function PaginationLayout<T, F>({ context, children, errorComponent, loadingComponent  }: PaginationLayoutProps<T, F>) {
    const { pageData } = usePageContext<T, F>(context);

    const {
        pageResponse,
        isLoading,
        error,
        changePage,
    } = pageData;

    if (isLoading) return loadingComponent

    if (error) return errorComponent

    const startElement = (pageResponse.actualPage * pageResponse.pageSize) + 1;
    const endElement = pageResponse.hasNext ?
        startElement - 1 + pageResponse.pageSize : pageResponse.totalElements;


    return (
        <main className="container mx-auto">
            <Pagination
                page={pageResponse.actualPage}
                start={startElement}
                end={endElement}
                totalElements={pageResponse.totalElements}
                hasNext={pageResponse.hasNext}
                hasPrevious={pageResponse.hasPrevious}
                changePage={changePage}
            />

            <section>{children(pageResponse.data)}</section>

            <Pagination
                page={pageResponse.actualPage}
                start={startElement}
                end={endElement}
                totalElements={pageResponse.totalElements}
                hasNext={pageResponse.hasNext}
                hasPrevious={pageResponse.hasPrevious}
                changePage={changePage}
            />

        </main>
    );
}
