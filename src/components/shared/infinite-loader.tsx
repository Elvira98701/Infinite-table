import { useCallback, useRef } from "react";
import { fetchTableData } from "@/services/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ApiTableResponse } from "@/@types/api";
import { Table } from "./table";
import { Preloader } from "./preloader";

export const InfiniteLoader = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ApiTableResponse, Error>({
    queryKey: ["infiniteTable"],
    queryFn: fetchTableData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const lastRowRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return status === "pending" ? (
    <Preloader />
  ) : status === "error" ? (
    <p className="text-red-600">Error: {error.message}</p>
  ) : (
    <div className="custom-scrollbar w-full overflow-x-auto">
      <Table tableData={data} lastRowRef={lastRowRef} />
      {isFetchingNextPage && <p className="text-center py-3">Loading...</p>}
    </div>
  );
};
