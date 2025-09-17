import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LanguageSelector from './components/LanguageSelector';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import TrustSignals from './components/TrustSignals';
import TermsModal from './components/TermsModal';
import PrivacyModal from './components/PrivacyModal';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState('registration'); // 'registration' or 'verification'
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    communicationMethod: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const [errors, setErrors] = useState({});

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arogyaplus_language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        pageTitle: 'Create Your ArogyaPlus Account',
        pageSubtitle: 'Join thousands of users managing their health digitally',
        alreadyHaveAccount: 'Already have an account?',
        signIn: 'Sign In',
        registrationSuccess: 'Registration Successful!',
        welcomeMessage: 'Welcome to ArogyaPlus Healthcare Platform'
      },
      hi: {
        pageTitle: 'अपना आरोग्य प्लस खाता बनाएं',
        pageSubtitle: 'हजारों उपयोगकर्ताओं के साथ जुड़ें जो डिजिटल रूप से अपने स्वास्थ्य का प्रबंधन कर रहे हैं',
        alreadyHaveAccount: 'क्या आपका पहले से खाता है?',
        signIn: 'साइन इन करें',
        registrationSuccess: 'पंजीकरण सफल!',
        welcomeMessage: 'आरोग्य प्लस स्वास्थ्य सेवा प्लेटफॉर्म में आपका स्वागत है'
      }
    };
    return translations?.[selectedLanguage]?.[key] || translations?.en?.[key];
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('arogyaplus_language', language);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = selectedLanguage === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = selectedLanguage === 'hi' ? 'नाम कम से कम 2 अक्षर का होना चाहिए' : 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = selectedLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = selectedLanguage === 'hi' ? 'वैध ईमेल पता दर्ज करें' : 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData?.phone?.trim()) {
      newErrors.phone = selectedLanguage === 'hi' ? 'फोन नंबर आवश्यक है' : 'Phone number is required';
    } else if (!phoneRegex?.test(formData?.phone)) {
      newErrors.phone = selectedLanguage === 'hi' ? 'वैध 10-अंकीय फोन नंबर दर्ज करें' : 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = selectedLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = selectedLanguage === 'hi' ? 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए' : 'Password must be at least 8 characters';
    }

    // Confirm Password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = selectedLanguage === 'hi' ? 'पासवर्ड की पुष्टि आवश्यक है' : 'Confirm password is required';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = selectedLanguage === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match';
    }

    // Communication Method validation
    if (!formData?.communicationMethod) {
      newErrors.communicationMethod = selectedLanguage === 'hi' ? 'सत्यापन विधि चुनें' : 'Please select verification method';
    }

    // Terms and Privacy validation
    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = selectedLanguage === 'hi' ? 'सेवा की शर्तों से सहमत होना आवश्यक है' : 'You must agree to the Terms of Service';
    }

    if (!formData?.agreePrivacy) {
      newErrors.agreePrivacy = selectedLanguage === 'hi' ? 'गोपनीयता नीति से सहमत होना आवश्यक है' : 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Move to OTP verification step
      setCurrentStep('verification');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock credentials for testing
      const mockCredentials = {
        email: 'test@arogyaplus.in',
        phone: '9876543210',
        otp: '123456'
      };

      if (otp === mockCredentials?.otp) {
        // Create user session
        const userSession = {
          userId: 'AP2025001',
          fullName: formData?.fullName,
          email: formData?.email,
          phone: formData?.phone,
          language: selectedLanguage,
          registrationDate: new Date()?.toISOString(),
          expiresAt: new Date()?.getTime() + (24 * 60 * 60 * 1000) // 24 hours
        };

        localStorage.setItem('arogyaplus_auth_token', 'mock_auth_token_' + Date.now());
        localStorage.setItem('arogyaplus_user_session', JSON.stringify(userSession));
        localStorage.setItem('arogyaplus_language', selectedLanguage);

        // Navigate to dashboard
        navigate('/health-dashboard');
      } else {
        setErrors({ otp: selectedLanguage === 'hi' ? 'गलत OTP कोड' : 'Invalid OTP code' });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrors({ otp: selectedLanguage === 'hi' ? 'सत्यापन त्रुटि' : 'Verification failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPResend = async () => {
    // Simulate resend OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('OTP resent');
  };

  const handleBackToRegistration = () => {
    setCurrentStep('registration');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b medical-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/health-dashboard" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-primary">
                  ArogyaPlus
                </h1>
                <p className="text-xs font-caption text-text-secondary">
                  Healthcare Platform
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">
                {getTranslatedText('alreadyHaveAccount')}
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="LogIn"
                iconPosition="left"
                onClick={() => navigate('/user-login')}
              >
                {getTranslatedText('signIn')}
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl card-elevation-2 p-8">
            {/* Page Header */}
            {currentStep === 'registration' && (
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserPlus" size={32} color="var(--color-primary)" />
                </div>
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {getTranslatedText('pageTitle')}
                </h1>
                <p className="text-text-secondary">
                  {getTranslatedText('pageSubtitle')}
                </p>
              </div>
            )}

            {/* Language Selector */}
            {currentStep === 'registration' && (
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            )}

            {/* Registration Form */}
            {currentStep === 'registration' && (
              <RegistrationForm
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                errors={errors}
                isLoading={isLoading}
                selectedLanguage={selectedLanguage}
                onShowTerms={() => setShowTermsModal(true)}
                onShowPrivacy={() => setShowPrivacyModal(true)}
              />
            )}

            {/* OTP Verification */}
            {currentStep === 'verification' && (
              <OTPVerification
                communicationMethod={formData?.communicationMethod}
                contactInfo={formData?.communicationMethod === 'email' ? formData?.email : formData?.phone}
                onVerify={handleOTPVerify}
                onResend={handleOTPResend}
                isLoading={isLoading}
                selectedLanguage={selectedLanguage}
                onBack={handleBackToRegistration}
              />
            )}

            {/* Trust Signals */}
            {currentStep === 'registration' && (
              <TrustSignals selectedLanguage={selectedLanguage} />
            )}
          </div>
        </div>
      </main>
      {/* Modals */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        selectedLanguage={selectedLanguage}
      />
      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};

export default UserRegistration;