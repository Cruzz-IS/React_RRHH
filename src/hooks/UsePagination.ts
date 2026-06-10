import { useState } from 'react';
 
interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}
 
interface UsePaginationReturn {
  pageNumber: number;
  pageSize: number;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}
 
export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions = {}): UsePaginationReturn => {
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [pageSize,   setPageSize]   = useState(initialPageSize);
 
  return {
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    nextPage:  () => setPageNumber((p) => p + 1),
    prevPage:  () => setPageNumber((p) => Math.max(1, p - 1)),
    resetPage: () => setPageNumber(1),
  };
};