import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { EventCategory } from '../../types';

interface EventFilterProps {
  onFilterChange: (category?: EventCategory, searchQuery?: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | undefined>(undefined);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories: { value: EventCategory; label: string }[] = [
    { value: 'conference', label: 'Conferences' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'social', label: 'Social Events' },
    { value: 'concert', label: 'Concerts' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onFilterChange(selectedCategory, e.target.value);
  };

  const handleCategoryChange = (category: EventCategory | undefined) => {
    setSelectedCategory(category);
    onFilterChange(category, searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(undefined);
    onFilterChange(undefined, '');
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="max-w-7xl mx-auto">
        {/* Search and filter toggle for mobile */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events by title, description, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <button
            type="button"
            onClick={toggleFilters}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
        
        {/* Filter options - always visible on desktop, toggleable on mobile */}
        <div className={`mt-4 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap items-center">
            <span className="mr-3 text-sm font-medium text-gray-700">Categories:</span>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <button
                onClick={() => handleCategoryChange(undefined)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === undefined
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters */}
          {(searchQuery || selectedCategory) && (
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    "{searchQuery}"
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        onFilterChange(selectedCategory, '');
                      }}
                      className="ml-1 text-purple-500 hover:text-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(undefined);
                        onFilterChange(undefined, searchQuery);
                      }}
                      className="ml-1 text-purple-500 hover:text-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;