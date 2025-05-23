import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EventPage from './pages/EventPage';
import MyEvents from './pages/MyEvents';
import CreateEvent from './pages/CreateEvent';
import { AuthProvider } from './context/AuthContext';
import { EventsProvider } from './context/EventsContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <ChatProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/event/:id" element={<EventPage />} />
                  <Route path="/my-events" element={<MyEvents />} />
                  <Route path="/create-event" element={<CreateEvent />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ChatProvider>
      </EventsProvider>
    </AuthProvider>
  );
}

export default App;