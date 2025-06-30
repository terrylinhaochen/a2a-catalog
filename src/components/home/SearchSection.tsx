
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, TrendingUp, Clock } from 'lucide-react';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: 'featured' | 'popular' | 'recent';
  setFilterType: (type: 'featured' | 'popular' | 'recent') => void;
}

const SearchSection = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType
}: SearchSectionProps) => {
  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search agents, skills, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg bg-white/90 backdrop-blur-sm border-white/20"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Button
          variant={filterType === 'featured' ? 'default' : 'outline'}
          onClick={() => setFilterType('featured')}
          className={`flex items-center gap-2 ${
            filterType === 'featured' 
              ? 'bg-white text-purple-900 hover:bg-gray-100' 
              : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Featured
        </Button>
        <Button
          variant={filterType === 'popular' ? 'default' : 'outline'}
          onClick={() => setFilterType('popular')}
          className={`flex items-center gap-2 ${
            filterType === 'popular' 
              ? 'bg-white text-purple-900 hover:bg-gray-100' 
              : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Popular
        </Button>
        <Button
          variant={filterType === 'recent' ? 'default' : 'outline'}
          onClick={() => setFilterType('recent')}
          className={`flex items-center gap-2 ${
            filterType === 'recent' 
              ? 'bg-white text-purple-900 hover:bg-gray-100' 
              : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600'
          }`}
        >
          <Clock className="w-4 h-4" />
          Recent
        </Button>
      </div>
    </>
  );
};

export default SearchSection;
