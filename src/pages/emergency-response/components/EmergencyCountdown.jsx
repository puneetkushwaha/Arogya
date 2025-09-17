import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyCountdown = ({ 
  isActive, 
  onCancel, 
  onComplete, 
  emergencyType = 'medical',
  initialCountdown = 10 
}) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isPlaying, setIsPlaying] = useState(false);
  const sirenRef = useRef(null);

  useEffect(() => {
    // Audio object initialize
    sirenRef.current = new Audio('/sounds/siren.mp3'); 
    sirenRef.current.loop = true;
  }, []);

  useEffect(() => {
    if (isActive) {
      setCountdown(initialCountdown);
      setIsPlaying(true);

      // ✅ Siren ko play karne ke liye user interaction ke baad chahiye
      const playSiren = async () => {
        try {
          await sirenRef.current.play();
        } catch (err) {
          console.warn("Autoplay blocked, will play on first user interaction:", err);
          const resumeOnClick = async () => {
            await sirenRef.current.play();
            window.removeEventListener("click", resumeOnClick);
          };
          window.addEventListener("click", resumeOnClick);
        }
      };

      if (sirenRef.current) {
        sirenRef.current.currentTime = 0;
        playSiren();
      }

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsPlaying(false);

            if (sirenRef.current) {
              sirenRef.current.pause();
              sirenRef.current.currentTime = 0;
            }

            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        setIsPlaying(false);

        if (sirenRef.current) {
          sirenRef.current.pause();
          sirenRef.current.currentTime = 0;
        }
      };
    }
  }, [isActive, initialCountdown, onComplete]);

  const getEmergencyIcon = () => {
    switch (emergencyType) {
      case 'medical':
        return 'Heart';
      case 'accident':
        return 'AlertTriangle';
      case 'fire':
        return 'Flame';
      default:
        return 'Zap';
    }
  };

  const getEmergencyColor = () => {
    switch (emergencyType) {
      case 'medical':
        return 'bg-error';
      case 'accident':
        return 'bg-warning';
      case 'fire':
        return 'bg-destructive';
      default:
        return 'bg-emergency';
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-1000">
      <div className="bg-card p-8 rounded-3xl card-elevation-emergency text-center max-w-md mx-4 w-full">
        
        {/* Emergency Icon */}
        <div className={`w-24 h-24 mx-auto mb-6 ${getEmergencyColor()} rounded-full flex items-center justify-center emergency-pulse`}>
          <Icon name={getEmergencyIcon()} size={48} color="white" />
        </div>

        {/* Emergency Title */}
        <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Emergency Alert Activated
        </h1>
        <p className="text-text-secondary mb-8">
          Emergency services will be contacted in
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <div className="text-8xl font-heading font-bold text-error mb-2 emergency-pulse">
            {countdown}
          </div>
          <div className="text-lg text-text-secondary">
            {countdown === 1 ? 'second' : 'seconds'}
          </div>
        </div>

        {/* Siren Indicator */}
        {isPlaying && (
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-error rounded-full emergency-pulse"></div>
            <span className="text-error font-medium">SIREN ACTIVE</span>
            <div className="w-3 h-3 bg-error rounded-full emergency-pulse"></div>
          </div>
        )}

        {/* Cancel Button */}
        <div className="space-y-3">
          <Button
            variant="destructive"
            size="lg"
            onClick={() => {
              if (sirenRef.current) {
                sirenRef.current.pause();
                sirenRef.current.currentTime = 0;
              }
              onCancel();
            }}
            className="w-full text-lg py-4"
            iconName="X"
            iconPosition="left"
          >
            Cancel Emergency
          </Button>
          
          <p className="text-xs text-text-secondary">
            Tap to cancel false alarm
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCountdown;
