import React, { useEffect } from 'react';
import { useEvents } from '../context/EventsContext';
import EventGrid from '../components/dashboard/EventGrid';
import EventFilter from '../components/dashboard/EventFilter';
import { EventCategory } from '../types';
import { useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { filteredEvents, loading, filterEvents } = useEvents();
  const location = useLocation();
  
  // Get category from URL query params if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category') as EventCategory | null;
    
    if (categoryParam) {
      filterEvents(categoryParam);
    }
  }, [location.search, filterEvents]);
  
  // Filter handler
  const handleFilterChange = (category?: EventCategory, searchQuery?: string) => {
    filterEvents(category, searchQuery);
  };
  
  // Group events by status - combine ongoing and upcoming
  const futureEvents = filteredEvents.filter(event => 
    event.status === 'ongoing' || event.status === 'upcoming'
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastEvents = filteredEvents.filter(event => event.status === 'past');
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Discover Amazing Events
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find and join events that match your interests, connect with others, and create memorable experiences.
          </p>
        </div>
        
        {/* Filters */}
        <EventFilter onFilterChange={handleFilterChange} />
        
        {/* Event Grids by Status */}
        <div className="space-y-12">
          {futureEvents.length > 0 && (
            <EventGrid 
              events={futureEvents} 
              loading={loading} 
              title="Upcoming Events" 
            />
          )}
          
          {pastEvents.length > 0 && (
            <EventGrid 
              events={pastEvents} 
              loading={loading} 
              title="Past Events" 
            />
          )}
          
          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-medium text-gray-900">No events found</h2>
              <p className="mt-2 text-gray-500">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;