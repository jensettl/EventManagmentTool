import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Event, EventCategory } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Category badge styles
  const getCategoryStyle = (category: EventCategory) => {
    const styles = {
      conference: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      social: 'bg-purple-100 text-purple-800',
      concert: 'bg-pink-100 text-pink-800',
      sports: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return styles[category];
  };

  // Status badge styles
  const getStatusStyle = () => {
    switch (event.status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'past':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link 
      to={`/event/${event.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(event.category)}`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {event.shortDescription}
          </p>
        </div>
        
        {/* Details section - now fixed at bottom */}
        <div className="mt-auto space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            <span>{formatTime(event.date)}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-purple-500" />
            <span>{event.participants.length} participants</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;