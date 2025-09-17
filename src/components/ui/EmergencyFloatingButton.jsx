import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyFloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const emergencyOptions = [
    {
      label: 'Medical Emergency',
      icon: 'Heart',
      action: () => handleEmergencyAction('medical'),
      color: 'bg-error'
    },
    {
      label: 'Call Ambulance',
      icon: 'Phone',
      action: () => handleEmergencyAction('ambulance'),
      color: 'bg-warning'
    },
    {
      label: 'Emergency Contacts',
      icon: 'Users',
      action: () => handleEmergencyAction('contacts'),
      color: 'bg-primary'
    }
  ];

  const handleEmergencyAction = (type) => {
    setIsEmergencyActive(true);
    setCountdown(3);
    
    // Simulate emergency countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsEmergencyActive(false);
          setIsExpanded(false);
          navigate('/emergency-response', { state: { emergencyType: type } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(0);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    if (!isEmergencyActive) {
      setIsExpanded(!isExpanded);
    }
  };

  // Auto-collapse after 10 seconds of inactivity
  useEffect(() => {
    if (isExpanded && !isEmergencyActive) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isEmergencyActive]);

  return (
    <div className="fixed bottom-6 right-6 z-1000">
      {/* Emergency Countdown Overlay */}
      {isEmergencyActive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
          <div className="bg-card p-8 rounded-2xl card-elevation-emergency text-center max-w-sm mx-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-error rounded-full flex items-center justify-center emergency-pulse">
              <Icon name="AlertTriangle" size={32} color="white" />
            </div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
              Emergency Activating
            </h3>
            <div className="text-4xl font-heading font-bold text-error mb-4">
              {countdown}
            </div>
            <p className="text-text-secondary mb-6">
              Emergency services will be contacted automatically
            </p>
            <Button
              variant="outline"
              onClick={cancelEmergency}
              className="w-full"
            >
              Cancel Emergency
            </Button>
          </div>
        </div>
      )}
      {/* Emergency Options Menu */}
      {isExpanded && !isEmergencyActive && (
        <div className="absolute bottom-20 right-0 space-y-3 mb-2">
          {emergencyOptions?.map((option, index) => (
            <div
              key={option?.label}
              className="flex items-center justify-end space-x-3 animate-in slide-in-from-right duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card px-3 py-2 rounded-lg card-elevation-2 border medical-border">
                <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                  {option?.label}
                </span>
              </div>
              <button
                onClick={option?.action}
                className={`w-12 h-12 ${option?.color} rounded-full flex items-center justify-center transition-gentle hover:scale-110 card-elevation-2`}
              >
                <Icon name={option?.icon} size={20} color="white" />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Main Emergency Button */}
      <button
        onClick={toggleExpanded}
        disabled={isEmergencyActive}
        className={`w-16 h-16 bg-emergency rounded-full flex items-center justify-center card-elevation-emergency transition-all duration-300 hover:scale-110 ${
          isExpanded ? 'rotate-45' : 'emergency-pulse'
        } ${isEmergencyActive ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Icon 
          name={isExpanded ? "Plus" : "Zap"} 
          size={24} 
          color="white" 
        />
      </button>
      {/* Emergency Button Label */}
      {!isExpanded && !isEmergencyActive && (
        <div className="absolute bottom-0 right-20 bg-card px-3 py-1 rounded-lg card-elevation-1 border medical-border opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="text-xs font-medium text-text-primary whitespace-nowrap">
            Emergency
          </span>
        </div>
      )}
    </div>
  );
};

export default EmergencyFloatingButton;