import React, { createContext, useState, useEffect, useContext } from 'react';
import { EventsContextType, Event, EventCategory } from '../types';
import { events as mockEvents } from '../data/mockData';
import { useAuth } from './AuthContext';

// Create the Events Context
export const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Custom hook to use the Events Context
export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

interface EventsProviderProps {
  children: React.ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { currentUser } = useAuth();

  // Initialize events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        
        // Sort events by date (upcoming first)
        const sortedEvents = [...mockEvents].sort((a, b) => {
          // First sort by status
          if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
          if (a.status !== 'ongoing' && b.status === 'ongoing') return 1;
          if (a.status === 'upcoming' && b.status === 'past') return -1;
          if (a.status === 'past' && b.status === 'upcoming') return 1;
          
          // Then sort by date within the same status
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  // Filter events by category and/or search query
  const filterEvents = (category?: EventCategory, searchQuery?: string) => {
    let filtered = [...events];
    
    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(event => event.category === category);
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  };

  // Get a specific event by ID
  const getEventById = (id: string) => {
    const event = events.find(event => event.id === id);
    if (event) {
      setSelectedEvent(event);
    }
    return event;
  };

  // Handle RSVP to an event
  const rsvpToEvent = (eventId: string) => {
    if (!currentUser) return;
    
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId && !event.participants.includes(currentUser.id)) {
          const updatedEvent = {
            ...event,
            participants: [...event.participants, currentUser.id]
          };
          
          // Update selectedEvent if this is the current one
          if (selectedEvent && selectedEvent.id === eventId) {
            setSelectedEvent(updatedEvent);
          }
          
          return updatedEvent;
        }
        return event;
      })
    );
    
    // Also update the filtered events
    setFilteredEvents(prevFiltered => 
      prevFiltered.map(event => {
        if (event.id === eventId && !event.participants.includes(currentUser.id)) {
          return {
            ...event,
            participants: [...event.participants, currentUser.id]
          };
        }
        return event;
      })
    );
  };

  // Handle leaving an event
  const leaveEvent = (eventId: string) => {
    if (!currentUser) return;
    
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId && event.participants.includes(currentUser.id)) {
          const updatedEvent = {
            ...event,
            participants: event.participants.filter(id => id !== currentUser.id)
          };
          
          // Update selectedEvent if this is the current one
          if (selectedEvent && selectedEvent.id === eventId) {
            setSelectedEvent(updatedEvent);
          }
          
          return updatedEvent;
        }
        return event;
      })
    );
    
    // Also update the filtered events
    setFilteredEvents(prevFiltered => 
      prevFiltered.map(event => {
        if (event.id === eventId && event.participants.includes(currentUser.id)) {
          return {
            ...event,
            participants: event.participants.filter(id => id !== currentUser.id)
          };
        }
        return event;
      })
    );
  };

  const contextValue: EventsContextType = {
    events,
    filteredEvents,
    selectedEvent,
    loading,
    error,
    filterEvents,
    getEventById,
    rsvpToEvent,
    leaveEvent
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};