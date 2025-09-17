import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MockCredentialsInfo = ({ translations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    {
      type: 'Patient Account',
      email: 'patient@arogyaplus.com',
      phone: '9876543210',
      password: 'patient123',
      description: 'Regular patient with health records'
    },
    {
      type: 'Doctor Account',
      email: 'doctor@arogyaplus.com',
      password: 'doctor123',
      description: 'Healthcare provider account'
    },
    {
      type: 'Admin Account',
      email: 'admin@arogyaplus.com',
      password: 'admin123',
      description: 'Administrative access'
    }
  ];

  return (
    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-primary">
            {translations?.demo?.title}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? translations?.demo?.hide : translations?.demo?.show}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-text-secondary">
            {translations?.demo?.description}
          </p>
          
          {mockCredentials?.map((credential, index) => (
            <div
              key={index}
              className="bg-card p-3 rounded-lg border medical-border"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-text-primary">
                  {credential?.type}
                </h4>
                <Icon name="User" size={14} color="var(--color-text-secondary)" />
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={12} color="var(--color-text-secondary)" />
                  <span className="text-text-secondary">Email:</span>
                  <code className="bg-muted px-1 py-0.5 rounded text-text-primary">
                    {credential?.email}
                  </code>
                </div>
                
                {credential?.phone && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={12} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">Phone:</span>
                    <code className="bg-muted px-1 py-0.5 rounded text-text-primary">
                      {credential?.phone}
                    </code>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={12} color="var(--color-text-secondary)" />
                  <span className="text-text-secondary">Password:</span>
                  <code className="bg-muted px-1 py-0.5 rounded text-text-primary">
                    {credential?.password}
                  </code>
                </div>
                
                <p className="text-text-secondary italic mt-1">
                  {credential?.description}
                </p>
              </div>
            </div>
          ))}
          
          <div className="flex items-start space-x-2 mt-3 p-2 bg-warning/10 rounded-lg">
            <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
            <p className="text-xs text-text-secondary">
              {translations?.demo?.warning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockCredentialsInfo;