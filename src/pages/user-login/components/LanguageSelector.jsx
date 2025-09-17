import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languageOptions = [
    { value: 'en', label: 'English', description: 'English' },
    { value: 'hi', label: 'हिंदी', description: 'Hindi' },
    { value: 'bn', label: 'বাংলা', description: 'Bengali' },
    { value: 'te', label: 'తెలుగు', description: 'Telugu' },
    { value: 'mr', label: 'मराठी', description: 'Marathi' },
    { value: 'ta', label: 'தமிழ்', description: 'Tamil' },
    { value: 'gu', label: 'ગુજરાતી', description: 'Gujarati' },
    { value: 'kn', label: 'ಕನ್ನಡ', description: 'Kannada' }
  ];

  return (
    <div className="flex items-center justify-end mb-6">
      <div className="flex items-center space-x-2">
        <Icon name="Globe" size={18} color="var(--color-text-secondary)" />
        <Select
          options={languageOptions}
          value={currentLanguage}
          onChange={onLanguageChange}
          placeholder="Select Language"
          className="min-w-[140px]"
        />
      </div>
    </div>
  );
};

export default LanguageSelector;