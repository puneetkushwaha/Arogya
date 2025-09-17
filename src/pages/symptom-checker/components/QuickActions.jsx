import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onSaveSession, onShareResults, onClearHistory, currentLanguage, hasResults }) => {
  const navigate = useNavigate();

  const actionLabels = {
    en: {
      saveSession: 'Save Session',
      shareResults: 'Share Results',
      clearHistory: 'Clear History',
      viewHistory: 'View Health History',
      emergency: 'Emergency',
      findDoctors: 'Find Doctors'
    },
    hi: {
      saveSession: 'सत्र सहेजें',
      shareResults: 'परिणाम साझा करें',
      clearHistory: 'इतिहास साफ़ करें',
      viewHistory: 'स्वास्थ्य इतिहास देखें',
      emergency: 'आपातकाल',
      findDoctors: 'डॉक्टर खोजें'
    },
    ta: {
      saveSession: 'அமர்வை சேமிக்கவும்',
      shareResults: 'முடிவுகளை பகிரவும்',
      clearHistory: 'வரலாற்றை அழிக்கவும்',
      viewHistory: 'சுகாதார வரலாற்றைப் பார்க்கவும்',
      emergency: 'அவசரநிலை',
      findDoctors: 'மருத்துவர்களைக் கண்டறியவும்'
    }
  };

  const handleEmergency = () => {
    navigate('/emergency-response');
  };

  const handleViewHistory = () => {
    navigate('/health-dashboard');
  };

  const handleFindDoctors = () => {
    // Mock doctor search functionality
    alert(currentLanguage === 'hi' ?'डॉक्टर खोज सुविधा जल्द ही उपलब्ध होगी।'
      : currentLanguage === 'ta' ?'மருத்துவர் தேடல் வசதி விரைவில் கிடைக்கும்.' :'Doctor search feature coming soon.');
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={18} color="var(--color-primary)" />
        <h3 className="font-heading font-semibold text-text-primary">
          {currentLanguage === 'hi' ? 'त्वरित कार्य' : 
           currentLanguage === 'ta'? 'விரைவு செயல்கள்' : 'Quick Actions'}
        </h3>
      </div>
      <div className="grid grid-cols-0 sm:grid-cols-0 lg:grid-cols-0 gap-3">
        {/* Save Session */}
        {hasResults && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveSession}
            iconName="Save"
            iconPosition="left"
            className="justify-start"
          >
            {actionLabels?.[currentLanguage]?.saveSession || actionLabels?.en?.saveSession}
          </Button>
        )}

        {/* Share Results */}
        {hasResults && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShareResults}
            iconName="Share2"
            iconPosition="left"
            className="justify-start"
          >
            {actionLabels?.[currentLanguage]?.shareResults || actionLabels?.en?.shareResults}
          </Button>
        )}

        {/* View Health History */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewHistory}
          iconName="History"
          iconPosition="left"
          className="justify-start"
        >
          {actionLabels?.[currentLanguage]?.viewHistory || actionLabels?.en?.viewHistory}
        </Button>

        {/* Find Doctors */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleFindDoctors}
          iconName="UserCheck"
          iconPosition="left"
          className="justify-start"
        >
          {actionLabels?.[currentLanguage]?.findDoctors || actionLabels?.en?.findDoctors}
        </Button>

        {/* Clear History */}
        <Button
          variant="outline"
          size="sm"
          onClick={onClearHistory}
          iconName="Trash2"
          iconPosition="left"
          className="justify-start text-error hover:text-error"
        >
          {actionLabels?.[currentLanguage]?.clearHistory || actionLabels?.en?.clearHistory}
        </Button>

        {/* Emergency */}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleEmergency}
          iconName="AlertTriangle"
          iconPosition="left"
          className="justify-start emergency-pulse"
        >
          {actionLabels?.[currentLanguage]?.emergency || actionLabels?.en?.emergency}
        </Button>
      </div>
      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t medical-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} color="var(--color-text-secondary)" className="mt-0.5 flex-shrink-0" />
          <p className="text-xs text-text-secondary">
            {currentLanguage === 'hi' ?'आपके लक्षण डेटा को सुरक्षित रूप से संग्रहीत किया जाता है और केवल आपके स्वास्थ्य सुधार के लिए उपयोग किया जाता है।'
              : currentLanguage === 'ta' ?'உங்கள் அறிகுறி தரவு பாதுகாப்பாக சேமிக்கப்பட்டு உங்கள் சுகாதார முன்னேற்றத்திற்காக மட்டுமே பயன்படுத்தப்படுகிறது.' :'Your symptom data is securely stored and used only for your health improvement.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;