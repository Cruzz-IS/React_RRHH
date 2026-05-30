import { useState } from 'react';
 
interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}
 
export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions = {}) => {
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
 
  const goToPage = (page: number) => setPageNumber(page);
  const nextPage = () => setPageNumber((p) => p + 1);
  const prevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const resetPage = () => setPageNumber(1);
 
  return {
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
};