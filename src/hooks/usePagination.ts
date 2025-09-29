import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialPage?: number;
  initialItemsPerPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  paginatedData: T[];
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const usePagination = <T>({
  data,
  initialPage = 1,
  initialItemsPerPage = 5
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  console.log('🔍 usePagination - data received:', data);
  console.log('🔍 usePagination - data length:', data?.length);
  console.log('🔍 usePagination - initialItemsPerPage:', initialItemsPerPage);
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Safety check to ensure data is always an array
  const safeData = data || [];
  console.log('🔍 usePagination - safeData:', safeData);
  console.log('🔍 usePagination - safeData length:', safeData.length);
  
  const totalItems = safeData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  console.log('🔍 usePagination - totalItems:', totalItems);
  console.log('🔍 usePagination - totalPages:', totalPages);
  console.log('🔍 usePagination - currentPage:', currentPage);
  console.log('🔍 usePagination - itemsPerPage:', itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return safeData.slice(startIndex, endIndex);
  }, [safeData, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  // Reset to page 1 when itemsPerPage changes
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData,
    setCurrentPage: goToPage,
    setItemsPerPage: handleItemsPerPageChange,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious
  };
};
