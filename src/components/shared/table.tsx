import type { ApiTableResponse, TableRow } from "@/@types/api";
import { cn } from "@/lib/utils";
import { fetchHeaders } from "@/services/api";
import { useQuery, type InfiniteData } from "@tanstack/react-query";
import { memo } from "react";

interface TableProps {
  tableData: InfiniteData<ApiTableResponse, unknown> | undefined;
  lastRowRef: (node: HTMLTableRowElement | null) => void;
  className?: string;
}

export const Table = memo(
  ({ tableData, className, lastRowRef }: TableProps) => {
    const {
      isPending,
      isError,
      data: allKeys,
      error,
    } = useQuery({
      queryKey: ["headers"],
      queryFn: fetchHeaders,
    });

    return (
      <table className={cn("min-w-full", className)}>
        <thead>
          <tr className="bg-primary text-background">
            {allKeys?.columns.map((key, index) => (
              <th
                key={key}
                className={cn(
                  "px-4 py-4 text-left text-sm font-medium border-r",
                  {
                    "rounded-tl-2xl": index === 0,
                    "rounded-tr-2xl border-none":
                      index === allKeys.columns.length - 1,
                  }
                )}
              >
                {isPending ? "loading" : isError ? error.message : key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-background border">
          {tableData?.pages.map((page, pageIndex) =>
            page.data.map((row, rowIndex) => {
              const isLastPage = pageIndex === tableData.pages.length - 1;
              const isLastRow = rowIndex === page.data.length - 1;
              const ref = isLastPage && isLastRow ? lastRowRef : null;

              return (
                <tr key={row.id} ref={ref} className="border-b">
                  {allKeys?.columns.map((key) => (
                    <td key={key} className="px-4 py-2 text-sm">
                      {row[key as keyof TableRow] ?? "-"}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    );
  }
);
