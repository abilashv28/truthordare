import type { ViewType } from "../types";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  view: ViewType;
  onToggleView: () => void;
}

export default function Navigation({ view, onToggleView }: NavigationProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const isBlogPath = location.pathname.startsWith('/blog');
  const [showMessage, setShowMessage] = useState(false);
  const [showNewDot, setShowNewDot] = useState(true);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if it's the first time the user visits
    const hasVisitedBefore = localStorage.getItem('TRUTH_OR_DARE_HAS_VISITED_SECRET_MESSAGE');
    const hasClickedFeature = localStorage.getItem('TRUTH_OR_DARE_HAS_CLICKED_SECRET_MESSAGE');
    const hasAcknowledgedMessage = localStorage.getItem('TRUTH_OR_DARE_HAS_ACKNOWLEDGED_MESSAGE');
    
    // Show the red dot only if user hasn't clicked the feature yet or acknowledged the message
    setShowNewDot(!hasClickedFeature && !hasAcknowledgedMessage);
    
    if (!hasVisitedBefore) {
      // Set a small delay before showing the message
      setTimeout(() => {
        setShowMessage(true);
        // Mark that the user has seen the message
        localStorage.setItem('TRUTH_OR_DARE_HAS_VISITED_SECRET_MESSAGE', 'true');
        // We'll keep the red dot until they click "Got it"
      }, 1000);
    }
    
    // Add event listener to detect clicks outside the sidebar
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidePanel(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSecretMessageClick = () => {
    // Open the secret message website
    window.open('https://secretmessage.online/', '_blank');
    
    // Mark that the user has clicked the feature and hide the red dot
    localStorage.setItem('TRUTH_OR_DARE_HAS_CLICKED_SECRET_MESSAGE', 'true');
    setShowNewDot(false);
    setShowSidePanel(false); // Close side panel after clicking
  };
  
  // Close the side panel when location changes
  useEffect(() => {
    setShowSidePanel(false);
  }, [location.pathname]);
  
  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };
  
  return (
    <div className="relative w-full">
      {showMessage && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-50 w-72 text-center">
          <p className="text-gray-800 mb-2">🎉 We've just launched Secret Message!</p>
          <p className="text-gray-600 text-sm mb-3">Send anonymous messages to friends and loved ones.</p>
          <button 
            onClick={() => {
              setShowMessage(false);
              setShowNewDot(false);
              // Mark that the user has acknowledged the message
              localStorage.setItem('TRUTH_OR_DARE_HAS_ACKNOWLEDGED_MESSAGE', 'true');
            }}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Got it
          </button>
        </div>
      )}
      
      {/* Side Panel (Mobile) */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showSidePanel ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <img src="/TDlogo.png" alt="Truth or Dare Logo" className="h-10 w-auto" />
            <button 
              onClick={() => setShowSidePanel(false)}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className={`px-4 py-3 rounded-lg font-semibold transition flex items-center ${
                !isBlogPath
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (view === "blog") onToggleView();
                setShowSidePanel(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {t('navigation.game')}
            </Link>
            
            <Link
              to="/blog"
              className={`px-4 py-3 rounded-lg font-semibold transition flex items-center ${
                isBlogPath
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (view === "game") onToggleView();
                setShowSidePanel(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              {t('navigation.blog')}
            </Link>
            
            <button
              onClick={handleSecretMessageClick}
              className="px-4 py-3 rounded-lg font-semibold transition bg-purple-500 text-white hover:bg-purple-600 flex items-center relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('navigation.secretMessage')}
              {showNewDot && (
                <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </nav>
        </div>
      </div>
      
      {/* Overlay for side panel */}
      {showSidePanel && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowSidePanel(false)}
        ></div>
      )}
      
      <header className="w-full py-2">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-3 flex justify-between items-center relative">
            {/* Logo on left side */}
            <div className="flex items-center z-10 transition-all duration-200">
              <Link to="/" className="flex items-center">
                <img src="/TDlogo.png" alt="Truth or Dare Logo" className="h-10 w-auto" />
              </Link>
            </div>
            
            {/* Centered navigation elements - absolute positioning for desktop only */}
            <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-auto transition-all duration-200">
              {/* Toggle for Play Game and Blog */}
              <div className="bg-gray-200 rounded-full p-1 flex">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    !isBlogPath
                      ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    if (view === "blog") onToggleView();
                  }}
                >
                  Play Game
                </Link>
                <Link
                  to="/blog"
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    isBlogPath
                      ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    if (view === "game") onToggleView();
                  }}
                >
                  Blog
                </Link>
              </div>
            </div>
            
            {/* Right section with Secret Message button (desktop) and hamburger (mobile) */}
            <div className="flex items-center z-10 transition-all duration-200">
              {/* Secret Message button - Hidden on mobile */}
              <button
                onClick={handleSecretMessageClick}
                className="hidden md:block px-4 py-2 rounded-full font-semibold transition bg-purple-500 text-white hover:bg-purple-600 relative ml-2"
              >
                Secret Message
                {showNewDot && (
                  <>
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
                  </>
                )}
              </button>
              
              {/* Hamburger Menu Button (Mobile only) */}
              <button
                className="p-2 rounded-md hover:bg-gray-100 md:hidden relative"
                onClick={toggleSidePanel}
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Notification dot for mobile */}
                {showNewDot && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
