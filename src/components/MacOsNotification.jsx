import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const MacOSNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [animationClass, setAnimationClass] = useState('');
  const popupRef = useRef(null);
  const iconRef = useRef(null);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setIconPosition({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      });
    }
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      setAnimationClass('animate-dock');
      setTimeout(() => {
        setIsOpen(false);
        setAnimationClass('');
      }, 500);
    } else {
      setIsOpen(true);
      setAnimationClass('animate-undock');
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <div className="fixed top-4 right-4 z-50" ref={iconRef}>
        <button 
          onClick={handleToggle}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Bell 
            className={`h-6 w-6 ${hasNotification ? 'animate-[pulse_1.5s_infinite]' : ''}`}
          />
          {hasNotification && (
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {(isOpen || animationClass.includes('dock')) && (
        <div 
          ref={popupRef}
          className={`
            fixed z-40 
            w-96 bg-white/95 rounded-xl shadow-2xl
            ${animationClass}
          `}
          style={{
            top: '4rem',
            right: '1rem',
            transformOrigin: 'top right',
            willChange: 'transform, opacity'
          }}
        >
          <style jsx>{`
            @keyframes dock {
              0% {
                transform: scale(1) translate(0, 0);
                opacity: 1;
                clip-path: inset(0% 0% 0% 0% round 0.75rem);
              }
              20% {
                clip-path: inset(5% 5% 5% 5% round 0.75rem);
              }
              100% {
                transform: scale(0.1) translate(${iconPosition.x * 0.1}px, ${iconPosition.y * 0.1}px);
                opacity: 0;
                clip-path: inset(45% 45% 45% 45% round 0.75rem);
              }
            }

            @keyframes undock {
              0% {
                transform: scale(0.1) translate(${iconPosition.x * 0.1}px, ${iconPosition.y * 0.1}px);
                opacity: 0;
                clip-path: inset(45% 45% 45% 45% round 0.75rem);
              }
              80% {
                clip-path: inset(5% 5% 5% 5% round 0.75rem);
              }
              100% {
                transform: scale(1) translate(0, 0);
                opacity: 1;
                clip-path: inset(0% 0% 0% 0% round 0.75rem);
              }
            }

            .animate-dock {
              animation: dock 500ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }

            .animate-undock {
              animation: undock 500ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
          `}</style>

          {/* Content */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button 
                onClick={handleToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="text-sm text-gray-800">
                    Notification message {i + 1}
                  </p>
                  <span className="text-xs text-gray-500">
                    {i + 1} minute{i !== 0 ? 's' : ''} ago
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacOSNotification;