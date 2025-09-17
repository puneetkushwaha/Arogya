import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyControls = ({ 
  onTriggerEmergency, 
  onTestSystem, 
  isEmergencyActive,
  emergencySettings,
  onUpdateSettings 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [sensitivity, setSensitivity] = useState(emergencySettings?.sensitivity || 'medium');
  const [autoActivation, setAutoActivation] = useState(emergencySettings?.autoActivation || true);

  const emergencyTypes = [
    {
      id: 'medical',
      label: 'Medical Emergency',
      description: 'Heart attack, stroke, severe injury',
      icon: 'Heart',
      color: 'bg-error'
    },
    {
      id: 'accident',
      label: 'Accident Detection',
      description: 'Vehicle crash, fall detection',
      icon: 'AlertTriangle',
      color: 'bg-warning'
    },
    {
      id: 'fire',
      label: 'Fire Emergency',
      description: 'Fire, smoke, evacuation needed',
      icon: 'Flame',
      color: 'bg-destructive'
    },
    {
      id: 'general',
      label: 'General Emergency',
      description: 'Other emergency situations',
      icon: 'Zap',
      color: 'bg-emergency'
    }
  ];

  const handleEmergencyTrigger = (type) => {
    onTriggerEmergency(type);
  };

  const handleTestSystem = () => {
    onTestSystem();
  };

  const handleSaveSettings = () => {
    onUpdateSettings({
      sensitivity,
      autoActivation
    });
    setShowSettings(false);
  };

  return (
    <div className="bg-card rounded-2xl p-6 card-elevation-2 border medical-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emergency rounded-full flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">
              Emergency Controls
            </h2>
            <p className="text-sm text-text-secondary">
              Manual activation and system settings
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          iconName="Settings"
          iconPosition="left"
        >
          Settings
        </Button>
      </div>
      {/* Emergency Type Buttons */}
      {!isEmergencyActive && (
        <div className="mb-6">
          <h3 className="font-semibold text-text-primary mb-4">
            Select Emergency Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => handleEmergencyTrigger(type?.id)}
                className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-gentle text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 ${type?.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-gentle`}>
                    <Icon name={type?.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary group-hover:text-primary transition-gentle">
                      {type?.label}
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">
                      {type?.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* System Controls */}
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-4">
          System Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleTestSystem}
            disabled={isEmergencyActive}
            iconName="TestTube"
            iconPosition="left"
            className="justify-start"
          >
            <div className="text-left">
              <div className="font-medium">Test System</div>
              <div className="text-xs text-text-secondary">
                Check emergency detection
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            disabled={isEmergencyActive}
            iconName="Smartphone"
            iconPosition="left"
            className="justify-start"
          >
            <div className="text-left">
              <div className="font-medium">Shake Detection</div>
              <div className="text-xs text-text-secondary">
                {autoActivation ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </Button>
        </div>
      </div>
      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t medical-border pt-6">
          <h3 className="font-semibold text-text-primary mb-4">
            Detection Settings
          </h3>
          
          <div className="space-y-4">
            {/* Sensitivity Setting */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Detection Sensitivity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high']?.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSensitivity(level)}
                    className={`p-3 rounded-lg text-sm font-medium transition-gentle ${
                      sensitivity === level
                        ? 'bg-primary text-white' :'bg-muted text-text-primary hover:bg-muted/80'
                    }`}
                  >
                    {level?.charAt(0)?.toUpperCase() + level?.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Activation Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <span className="font-medium text-text-primary">Auto Activation</span>
                <p className="text-sm text-text-secondary">
                  Automatically trigger on shake detection
                </p>
              </div>
              <button
                onClick={() => setAutoActivation(!autoActivation)}
                className={`w-12 h-6 rounded-full transition-gentle ${
                  autoActivation ? 'bg-primary' : 'bg-border'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-gentle ${
                  autoActivation ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Save Settings */}
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleSaveSettings}
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                Save Settings
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Emergency Active Warning */}
      {isEmergencyActive && (
        <div className="p-4 bg-error/10 rounded-xl border border-error/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={18} color="var(--color-error)" />
            <span className="font-medium text-error">Emergency Mode Active</span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            All emergency controls are disabled during active emergency
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencyControls;