import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConditionSuggestions = ({ suggestions, onGetMoreInfo, onBookAppointment, currentLanguage }) => {
  const [expandedCondition, setExpandedCondition] = useState(null);

  const severityColors = {
    low: 'text-secondary',
    medium: 'text-warning',
    high: 'text-error'
  };

  const severityBgColors = {
    low: 'bg-secondary/10 border-secondary/20',
    medium: 'bg-warning/10 border-warning/20',
    high: 'bg-error/10 border-error/20'
  };

  const severityLabels = {
    en: {
      low: 'Low Risk',
      medium: 'Medium Risk',
      high: 'High Risk'
    },
    hi: {
      low: 'कम जोखिम',
      medium: 'मध्यम जोखिम',
      high: 'उच्च जोखिम'
    },
    ta: {
      low: 'குறைந்த ஆபத்து',
      medium: 'நடுத்தர ஆபத்து',
      high: 'அதிக ஆபத்து'
    }
  };

  const actionLabels = {
    en: {
      monitor: 'Monitor symptoms',
      consult: 'Consult doctor',
      urgent: 'Seek immediate care',
      emergency: 'Emergency care needed'
    },
    hi: {
      monitor: 'लक्षणों पर नज़र रखें',
      consult: 'डॉक्टर से सलाह लें',
      urgent: 'तत्काल देखभाल लें',
      emergency: 'आपातकालीन देखभाल की आवश्यकता'
    },
    ta: {
      monitor: 'அறிகுறிகளை கண்காணிக்கவும்',
      consult: 'மருத்துவரை அணுகவும்',
      urgent: 'உடனடி கவனிப்பு பெறவும்',
      emergency: 'அவசர கவனிப்பு தேவை'
    }
  };

  const toggleExpanded = (conditionId) => {
    setExpandedCondition(expandedCondition === conditionId ? null : conditionId);
  };

  if (!suggestions || suggestions?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Brain" size={20} color="var(--color-primary)" />
        <h3 className="font-heading font-semibold text-text-primary">
          {currentLanguage === 'hi' ? 'संभावित स्थितियां' : 
           currentLanguage === 'ta'? 'சாத்தியமான நிலைமைகள்' : 'Possible Conditions'}
        </h3>
      </div>
      <div className="space-y-3">
        {suggestions?.map((condition, index) => (
          <div
            key={condition?.id}
            className="bg-card rounded-lg border medical-border card-elevation-1 overflow-hidden"
          >
            {/* Condition Header */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-heading font-semibold text-text-primary">
                      {condition?.name}
                    </h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${severityBgColors?.[condition?.severity]} ${severityColors?.[condition?.severity]}`}>
                      {severityLabels?.[currentLanguage]?.[condition?.severity] || severityLabels?.en?.[condition?.severity]}
                    </div>
                  </div>
                  
                  {/* Probability Bar */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-text-secondary">
                      {currentLanguage === 'hi' ? 'संभावना:' : 
                       currentLanguage === 'ta'? 'சாத்தியம்:' : 'Probability:'}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all duration-500"
                        style={{ width: `${condition?.probability}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary">
                      {condition?.probability}%
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleExpanded(condition?.id)}
                >
                  <Icon 
                    name={expandedCondition === condition?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </Button>
              </div>

              {/* Brief Description */}
              <p className="text-sm text-text-secondary mb-3">
                {condition?.description}
              </p>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-lg text-xs font-medium ${severityBgColors?.[condition?.severity]} ${severityColors?.[condition?.severity]}`}>
                  {actionLabels?.[currentLanguage]?.[condition?.recommendedAction] || actionLabels?.en?.[condition?.recommendedAction]}
                </div>
                <div className="text-xs text-text-secondary">
                  {currentLanguage === 'hi' ? 'विशेषज्ञ:' : 
                   currentLanguage === 'ta'? 'நிபுணர்:' : 'Specialist:'} {condition?.specialistType}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCondition === condition?.id && (
              <div className="border-t medical-border bg-muted/30 p-4 space-y-4">
                {/* Detailed Information */}
                <div>
                  <h5 className="font-medium text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'विस्तृत जानकारी:' : 
                     currentLanguage === 'ta'? 'விரிவான தகவல்:' : 'Detailed Information:'}
                  </h5>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {condition?.detailedDescription}
                  </p>
                </div>

                {/* Common Symptoms */}
                {condition?.commonSymptoms && (
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">
                      {currentLanguage === 'hi' ? 'सामान्य लक्षण:' : 
                       currentLanguage === 'ta'? 'பொதுவான அறிகுறிகள்:' : 'Common Symptoms:'}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {condition?.commonSymptoms?.map((symptom, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-card text-xs text-text-secondary rounded border medical-border"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {condition?.recommendations && (
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">
                      {currentLanguage === 'hi' ? 'सिफारिशें:' : 
                       currentLanguage === 'ta'? 'பரிந்துரைகள்:' : 'Recommendations:'}
                    </h5>
                    <ul className="space-y-1">
                      {condition?.recommendations?.map((rec, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-text-secondary">
                          <Icon name="Check" size={14} color="var(--color-secondary)" className="mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onBookAppointment(condition)}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    {currentLanguage === 'hi' ? 'अपॉइंटमेंट बुक करें' : 
                     currentLanguage === 'ta'? 'சந்திப்பை பதிவு செய்யுங்கள்' : 'Book Appointment'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGetMoreInfo(condition)}
                    iconName="Info"
                    iconPosition="left"
                  >
                    {currentLanguage === 'hi' ? 'और जानकारी' : 
                     currentLanguage === 'ta'? 'மேலும் தகவல்' : 'More Info'}
                  </Button>

                  {condition?.severity === 'high' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Phone"
                      iconPosition="left"
                    >
                      {currentLanguage === 'hi' ? 'आपातकालीन कॉल' : 
                       currentLanguage === 'ta'? 'அவசர அழைப்பு' : 'Emergency Call'}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Disclaimer */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
          <div className="text-xs text-text-secondary">
            <p className="font-medium text-warning mb-1">
              {currentLanguage === 'hi' ? 'महत्वपूर्ण अस्वीकरण:' : 
               currentLanguage === 'ta'? 'முக்கியமான மறுப்பு:' : 'Important Disclaimer:'}
            </p>
            <p>
              {currentLanguage === 'hi' ?'यह AI-आधारित विश्लेषण केवल सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। गंभीर लक्षणों के लिए तुरंत डॉक्टर से संपर्क करें।'
                : currentLanguage === 'ta' ?'இந்த AI அடிப்படையிலான பகுப்பாய்வு தகவல் நோக்கங்களுக்காக மட்டுமே மற்றும் தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. கடுமையான அறிகுறிகளுக்கு உடனடியாக மருத்துவரை அணுகவும்.' :'This AI-based analysis is for informational purposes only and is not a substitute for professional medical advice. Please consult a doctor immediately for serious symptoms.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionSuggestions;