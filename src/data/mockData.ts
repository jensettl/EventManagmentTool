import { User, Event, ChatMessage, EventCategory, EventStatus, AuthUser } from '../types';

// Helper function to determine event status based on date
const getEventStatus = (startDate: Date, endDate: Date): EventStatus => {
  const now = new Date();
  if (now < startDate) return 'upcoming';
  if (now > endDate) return 'past';
  return 'ongoing';
};

// Mock Users
export const users: AuthUser[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Samantha Chen',
    email: 'samantha@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Miguel Rodriguez',
    email: 'miguel@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    createdAt: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'Ava Williams',
    email: 'ava@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    createdAt: new Date('2023-04-05')
  },
  {
    id: '5',
    name: 'Jake Thompson',
    email: 'jake@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200',
    createdAt: new Date('2023-05-12')
  }
];

// Create dates for events
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const lastMonth = new Date(today);
lastMonth.setMonth(today.getMonth() - 1);

// Create end dates
const todayEnd = new Date(today);
todayEnd.setHours(today.getHours() + 3);

const tomorrowEnd = new Date(tomorrow);
tomorrowEnd.setHours(tomorrow.getHours() + 4);

const nextWeekEnd = new Date(nextWeek);
nextWeekEnd.setHours(nextWeek.getHours() + 8);

const nextMonthEnd = new Date(nextMonth);
nextMonthEnd.setHours(nextMonth.getHours() + 6);

const yesterdayEnd = new Date(yesterday);
yesterdayEnd.setHours(yesterday.getHours() + 2);

const lastWeekEnd = new Date(lastWeek);
lastWeekEnd.setHours(lastWeek.getHours() + 3);

const lastMonthEnd = new Date(lastMonth);
lastMonthEnd.setHours(lastMonth.getHours() + 4);

// Mock Events
export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the largest tech conference of the year! This event features keynote speakers from top tech companies, interactive workshops, networking opportunities, and the latest product demos. Perfect for developers, designers, and tech enthusiasts looking to stay on the cutting edge of technology trends.',
    shortDescription: 'The largest tech gathering with industry leaders and innovative workshops.',
    category: 'conference',
    date: nextMonth,
    endDate: nextMonthEnd,
    location: 'San Francisco Convention Center',
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '1',
    participants: ['1', '2', '3', '4'],
    status: getEventStatus(nextMonth, nextMonthEnd),
    createdAt: lastMonth
  },
  {
    id: '2',
    title: 'Weekend Coding Workshop',
    description: 'Intensive two-day workshop on full-stack development. Learn modern JavaScript frameworks, backend technologies, and deployment strategies. Suitable for intermediate developers looking to expand their skill set. Bring your laptop and be ready to code! Lunch and refreshments will be provided.',
    shortDescription: 'Hands-on coding sessions focusing on full-stack web development.',
    category: 'workshop',
    date: tomorrow,
    endDate: tomorrowEnd,
    location: 'Downtown Innovation Hub',
    coverImage: 'https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '2',
    participants: ['1', '2', '5'],
    status: getEventStatus(tomorrow, tomorrowEnd),
    createdAt: lastWeek
  },
  {
    id: '3',
    title: 'Summer Networking Mixer',
    description: 'Expand your professional network in a relaxed setting. This evening event includes light appetizers, drinks, and structured networking activities designed to help you make meaningful connections. Open to professionals from all industries. Business casual attire recommended.',
    shortDescription: 'Casual evening networking event for professionals across industries.',
    category: 'social',
    date: nextWeek,
    endDate: nextWeekEnd,
    location: 'Skyline Rooftop Lounge',
    coverImage: 'https://images.pexels.com/photos/2962142/pexels-photo-2962142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '3',
    participants: ['2', '3', '4'],
    status: getEventStatus(nextWeek, nextWeekEnd),
    createdAt: yesterday
  },
  {
    id: '4',
    title: 'Annual Jazz Festival',
    description: 'Experience a full day of amazing jazz performances from both established and emerging artists. Multiple stages, food vendors, and art exhibitions make this a complete cultural experience. Family-friendly event with dedicated kids\' activities area. Don\'t forget to bring a lawn chair or blanket!',
    shortDescription: 'Day-long celebration of jazz music with multiple performance stages.',
    category: 'concert',
    date: today,
    endDate: todayEnd,
    location: 'Central Park Amphitheater',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '4',
    participants: ['1', '4', '5'],
    status: getEventStatus(today, todayEnd),
    createdAt: lastWeek
  },
  {
    id: '5',
    title: 'Charity 5K Run',
    description: 'Run for a cause! This annual 5K raises funds for local education initiatives. Suitable for all fitness levels - run, jog, or walk. Registration includes a t-shirt, finisher\'s medal, and post-race refreshments. Meet at the starting line 30 minutes before the race begins.',
    shortDescription: 'Community 5K run supporting local education programs.',
    category: 'sports',
    date: nextWeek,
    endDate: nextWeekEnd,
    location: 'Riverside Park Trail',
    coverImage: 'https://images.pexels.com/photos/2774589/pexels-photo-2774589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '5',
    participants: ['3', '5'],
    status: getEventStatus(nextWeek, nextWeekEnd),
    createdAt: today
  },
  {
    id: '6',
    title: 'Photography Exhibition',
    description: 'Showcasing the work of emerging photographers exploring themes of urban life and nature. The exhibition features over 50 prints and digital installations. Guided tours available twice daily. Opening night includes a reception with the artists and complimentary refreshments.',
    shortDescription: 'Visual arts exhibition featuring works from emerging photographers.',
    category: 'other',
    date: lastWeek,
    endDate: lastWeekEnd,
    location: 'Modern Art Gallery',
    coverImage: 'https://images.pexels.com/photos/3075564/pexels-photo-3075564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '2',
    participants: ['1', '2', '3', '4', '5'],
    status: getEventStatus(lastWeek, lastWeekEnd),
    createdAt: lastMonth
  },
  {
    id: '7',
    title: 'Product Launch Party',
    description: 'Be among the first to experience our revolutionary new product! The evening includes a detailed presentation, hands-on demos, and exclusive offers for attendees. Networking opportunities with industry professionals and the development team. Registration required as space is limited.',
    shortDescription: 'Exclusive evening event unveiling an innovative new product.',
    category: 'social',
    date: nextMonth,
    endDate: nextMonthEnd,
    location: 'Tech Innovation Center',
    coverImage: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '1',
    participants: ['1', '2'],
    status: getEventStatus(nextMonth, nextMonthEnd),
    createdAt: yesterday
  },
  {
    id: '8',
    title: 'Data Science Symposium',
    description: 'A day of discussions and presentations on the latest in data science, AI, and machine learning. Features keynote speakers from research institutions and industry leaders. Includes breakout sessions on specialized topics and a poster presentation session for graduate students. Continental breakfast and lunch provided.',
    shortDescription: 'Academic conference on advancements in AI and data analysis.',
    category: 'conference',
    date: lastMonth,
    endDate: lastMonthEnd,
    location: 'University Research Center',
    coverImage: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdBy: '3',
    participants: ['1', '3', '5'],
    status: getEventStatus(lastMonth, lastMonthEnd),
    createdAt: lastMonth
  }
];

// Mock Chat Messages
export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    eventId: '1',
    userId: '1',
    content: 'Looking forward to the conference! Anyone know the parking situation?',
    timestamp: new Date('2024-05-15T09:30:00')
  },
  {
    id: '2',
    eventId: '1',
    userId: '2',
    content: 'There\'s a parking garage across the street. $15 for the day.',
    timestamp: new Date('2024-05-15T09:35:00')
  },
  {
    id: '3',
    eventId: '1',
    userId: '3',
    content: 'Thanks for the info! I\'m planning to arrive around 8:30.',
    timestamp: new Date('2024-05-15T09:40:00')
  },
  {
    id: '4',
    eventId: '1',
    userId: '4',
    content: 'Does anyone know if the keynote will be recorded?',
    timestamp: new Date('2024-05-15T10:15:00')
  },
  {
    id: '5',
    eventId: '1',
    userId: '1',
    content: 'Yes, all sessions will be available online a week after the event.',
    timestamp: new Date('2024-05-15T10:20:00'),
    attachments: [
      {
        type: 'link',
        url: 'https://techconference.example.com/recordings'
      }
    ]
  },
  {
    id: '6',
    eventId: '2',
    userId: '1',
    content: 'What should we prepare before the workshop?',
    timestamp: new Date('2024-05-16T14:00:00')
  },
  {
    id: '7',
    eventId: '2',
    userId: '2',
    content: 'Just make sure you have Node.js and VSCode installed. I\'ll send a full setup guide later today.',
    timestamp: new Date('2024-05-16T14:10:00')
  },
  {
    id: '8',
    eventId: '3',
    userId: '2',
    content: 'Who else is attending from the marketing department?',
    timestamp: new Date('2024-05-17T11:30:00')
  },
  {
    id: '9',
    eventId: '3',
    userId: '3',
    content: 'I\'ll be there with a few colleagues from design team!',
    timestamp: new Date('2024-05-17T11:45:00'),
    attachments: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ]
  },
  {
    id: '10',
    eventId: '4',
    userId: '4',
    content: 'The lineup for this year looks amazing!',
    timestamp: new Date('2024-05-18T09:00:00')
  },
  {
    id: '11',
    eventId: '5',
    userId: '3',
    content: 'Is there a bag check available at the run?',
    timestamp: new Date('2024-05-19T16:20:00')
  },
  {
    id: '12',
    eventId: '5',
    userId: '5',
    content: 'Yes, there will be a secure area to leave small items during the race.',
    timestamp: new Date('2024-05-19T16:25:00')
  }
];