import { useContext } from "react";
import type { ContextPageType } from "../../types";

export function usePageContext<T, F>(Context: React.Context<ContextPageType<T, F> | undefined>) {
  const context = useContext(Context);
  if (!context) throw new Error("usePageContext deber ser usado dentro un Provider");
  return context;
}