import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyFloatingButton from '../../components/ui/EmergencyFloatingButton';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EmergencyCountdown from './components/EmergencyCountdown';
import EmergencyStatus from './components/EmergencyStatus';
import MedicalInformation from './components/MedicalInformation';
import EmergencyControls from './components/EmergencyControls';
import LocationDisplay from './components/LocationDisplay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const EmergencyResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Emergency state management
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState('medical');
  const [showCountdown, setShowCountdown] = useState(false);
  const [emergencyStartTime, setEmergencyStartTime] = useState(null);
  
  // Emergency data state
  const [emergencyData, setEmergencyData] = useState({
    locationShared: false,
    location: '',
    ambulanceNotified: false,
    policeNotified: false,
    hospitalNotified: false,
    familyNotified: false,
    contactsNotified: 0
  });

  // Settings state
  const [emergencySettings, setEmergencySettings] = useState({
    sensitivity: 'medium',
    autoActivation: true,
    countdownDuration: 10
  });

  // Check if emergency was triggered from external source
  useEffect(() => {
    if (location?.state?.emergencyType) {
      handleTriggerEmergency(location?.state?.emergencyType);
    }
  }, [location?.state]);

  // Simulate shake detection
  useEffect(() => {
    if (emergencySettings?.autoActivation) {
      const handleDeviceMotion = (event) => {
        const acceleration = event?.accelerationIncludingGravity;
        if (acceleration) {
          const totalAcceleration = Math.sqrt(
            acceleration?.x * acceleration?.x +
            acceleration?.y * acceleration?.y +
            acceleration?.z * acceleration?.z
          );
          
          // Simulate shake detection threshold
          if (totalAcceleration > 20 && !isEmergencyActive) {
            handleTriggerEmergency('accident');
          }
        }
      };

      window.addEventListener('devicemotion', handleDeviceMotion);
      return () => window.removeEventListener('devicemotion', handleDeviceMotion);
    }
  }, [emergencySettings?.autoActivation, isEmergencyActive]);

  const handleTriggerEmergency = (type = 'medical') => {
    setEmergencyType(type);
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setIsEmergencyActive(true);
    setEmergencyStartTime(new Date());
    
    // Simulate progressive emergency notifications
    simulateEmergencyProcess();
  };

  const handleCancelEmergency = () => {
    setShowCountdown(false);
    setIsEmergencyActive(false);
    setEmergencyStartTime(null);
    resetEmergencyData();
  };

  const simulateEmergencyProcess = () => {
    // Simulate location sharing
    setTimeout(() => {
      setEmergencyData(prev => ({
        ...prev,
        locationShared: true,
        location: "Connaught Place, New Delhi"
      }));
    }, 1000);

    // Simulate ambulance notification
    setTimeout(() => {
      setEmergencyData(prev => ({
        ...prev,
        ambulanceNotified: true
      }));
    }, 3000);

    // Simulate police notification
    setTimeout(() => {
      setEmergencyData(prev => ({
        ...prev,
        policeNotified: true
      }));
    }, 4500);

    // Simulate hospital notification
    setTimeout(() => {
      setEmergencyData(prev => ({
        ...prev,
        hospitalNotified: true
      }));
    }, 6000);

    // Simulate family notification
    setTimeout(() => {
      setEmergencyData(prev => ({
        ...prev,
        familyNotified: true,
        contactsNotified: 3
      }));
    }, 7500);
  };

  const resetEmergencyData = () => {
    setEmergencyData({
      locationShared: false,
      location: '',
      ambulanceNotified: false,
      policeNotified: false,
      hospitalNotified: false,
      familyNotified: false,
      contactsNotified: 0
    });
  };

  const handleTestSystem = () => {
    alert('Emergency system test completed successfully!\n\n✓ GPS Location: Working\n✓ Shake Detection: Active\n✓ Emergency Contacts: 3 configured\n✓ Network Connection: Strong');
  };

  const handleUpdateSettings = (newSettings) => {
    setEmergencySettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleLocationUpdate = (locationData) => {
    setEmergencyData(prev => ({
      ...prev,
      locationShared: true,
      location: locationData?.address
    }));
  };

  const handleEndEmergency = () => {
    setIsEmergencyActive(false);
    setEmergencyStartTime(null);
    resetEmergencyData();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emergency rounded-xl flex items-center justify-center">
                  <Icon name="Zap" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-text-primary">
                    Emergency Response
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Accident detection and emergency alert system
                  </p>
                </div>
              </div>
              
              {isEmergencyActive && (
                <Button
                  variant="destructive"
                  onClick={handleEndEmergency}
                  iconName="Square"
                  iconPosition="left"
                >
                  End Emergency
                </Button>
              )}
            </div>
          </div>

          {/* Emergency Status Banner */}
          {isEmergencyActive && (
            <div className="mb-8 p-6 bg-error/10 rounded-2xl border border-error/20 card-elevation-emergency">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center emergency-pulse">
                    <Icon name="AlertTriangle" size={24} color="white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-error">
                      EMERGENCY ACTIVE
                    </h2>
                    <p className="text-text-secondary">
                      Started: {emergencyStartTime?.toLocaleTimeString()} • Type: {emergencyType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-heading font-bold text-error">
                    {emergencyStartTime && 
                      Math.floor((new Date() - emergencyStartTime) / 60000)
                    }:{emergencyStartTime && 
                      String(Math.floor(((new Date() - emergencyStartTime) % 60000) / 1000))?.padStart(2, '0')
                    }
                  </div>
                  <p className="text-sm text-text-secondary">Duration</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Emergency Controls */}
              <EmergencyControls
                onTriggerEmergency={handleTriggerEmergency}
                onTestSystem={handleTestSystem}
                isEmergencyActive={isEmergencyActive}
                emergencySettings={emergencySettings}
                onUpdateSettings={handleUpdateSettings}
              />

              {/* Location Display */}
              <LocationDisplay
                isEmergencyActive={isEmergencyActive}
                onLocationUpdate={handleLocationUpdate}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Emergency Status */}
              <EmergencyStatus
                emergencyData={emergencyData}
                isActive={isEmergencyActive}
              />

              {/* Medical Information */}
              <MedicalInformation userMedicalData={{
                bloodType: 'O+',
                allergies: ['Penicillin'],
                medications: ['Aspirin'],
                conditions: ['Diabetes'],
                emergencyContact: 'John Doe - +91 98765 43210'
              }} />
            </div>
          </div>

          {/* System Information */}
          <div className="mt-8 p-6 bg-card rounded-2xl card-elevation-1 border medical-border">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Info" size={20} color="var(--color-primary)" />
              <h3 className="font-semibold text-text-primary">System Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Detection Status:</span>
                <p className="font-medium text-success">
                  {emergencySettings?.autoActivation ? 'Active' : 'Disabled'}
                </p>
              </div>
              <div>
                <span className="text-text-secondary">Sensitivity:</span>
                <p className="font-medium text-text-primary capitalize">
                  {emergencySettings?.sensitivity}
                </p>
              </div>
              <div>
                <span className="text-text-secondary">Emergency Contacts:</span>
                <p className="font-medium text-text-primary">3 configured</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Emergency Countdown Modal */}
      <EmergencyCountdown
        isActive={showCountdown}
        onCancel={handleCancelEmergency}
        onComplete={handleCountdownComplete}
        emergencyType={emergencyType}
        initialCountdown={emergencySettings?.countdownDuration}
      />
      {/* Emergency Floating Button */}
      <EmergencyFloatingButton />
    </div>
  );
};

export default EmergencyResponse;