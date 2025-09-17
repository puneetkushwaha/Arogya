import React from 'react';
import Icon from '../../../components/AppIcon';


const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳'
    }
  ];

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  return (
    <div className="flex items-center space-x-2">
      <Icon name="Globe" size={16} color="var(--color-text-secondary)" />
      <div className="flex bg-muted rounded-lg p-1">
        {languages?.map((language) => (
          <button
            key={language?.code}
            onClick={() => onLanguageChange(language?.code)}
            className={`px-3 py-1 text-xs font-medium rounded transition-gentle ${
              currentLanguage === language?.code
                ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-card'
            }`}
          >
            <span className="mr-1">{language?.flag}</span>
            {language?.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;