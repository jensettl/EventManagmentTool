import React, { useState } from 'react';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import EventGrid from '../components/dashboard/EventGrid';
import { Link } from 'react-router-dom';
import { Calendar, CalendarPlus } from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';

const MyEvents: React.FC = () => {
  const { events, loading } = useEvents();
  const { currentUser, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Filter events where the user is a participant
  const myEvents = isAuthenticated && currentUser
    ? events.filter(event => event.participants.includes(currentUser.id))
    : [];
  
  // Group events by status - combine ongoing and upcoming
  const futureEvents = myEvents.filter(event => 
    event.status === 'ongoing' || event.status === 'upcoming'
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastEvents = myEvents.filter(event => event.status === 'past');
  
  if (!isAuthenticated) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">Sign in to view your events</h2>
            <p className="mt-1 text-sm text-gray-500">
              You need to be logged in to see events you're participating in.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Auth Modal */}
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your events...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (myEvents.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No events yet</h2>
            <p className="mt-1 text-sm text-gray-500">
              You're not participating in any events. Browse events to find something you're interested in!
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Browse Events
              </Link>
              <Link
                to="/create-event"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="mt-2 text-sm text-gray-500">
            Events you're participating in or have signed up for.
          </p>
        </div>
        
        <div className="space-y-12">
          {futureEvents.length > 0 && (
            <EventGrid 
              events={futureEvents} 
              loading={loading} 
              title="Upcoming & Ongoing Events" 
            />
          )}
          
          {pastEvents.length > 0 && (
            <EventGrid 
              events={pastEvents} 
              loading={loading} 
              title="Your Past Events" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;