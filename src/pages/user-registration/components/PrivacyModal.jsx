import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacyModal = ({ isOpen, onClose, selectedLanguage }) => {
  if (!isOpen) return null;

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: 'Privacy Policy',
        close: 'Close',
        accept: 'Accept Policy',
        lastUpdated: 'Last updated: September 17, 2025',
        content: `At ArogyaPlus, we are committed to protecting your privacy and personal health information. This Privacy Policy explains how we collect, use, and safeguard your data.

1. INFORMATION WE COLLECT
- Personal Information: Name, email, phone number, date of birth
- Health Information: Medical reports, symptoms, health metrics, emergency contacts
- Technical Information: Device information, IP address, usage analytics
- Location Information: GPS coordinates for emergency services (with consent)

2. HOW WE USE YOUR INFORMATION
- Provide personalized healthcare services and recommendations
- Analyze medical reports and provide AI-powered insights
- Enable emergency response and contact emergency services
- Improve our platform through usage analytics
- Send important health alerts and notifications

3. DATA SECURITY
- All data is encrypted using 256-bit SSL encryption
- Stored on secure servers located in India
- Regular security audits and compliance checks
- Access restricted to authorized personnel only
- Automatic data backup and disaster recovery systems

4. DATA SHARING
We do not sell your personal information. We may share data only in these circumstances:
- With healthcare providers (with your explicit consent)
- With emergency services during medical emergencies
- With legal authorities when required by law
- With service providers under strict confidentiality agreements

5. YOUR RIGHTS
- Access your personal data at any time
- Request correction of inaccurate information
- Delete your account and associated data
- Export your health data in portable format
- Opt-out of non-essential communications

6. COOKIES AND TRACKING
We use essential cookies for platform functionality and analytics cookies to improve user experience. You can manage cookie preferences in your browser settings.

7. CHILDREN'S PRIVACY
Our platform is not intended for children under 18. We do not knowingly collect personal information from minors without parental consent.

8. INTERNATIONAL TRANSFERS
Your data is processed and stored within India. Any international transfers comply with applicable data protection laws.

9. RETENTION POLICY
We retain your data for as long as your account is active or as needed to provide services. Health data may be retained longer for medical continuity purposes.

10. CONTACT US
For privacy-related questions or to exercise your rights, contact us at:
Email: privacy@arogyaplus.in
Phone: +91-80-4567-8900
Address: ArogyaPlus Healthcare Pvt. Ltd., Bangalore, India`
      },
      hi: {
        title: 'गोपनीयता नीति',close: 'बंद करें',accept: 'नीति स्वीकार करें',lastUpdated: 'अंतिम अपडेट: 17 सितंबर, 2025',
        content: `आरोग्य प्लस में, हम आपकी गोपनीयता और व्यक्तिगत स्वास्थ्य जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि हम आपके डेटा को कैसे एकत्र, उपयोग और सुरक्षित करते हैं।

1. हम जो जानकारी एकत्र करते हैं
- व्यक्तिगत जानकारी: नाम, ईमेल, फोन नंबर, जन्म तिथि
- स्वास्थ्य जानकारी: चिकित्सा रिपोर्ट, लक्षण, स्वास्थ्य मेट्रिक्स, आपातकालीन संपर्क
- तकनीकी जानकारी: डिवाइस जानकारी, IP पता, उपयोग विश्लेषण
- स्थान जानकारी: आपातकालीन सेवाओं के लिए GPS निर्देशांक (सहमति के साथ)

2. हम आपकी जानकारी का उपयोग कैसे करते हैं
- व्यक्तिगत स्वास्थ्य सेवाएं और सिफारिशें प्रदान करना
- चिकित्सा रिपोर्ट का विश्लेषण और AI-संचालित अंतर्दृष्टि प्रदान करना
- आपातकालीन प्रतिक्रिया सक्षम करना और आपातकालीन सेवाओं से संपर्क करना
- उपयोग विश्लेषण के माध्यम से हमारे प्लेटफॉर्म में सुधार करना

3. डेटा सुरक्षा
- सभी डेटा 256-बिट SSL एन्क्रिप्शन का उपयोग करके एन्क्रिप्ट किया गया है
- भारत में स्थित सुरक्षित सर्वर पर संग्रहीत
- नियमित सुरक्षा ऑडिट और अनुपालन जांच
- केवल अधिकृत कर्मचारियों तक पहुंच सीमित

4. आपके अधिकार
- किसी भी समय अपने व्यक्तिगत डेटा तक पहुंच
- गलत जानकारी के सुधार का अनुरोध
- अपना खाता और संबंधित डेटा हटाना
- पोर्टेबल प्रारूप में अपने स्वास्थ्य डेटा को निर्यात करना`
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

export default PrivacyModal;