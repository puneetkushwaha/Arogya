import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationDisplay = ({ isEmergencyActive, onLocationUpdate }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    if (isEmergencyActive) {
      getCurrentLocation();
    }
  }, [isEmergencyActive]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const timestamp = position.timestamp;

        const locationData = {
          latitude,
          longitude,
          address: `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`,
          accuracy,
          timestamp: new Date(timestamp).toISOString()
        };

        setLocation(locationData);
        setAccuracy(accuracy);
        setIsLoading(false);

        if (onLocationUpdate) onLocationUpdate(locationData);
      },
      (err) => {
        setError(err.message || "Unable to fetch location.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const shareLocation = () => {
    if (!location) return;

    const locationText = `Emergency Location: ${location?.address}\nCoordinates: ${location?.latitude}, ${location?.longitude}\nAccuracy: ${accuracy}m\nTime: ${new Date(location.timestamp)?.toLocaleString()}`;

    if (navigator.share) {
      navigator.share({
        title: 'Emergency Location',
        text: locationText
      });
    } else {
      navigator.clipboard?.writeText(locationText);
      alert('Location copied to clipboard');
    }
  };

  const getAccuracyColor = () => {
    if (!accuracy) return 'text-text-secondary';
    if (accuracy <= 10) return 'text-success';
    if (accuracy <= 50) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyLabel = () => {
    if (!accuracy) return 'Unknown';
    if (accuracy <= 10) return 'High';
    if (accuracy <= 50) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-card rounded-2xl p-6 card-elevation-2 border medical-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Icon name="MapPin" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Location Services
          </h2>
          <p className="text-sm text-text-secondary">
            GPS coordinates for emergency response
          </p>
        </div>
      </div>

      {/* Location Status */}
      <div className="mb-6">
        {isLoading && (
          <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="font-medium text-text-primary">Acquiring GPS Location...</p>
              <p className="text-sm text-text-secondary">This may take a few moments</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-3 p-4 bg-error/10 rounded-lg border border-error/20">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <div>
              <p className="font-medium text-error">Location Error</p>
              <p className="text-sm text-text-secondary">{error}</p>
            </div>
          </div>
        )}

        {location && !isLoading && (
          <div className="space-y-4">
            {/* Location Details */}
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={18} color="var(--color-success)" />
                <span className="font-medium text-success">Location Acquired</span>
              </div>
              <p className="text-sm text-text-secondary">
                {new Date(location.timestamp)?.toLocaleString()}
              </p>
            </div>

            {/* Address */}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-text-primary mb-2 flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Current Address</span>
              </h3>
              <p className="text-text-secondary">{location?.address}</p>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-text-primary mb-1">Latitude</h4>
                <p className="font-mono text-primary">{location?.latitude}°</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-text-primary mb-1">Longitude</h4>
                <p className="font-mono text-primary">{location?.longitude}°</p>
              </div>
            </div>

            {/* Accuracy */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">GPS Accuracy</h4>
                  <p className="text-sm text-text-secondary">±{accuracy} meters</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAccuracyColor()} bg-current/10`}>
                  {getAccuracyLabel()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Maps Embed */}
      {location && (
        <div className="mb-6">
          <h3 className="font-medium text-text-primary mb-3">Location Map</h3>
          <div className="w-full h-64 rounded-lg overflow-hidden border medical-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Emergency Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=16&output=embed`}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isLoading}
          loading={isLoading}
          iconName="RefreshCw"
          iconPosition="left"
          className="flex-1"
        >
          Refresh Location
        </Button>

        {location && (
          <Button
            variant="default"
            onClick={shareLocation}
            iconName="Share"
            iconPosition="left"
            className="flex-1"
          >
            Share Location
          </Button>
        )}
      </div>

      {/* Location Sharing Info */}
      {isEmergencyActive && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">
              Location automatically shared with emergency services
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;
