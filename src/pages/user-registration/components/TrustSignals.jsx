import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = ({ selectedLanguage }) => {
  const getTranslatedText = (key) => {
    const translations = {
      en: {
        trustedBy: 'Trusted Healthcare Platform',
        secureData: 'Your data is secure with us',
        certifications: 'Certifications & Compliance',
        iso: 'ISO 27001 Certified',
        hipaa: 'HIPAA Compliant',
        government: 'Government Approved',
        encryption: '256-bit Encryption',
        servers: 'Indian Servers',
        privacy: 'Privacy Protected'
      },
      hi: {
        trustedBy: 'विश्वसनीय स्वास्थ्य सेवा प्लेटफॉर्म',
        secureData: 'आपका डेटा हमारे साथ सुरक्षित है',
        certifications: 'प्रमाणन और अनुपालन',
        iso: 'ISO 27001 प्रमाणित',
        hipaa: 'HIPAA अनुपालित',
        government: 'सरकार द्वारा अनुमोदित',
        encryption: '256-बिट एन्क्रिप्शन',
        servers: 'भारतीय सर्वर',
        privacy: 'गोपनीयता संरक्षित'
      }
    };
    return translations?.[selectedLanguage]?.[key] || translations?.en?.[key];
  };

  const trustFeatures = [
    {
      icon: 'Shield',
      title: getTranslatedText('iso'),
      color: 'text-primary'
    },
    {
      icon: 'Lock',
      title: getTranslatedText('encryption'),
      color: 'text-secondary'
    },
    {
      icon: 'Server',
      title: getTranslatedText('servers'),
      color: 'text-accent'
    },
    {
      icon: 'CheckCircle',
      title: getTranslatedText('government'),
      color: 'text-success'
    },
    {
      icon: 'Eye',
      title: getTranslatedText('privacy'),
      color: 'text-primary'
    },
    {
      icon: 'Heart',
      title: getTranslatedText('hipaa'),
      color: 'text-secondary'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-xl p-6 mt-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Award" size={24} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {getTranslatedText('trustedBy')}
          </h3>
        </div>
        <p className="text-text-secondary text-sm">
          {getTranslatedText('secureData')}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-3 bg-card rounded-lg card-elevation-1"
          >
            <Icon 
              name={feature?.icon} 
              size={18} 
              className={feature?.color}
            />
            <span className="text-sm font-medium text-text-primary">
              {feature?.title}
            </span>
          </div>
        ))}
      </div>
      {/* Compliance Badges */}
      <div className="flex justify-center items-center space-x-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Shield" size={16} color="white" />
          </div>
          <span className="text-xs font-medium text-text-secondary">
            Healthcare Certified
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={16} color="white" />
          </div>
          <span className="text-xs font-medium text-text-secondary">
            Made in India
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;