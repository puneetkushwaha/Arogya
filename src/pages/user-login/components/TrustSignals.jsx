import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = ({ translations }) => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: translations?.trust?.dataEncryption,
      description: translations?.trust?.dataEncryptionDesc
    },
    {
      icon: 'MapPin',
      title: translations?.trust?.indianServers,
      description: translations?.trust?.indianServersDesc
    },
    {
      icon: 'Award',
      title: translations?.trust?.certified,
      description: translations?.trust?.certifiedDesc
    },
    {
      icon: 'Lock',
      title: translations?.trust?.privacy,
      description: translations?.trust?.privacyDesc
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {translations?.trust?.title}
        </h3>
        <p className="text-sm text-text-secondary">
          {translations?.trust?.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-muted rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Compliance Badges */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-xs text-text-secondary">ISO 27001</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-xs text-text-secondary">HIPAA Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-xs text-text-secondary">Data Protection</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;