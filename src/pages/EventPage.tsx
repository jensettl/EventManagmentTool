import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventDetail from '../components/event/EventDetail';
import ChatWindow from '../components/event/ChatWindow';
import { CalendarX, ArrowLeft } from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, selectedEvent, loading } = useEvents();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      const event = getEventById(id);
      if (!event && !loading) {
        // If event not found and not loading, redirect to dashboard
        navigate('/dashboard');
      }
    }
  }, [id, getEventById, navigate, loading]);

  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  if (!selectedEvent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <CalendarX className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Event not found</h2>
          <p className="mt-1 text-sm text-gray-500">
            The event you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </button>
        
        <EventDetail 
          event={selectedEvent} 
          onSignInClick={() => setIsAuthModalOpen(true)} 
        />
        
        {/* Chat section */}
        <div className="mt-8">
          <ChatWindow 
            eventId={selectedEvent.id} 
            onSignInClick={() => setIsAuthModalOpen(true)}
          />
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default EventPage;