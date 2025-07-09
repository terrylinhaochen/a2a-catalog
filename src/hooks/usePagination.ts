import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Agent } from '@/hooks/useAgents';
import { McpServer } from '@/hooks/useMcpServers';
import { Workflow } from '@/hooks/useWorkflows';

interface UsePaginationProps {
  items: (Agent | McpServer | Workflow)[];
  itemsPerPage: number;
  searchQuery: string;
  selectedCategories: string[];
  sortBy: string;
}

export const usePagination = ({
  items,
  itemsPerPage,
  searchQuery,
  selectedCategories,
  sortBy
}: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [paginatedItems, setPaginatedItems] = useState<(Agent | McpServer | Workflow)[]>([]);

  // Handle page parameter from URL
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  // Apply filtering, sorting, and pagination
  useEffect(() => {
    // Apply client-side filtering
    let filtered = items.filter(item => {
      const matchesSearch = !searchQuery || 
                           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 ||
                             selectedCategories.some(cat => item.categories.includes(cat));
      
      return matchesSearch && matchesCategory;
    });

    // Sort items
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    setPaginatedItems(paginatedData);
    setTotalCount(filtered.length);
  }, [currentPage, searchQuery, selectedCategories, sortBy, items, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return {
    currentPage,
    totalCount,
    paginatedItems,
    handlePageChange,
    resetToFirstPage
  };
};