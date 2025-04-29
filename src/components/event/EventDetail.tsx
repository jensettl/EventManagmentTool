import React from 'react';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import { Event, User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import RSVPButton from './RSVPButton';
import ParticipantList from './ParticipantList';
import { useEvents } from '../../context/EventsContext';
import { users } from '../../data/mockData';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const { isAuthenticated } = useAuth();
  const { rsvpToEvent, leaveEvent } = useEvents();
  
  // Find the creator in our mock data
  const creator = users.find(user => user.id === event.createdBy);
  
  // Get all participants
  const participants = users.filter(user => 
    event.participants.includes(user.id)
  );
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
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

  // Handle RSVP
  const handleRSVP = () => {
    rsvpToEvent(event.id);
  };
  
  // Handle leave event
  const handleLeave = () => {
    leaveEvent(event.id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 md:h-96">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
            event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        
        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <Tag className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{event.title}</h1>
          
          {/* Creator info */}
          {creator && (
            <div className="mt-4 flex items-center">
              <img 
                src={creator.avatar} 
                alt={creator.name}
                className="w-8 h-8 rounded-full border-2 border-white mr-2" 
              />
              <span>Created by {creator.name}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          {/* Main content */}
          <div className="flex-1 md:pr-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this event</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>
            
            {/* Participants section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Participants ({participants.length})
              </h3>
              <ParticipantList participants={participants} />
            </div>
          </div>
          
          {/* Sidebar with details and actions */}
          <div className="md:w-80 mt-8 md:mt-0">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4 sticky top-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Date & Time</h4>
                    <p className="text-gray-600">{formatDate(event.date)}</p>
                    <p className="text-gray-600">{formatTime(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Duration</h4>
                    <p className="text-gray-600">
                      {Math.round((new Date(event.endDate).getTime() - new Date(event.date).getTime()) / (1000 * 60 * 60))} hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
              
              {/* RSVP Button */}
              <div className="mt-6">
                {isAuthenticated ? (
                  <RSVPButton 
                    event={event} 
                    onRSVP={handleRSVP} 
                    onLeave={handleLeave} 
                  />
                ) : (
                  <div className="text-center p-4 bg-gray-100 rounded-md">
                    <p className="text-gray-700 mb-2">Sign in to RSVP for this event</p>
                    <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;