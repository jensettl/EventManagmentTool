// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

export interface AuthUser extends User {
  password: string; // Note: In a real app, passwords would be hashed on the server
}

export type EventCategory = 
  | 'conference' 
  | 'workshop' 
  | 'social' 
  | 'concert' 
  | 'sports' 
  | 'other';

export type EventStatus = 'upcoming' | 'ongoing' | 'past';

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  date: Date;
  endDate: Date;
  location: string;
  coverImage: string;
  createdBy: string; // User ID
  participants: string[]; // User IDs
  status: EventStatus;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'link';
    url: string;
  }[];
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export interface EventsContextType {
  events: Event[];
  filteredEvents: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
  filterEvents: (category?: EventCategory, searchQuery?: string) => void;
  getEventById: (id: string) => Event | undefined;
  rsvpToEvent: (eventId: string) => void;
  leaveEvent: (eventId: string) => void;
}

export interface ChatContextType {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (eventId: string, content: string, attachments?: { type: 'image' | 'link', url: string }[]) => void;
  getEventMessages: (eventId: string) => ChatMessage[];
}