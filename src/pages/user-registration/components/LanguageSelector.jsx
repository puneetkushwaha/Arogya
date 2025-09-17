import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
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
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Globe" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Choose Your Language
        </h3>
      </div>
      <Select
        options={languageOptions}
        value={selectedLanguage}
        onChange={onLanguageChange}
        placeholder="Select your preferred language"
        searchable
        className="w-full"
      />
    </div>
  );
};

export default LanguageSelector;