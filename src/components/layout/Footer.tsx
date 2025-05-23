import React, { useState } from 'react';
import { Calendar, Mail, MapPin, PhoneCall, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto prose max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'cookie' | 'accessibility' | null>(null);

  const closeModal = () => setActiveModal(null);

  const termsContent = (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
      <p className="text-gray-700 mb-6">By accessing and using EventHub, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">2. User Accounts</h3>
      <p className="text-gray-700 mb-6">You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">3. Event Creation and Participation</h3>
      <p className="text-gray-700 mb-6">Users may create and participate in events subject to these terms. Event creators are responsible for the accuracy of event information.</p>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">4. Code of Conduct</h3>
      <p className="text-gray-700 mb-6">Users must behave respectfully and professionally. Harassment, hate speech, or discriminatory behavior is not tolerated.</p>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h3>
      <p className="text-gray-700">Content posted on EventHub must respect copyright and intellectual property rights. Users retain ownership of their content.</p>
    </div>
  );

  const privacyContent = (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Information We Collect</h3>
      <p className="text-gray-700 mb-4">We collect information you provide directly, including:</p>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Name and contact information</li>
        <li>Profile details and preferences</li>
        <li>Event participation history</li>
        <li>Communications within the platform</li>
      </ul>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">How We Use Your Information</h3>
      <p className="text-gray-700 mb-4">Your information helps us:</p>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Personalize your experience</li>
        <li>Improve our services</li>
        <li>Communicate about events and updates</li>
        <li>Ensure platform security</li>
      </ul>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">Data Protection</h3>
      <p className="text-gray-700">We implement security measures to protect your personal information and maintain data privacy.</p>
    </div>
  );

  const cookieContent = (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Cookies</h3>
      <p className="text-gray-700 mb-6">Cookies are small text files stored on your device that help us improve your experience.</p>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h3>
      <ul className="mb-6 text-gray-700">
        <li className="mb-2"><strong className="text-gray-900">Essential Cookies:</strong> Required for basic platform functionality</li>
        <li className="mb-2"><strong className="text-gray-900">Preference Cookies:</strong> Remember your settings and choices</li>
        <li className="mb-2"><strong className="text-gray-900">Analytics Cookies:</strong> Help us understand how you use our platform</li>
        <li className="mb-2"><strong className="text-gray-900">Marketing Cookies:</strong> Used to deliver relevant content</li>
      </ul>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">Managing Cookies</h3>
      <p className="text-gray-700">You can control cookies through your browser settings. Note that disabling certain cookies may limit platform functionality.</p>
    </div>
  );

  const accessibilityContent = (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h3>
      <p className="text-gray-700 mb-6">EventHub is committed to ensuring digital accessibility for people of all abilities.</p>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">Accessibility Features</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Screen reader compatibility</li>
        <li>Keyboard navigation support</li>
        <li>Color contrast compliance</li>
        <li>Alt text for images</li>
        <li>Resizable text support</li>
      </ul>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback</h3>
      <p className="text-gray-700">We welcome your feedback on the accessibility of EventHub. Please let us know if you encounter accessibility barriers.</p>
    </div>
  );
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and quick description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold">EventHub</span>
            </Link>
            <p className="text-gray-400 mt-2">
              Discover, join, and create amazing events in your community. Connect with like-minded people and never miss out on what matters to you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Events Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-events" className="text-gray-400 hover:text-white transition-colors">
                  My Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-400 hover:text-white transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard?category=conference" className="text-gray-400 hover:text-white transition-colors">
                  Conferences
                </Link>
              </li>
              <li>
                <Link to="/dashboard?category=workshop" className="text-gray-400 hover:text-white transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/dashboard?category=social" className="text-gray-400 hover:text-white transition-colors">
                  Social Events
                </Link>
              </li>
              <li>
                <Link to="/dashboard?category=concert" className="text-gray-400 hover:text-white transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link to="/dashboard?category=sports" className="text-gray-400 hover:text-white transition-colors">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Event Street, San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-2" />
                <a href="mailto:info@eventhub.com" className="text-gray-400 hover:text-white transition-colors">
                  info@eventhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social links and copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} EventHub. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Terms and privacy */}
        <div className="mt-4 text-center md:text-left">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
            <li>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal('cookie')}
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal('accessibility')}
                className="hover:text-white transition-colors"
              >
                Accessibility
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Policy Modals */}
      <PolicyModal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms of Service"
        content={termsContent}
      />
      <PolicyModal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
        content={privacyContent}
      />
      <PolicyModal
        isOpen={activeModal === 'cookie'}
        onClose={closeModal}
        title="Cookie Policy"
        content={cookieContent}
      />
      <PolicyModal
        isOpen={activeModal === 'accessibility'}
        onClose={closeModal}
        title="Accessibility"
        content={accessibilityContent}
      />
    </footer>
  );
};

export default Footer;