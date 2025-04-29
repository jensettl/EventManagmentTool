import React from 'react';
import { Calendar, UserMinus } from 'lucide-react';
import { Event } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface RSVPButtonProps {
  event: Event;
  onRSVP: () => void;
  onLeave: () => void;
}

const RSVPButton: React.FC<RSVPButtonProps> = ({ event, onRSVP, onLeave }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return null;
  }
  
  const isParticipant = event.participants.includes(currentUser.id);
  const isPastEvent = event.status === 'past';

  if (isParticipant) {
    return (
      <div className="space-y-3">
        <div className="bg-green-100 text-green-800 rounded-md p-3 text-center">
          You're attending this event!
        </div>
        <button
          onClick={onLeave}
          disabled={isPastEvent}
          className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
            isPastEvent
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          }`}
        >
          <UserMinus className="h-4 w-4 mr-2" />
          {isPastEvent ? "Can't cancel past event" : "Cancel RSVP"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onRSVP}
      disabled={isPastEvent}
      className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
        isPastEvent
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
      }`}
    >
      <Calendar className="h-4 w-4 mr-2" />
      {isPastEvent ? "Event has ended" : "RSVP to this event"}
    </button>
  );
};

export default RSVPButton;