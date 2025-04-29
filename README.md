# Event Management System

## Description

This is a simple event management system that allows you to create, manage, and attend events.

## Background

The app is built with bolt. Initial prompt as follows:

```text
Create an event-management web application with the following specifications:

Technical Requirements:

User Authentication:
- Implement email/password registration and login
- Include social login options (Google, Facebook) as a bonus
- Store user profiles with name, email, and avatar

Event Dashboard:
- Display events in a responsive grid layout using cards
- Sort events by date, with upcoming events first
- Include filters for different event categories
- Each card should show:
  - Event title and description
  - Date and time
  - Location
  - Number of participants
  - Event status (upcoming, ongoing, past)
  - Event cover image

Event Details & Chat:
- Clicking an event card opens a detailed view with:
  - Full event information
  - Participant list with avatars
- RSVP functionality
- Real-time chat window
- Chat features should include:
  - Text messages with timestamps
  - User avatars and names
  - Ability to share images and links
  - Message notifications

Data Structure:
- Start with mock data for 5-10 events
- Include sample users and chat messages
- Structure the data to support easy scaling

Development Phases:
- Begin with authentication and mock data display
- Add event creation and management
- Implement the chat functionality
- Polish the UI/UX

Please provide the implementation focusing on clean code architecture and real-time updates.

```

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
