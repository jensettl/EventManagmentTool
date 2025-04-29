import React from 'react';
import { User } from '../../types';

interface ParticipantListProps {
  participants: User[];
  maxDisplayed?: number;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ 
  participants, 
  maxDisplayed = 8
}) => {
  const [showAll, setShowAll] = React.useState(false);
  
  const displayedParticipants = showAll 
    ? participants 
    : participants.slice(0, maxDisplayed);
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {displayedParticipants.map((participant) => (
          <div 
            key={participant.id} 
            className="flex items-center space-x-2 bg-gray-50 rounded-full py-1 px-3 border border-gray-100"
          >
            <img 
              src={participant.avatar} 
              alt={participant.name} 
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              {participant.name}
            </span>
          </div>
        ))}
      </div>
      
      {participants.length > maxDisplayed && (
        <button 
          onClick={toggleShowAll}
          className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          {showAll 
            ? 'Show less' 
            : `Show all ${participants.length} participants`}
        </button>
      )}
      
      {participants.length === 0 && (
        <p className="text-gray-500 italic">
          No participants yet. Be the first to join!
        </p>
      )}
    </div>
  );
};

export default ParticipantList;