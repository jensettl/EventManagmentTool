import React, { useState, useRef, useEffect } from 'react';
import { Calendar, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Calendar className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EventHub</span>
            </Link>
            
            {/* Desktop navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/dashboard' 
                    ? 'text-purple-700 bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                to="/my-events" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/my-events' 
                    ? 'text-purple-700 bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={closeMenu}
              >
                My Events
              </Link>
              <Link 
                to="/create-event" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/create-event' 
                    ? 'text-purple-700 bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={closeMenu}
              >
                Create Event
              </Link>
            </nav>
          </div>
          
          {/* User section */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 max-w-xs bg-white text-sm focus:outline-none p-2 rounded-full"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                  />
                  <span className="hidden md:inline-block font-medium text-gray-700">
                    {currentUser?.name}
                  </span>
                </button>
                
                {/* Profile dropdown */}
                {isProfileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center ml-4 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
            <Link
              to="/dashboard"
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                location.pathname === '/dashboard'
                  ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-700'
              }`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/my-events"
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                location.pathname === '/my-events'
                  ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-700'
              }`}
              onClick={closeMenu}
            >
              My Events
            </Link>
            <Link
              to="/create-event"
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                location.pathname === '/create-event'
                  ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-700'
              }`}
              onClick={closeMenu}
            >
              Create Event
            </Link>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;