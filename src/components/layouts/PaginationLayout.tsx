import type React from "react";
import type {  ContextKeys, PageContextMap } from "../../types";
import { usePageContext } from "../hooks/usePageContext";
import Pagination from "../UI/Pagination";

type PaginationLayoutProps<K extends ContextKeys> = {
  context: K;
  children: (items: PageContextMap[K][]) => React.ReactNode;
  loadingComponent: React.ReactNode;
  errorComponent: React.ReactNode;
};

export default function PaginationLayout<K extends ContextKeys>({ context, children, errorComponent, loadingComponent  }: PaginationLayoutProps<K>) {
    const { pageData } = usePageContext(context);

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

            <section>{children(pageResponse.data as any)}</section>

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
