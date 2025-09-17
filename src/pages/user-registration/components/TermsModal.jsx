import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TermsModal = ({ isOpen, onClose, selectedLanguage }) => {
  if (!isOpen) return null;

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: 'Terms of Service',
        close: 'Close',
        accept: 'Accept Terms',
        lastUpdated: 'Last updated: September 17, 2025',
        content: `Welcome to ArogyaPlus Healthcare Platform. By creating an account and using our services, you agree to the following terms and conditions.

1. SERVICE DESCRIPTION
ArogyaPlus provides AI-powered healthcare management, medical report analysis, symptom checking, and emergency response services. Our platform is designed to assist with health monitoring and emergency preparedness.

2. USER RESPONSIBILITIES
- Provide accurate and truthful information during registration
- Maintain the confidentiality of your account credentials
- Use the platform responsibly and in accordance with applicable laws
- Notify us immediately of any unauthorized access to your account

3. MEDICAL DISCLAIMER
Our AI-powered services are for informational purposes only and do not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

4. EMERGENCY SERVICES
While we provide emergency response features, users should always contact local emergency services (108, 102) for immediate medical emergencies.

5. DATA PRIVACY
We are committed to protecting your personal health information in accordance with Indian data protection laws and healthcare regulations.

6. PLATFORM AVAILABILITY
We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service availability.

7. ACCOUNT TERMINATION
We reserve the right to terminate accounts that violate these terms or engage in fraudulent activities.

8. LIMITATION OF LIABILITY
ArogyaPlus shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.

9. GOVERNING LAW
These terms are governed by the laws of India and subject to the jurisdiction of Indian courts.

10. CONTACT INFORMATION
For questions about these terms, contact us at legal@arogyaplus.in`
      },
      hi: {
        title: 'सेवा की शर्तें',
        close: 'बंद करें',
        accept: 'शर्तें स्वीकार करें',
        lastUpdated: 'अंतिम अपडेट: 17 सितंबर, 2025',
        content: `आरोग्य प्लस स्वास्थ्य सेवा प्लेटफॉर्म में आपका स्वागत है। खाता बनाकर और हमारी सेवाओं का उपयोग करके, आप निम्नलिखित नियमों और शर्तों से सहमत होते हैं।

1. सेवा विवरण
आरोग्य प्लस AI-संचालित स्वास्थ्य सेवा प्रबंधन, चिकित्सा रिपोर्ट विश्लेषण, लक्षण जांच, और आपातकालीन प्रतिक्रिया सेवाएं प्रदान करता है।

2. उपयोगकर्ता जिम्मेदारियां
- पंजीकरण के दौरान सटीक और सच्ची जानकारी प्रदान करें
- अपने खाते की साख की गोपनीयता बनाए रखें
- प्लेटफॉर्म का जिम्मेदारी से उपयोग करें
- अनधिकृत पहुंच की तुरंत रिपोर्ट करें

3. चिकित्सा अस्वीकरण
हमारी AI-संचालित सेवाएं केवल सूचनात्मक उद्देश्यों के लिए हैं और पेशेवर चिकित्सा सलाह का विकल्प नहीं हैं।

4. आपातकालीन सेवाएं
चिकित्सा आपातकाल के लिए हमेशा स्थानीय आपातकालीन सेवाओं (108, 102) से संपर्क करें।

5. डेटा गोपनीयता
हम भारतीय डेटा सुरक्षा कानूनों के अनुसार आपकी व्यक्तिगत स्वास्थ्य जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं।`
      }
    };
    return translations?.[selectedLanguage]?.[key] || translations?.en?.[key];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden card-elevation-3">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-text-primary">
            {getTranslatedText('title')}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <p className="text-sm text-text-secondary mb-4">
            {getTranslatedText('lastUpdated')}
          </p>
          <div className="prose prose-sm max-w-none">
            <div className="text-text-primary whitespace-pre-line leading-relaxed">
              {getTranslatedText('content')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {getTranslatedText('close')}
          </Button>
          <Button
            variant="default"
            onClick={onClose}
            iconName="Check"
            iconPosition="left"
          >
            {getTranslatedText('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;