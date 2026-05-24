import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemsPerPage: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  setItemsPerPage: (items: number) => void;
  itemsPerPageOptions?: number[];
}

export function DataPagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  hasNextPage,
  hasPrevPage,
  itemsPerPage,
  goToPage,
  goToNextPage,
  goToPrevPage,
  setItemsPerPage,
  itemsPerPageOptions = [5, 10, 20, 50],
}: DataPaginationProps) {
  if (totalItems === 0) return null;

  // build page numbers to show with ellipsis
  function getPageNumbers(): (number | "ellipsis")[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (currentPage > 3) pages.push("ellipsis");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  }

  return (
    <div className='flex items-center justify-between px-4 py-3 border-t'>
      {/* showing x-y of z */}
      <p className='text-xs text-muted-foreground'>
        Showing {totalItems === 0 ? 0 : startIndex + 1}–{endIndex} of{" "}
        {totalItems}
      </p>

      <div className='flex items-center gap-4'>
        {/* items per page */}
        <div className='flex items-center gap-2 w-full'>
          <span className='text-xs text-muted-foreground'>Rows per page</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(val) => setItemsPerPage(Number(val))}
          >
            <SelectTrigger className='h-7 w-16 text-xs'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((opt) => (
                <SelectItem key={opt} value={String(opt)} className='text-xs'>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* page navigation */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={goToPrevPage}
                aria-disabled={!hasPrevPage}
                className={
                  !hasPrevPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => goToPage(page)}
                    className='cursor-pointer'
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={goToNextPage}
                aria-disabled={!hasNextPage}
                className={
                  !hasNextPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
