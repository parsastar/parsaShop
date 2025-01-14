import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "../ui/skeleton";
import { usePathname, useSearchParams } from "next/navigation";

export function PaginationList({
  currentPage,
  totalPages,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const toWhere = (value: string) => {
    const params = new URLSearchParams(searchParam.toString());
    params.set("page", value);
    return `${pathname}?${params}`;
  };
  const renderPaginationItems = () => {
    const pages = [];
    const delta = 2; // Number of pages before/after the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around the current page
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={toWhere(String(i))}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        pages[pages.length - 1]?.type !== PaginationEllipsis // Add ellipsis for skipped ranges
      ) {
        pages.push(<PaginationEllipsis key={`ellipsis-${i}`} />);
      }
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={toWhere(String(currentPage - 1 > 0 ? currentPage - 1 : 1))}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href={toWhere(
              String(
                currentPage + 1 < totalPages ? currentPage + 1 : totalPages
              )
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export const PaginationMock = () => {
  return (
    <div className="flex w-full justify-center gap-4">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
};
