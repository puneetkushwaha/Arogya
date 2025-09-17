import React from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyStatus = ({ emergencyData, isActive }) => {
  const statusItems = [
    {
      id: 'location',
      label: 'GPS Location',
      status: emergencyData?.locationShared ? 'completed' : 'pending',
      description: emergencyData?.locationShared 
        ? `Shared: ${emergencyData?.location}` 
        : 'Acquiring GPS coordinates...',
      icon: 'MapPin'
    },
    {
      id: 'ambulance',
      label: 'Ambulance Service',
      status: emergencyData?.ambulanceNotified ? 'completed' : 'pending',
      description: emergencyData?.ambulanceNotified 
        ? 'Ambulance dispatched - ETA 8 minutes' :'Contacting nearest ambulance...',
      icon: 'Truck'
    },
    {
      id: 'police',
      label: 'Police Department',
      status: emergencyData?.policeNotified ? 'completed' : 'pending',
      description: emergencyData?.policeNotified 
        ? 'Police unit dispatched' :'Notifying local police...',
      icon: 'Shield'
    },
    {
      id: 'hospital',
      label: 'Nearest Hospital',
      status: emergencyData?.hospitalNotified ? 'completed' : 'pending',
      description: emergencyData?.hospitalNotified 
        ? 'Apollo Hospital alerted' :'Contacting emergency department...',
      icon: 'Building2'
    },
    {
      id: 'family',
      label: 'Emergency Contacts',
      status: emergencyData?.familyNotified ? 'completed' : 'pending',
      description: emergencyData?.familyNotified 
        ? `${emergencyData?.contactsNotified} contacts notified` 
        : 'Sending alerts to family...',
      icon: 'Users'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 card-elevation-2 border medical-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Activity" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Emergency Status
          </h2>
          <p className="text-sm text-text-secondary">
            Real-time alert progress
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {statusItems?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-4 p-4 bg-muted rounded-xl">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border medical-border">
                <Icon name={item?.icon} size={18} color="var(--color-primary)" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-text-primary">
                  {item?.label}
                </h3>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getStatusIcon(item?.status)} 
                    size={16} 
                    className={getStatusColor(item?.status)} 
                  />
                  <span className={`text-sm font-medium ${getStatusColor(item?.status)}`}>
                    {item?.status === 'completed' ? 'Done' : 
                     item?.status === 'pending' ? 'Processing' : 'Failed'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Emergency Timer */}
      {isActive && (
        <div className="mt-6 p-4 bg-error/10 rounded-xl border border-error/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={18} color="var(--color-error)" />
              <span className="font-medium text-error">Emergency Active</span>
            </div>
            <div className="text-sm text-error">
              Started: {new Date()?.toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyStatus;