import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import LanguageSelector from './components/LanguageSelector';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import MockCredentialsInfo from './components/MockCredentialsInfo';

const UserLogin = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Multilingual translations
  const translations = {
    en: {
      title: 'Welcome Back to ArogyaPlus',
      subtitle: 'Sign in to access your personalized healthcare dashboard',
      form: {
        identifierLabel: 'Email or Phone Number',
        identifierPlaceholder: 'Enter your email or phone number',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot Password?',
        signInButton: 'Sign In',
        orContinueWith: 'Or continue with'
      },
      errors: {
        identifierRequired: 'Email or phone number is required',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters',
        invalidCredentials: 'Invalid email/phone or password. Please check the demo credentials below.',
        loginFailed: 'Login failed. Please try again.'
      },
      alerts: {
        forgotPasswordInfo: 'Forgot password feature will redirect to password reset page in a real application.',
        socialLoginInfo: 'Social login integration with'
      },
      trust: {
        title: 'Your Health Data is Secure',
        subtitle: 'We prioritize your privacy and data security',
        dataEncryption: 'End-to-End Encryption',
        dataEncryptionDesc: 'All health data encrypted with AES-256',
        indianServers: 'Indian Data Centers',
        indianServersDesc: 'Data stored in certified Indian servers',
        certified: 'Healthcare Certified',
        certifiedDesc: 'Compliant with Indian healthcare standards',
        privacy: 'Privacy Protected',
        privacyDesc: 'GDPR and Indian data protection compliant'
      },
      demo: {
        title: 'Demo Credentials',
        show: 'Show',
        hide: 'Hide',
        description: 'Use these credentials to explore different user roles:',
        warning: 'These are demo credentials for testing purposes only.'
      },
      newUser: 'New to ArogyaPlus?',
      registerHere: 'Register Here'
    },
    hi: {
      title: 'ArogyaPlus में आपका स्वागत है',
      subtitle: 'अपने व्यक्तिगत स्वास्थ्य डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
      form: {
        identifierLabel: 'ईमेल या फोन नंबर',
        identifierPlaceholder: 'अपना ईमेल या फोन नंबर दर्ज करें',
        passwordLabel: 'पासवर्ड',
        passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
        rememberMe: 'मुझे याद रखें',
        forgotPassword: 'पासवर्ड भूल गए?',
        signInButton: 'साइन इन करें',
        orContinueWith: 'या इसके साथ जारी रखें'
      },
      errors: {
        identifierRequired: 'ईमेल या फोन नंबर आवश्यक है',
        passwordRequired: 'पासवर्ड आवश्यक है',
        passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
        invalidCredentials: 'गलत ईमेल/फोन या पासवर्ड। कृपया नीचे डेमो क्रेडेंशियल देखें।',
        loginFailed: 'लॉगिन असफल। कृपया पुनः प्रयास करें।'
      },
      alerts: {
        forgotPasswordInfo: 'पासवर्ड भूल गए फीचर वास्तविक एप्लिकेशन में पासवर्ड रीसेट पेज पर रीडायरेक्ट करेगा।',
        socialLoginInfo: 'सोशल लॉगिन एकीकरण'
      },
      trust: {
        title: 'आपका स्वास्थ्य डेटा सुरक्षित है',
        subtitle: 'हम आपकी गोपनीयता और डेटा सुरक्षा को प्राथमिकता देते हैं',
        dataEncryption: 'एंड-टू-एंड एन्क्रिप्शन',
        dataEncryptionDesc: 'सभी स्वास्थ्य डेटा AES-256 से एन्क्रिप्ट किया गया',
        indianServers: 'भारतीय डेटा सेंटर',
        indianServersDesc: 'प्रमाणित भारतीय सर्वर में डेटा संग्रहीत',
        certified: 'स्वास्थ्य प्रमाणित',
        certifiedDesc: 'भारतीय स्वास्थ्य मानकों के अनुपालन में',
        privacy: 'गोपनीयता संरक्षित',
        privacyDesc: 'GDPR और भारतीय डेटा सुरक्षा अनुपालन'
      },
      demo: {
        title: 'डेमो क्रेडेंशियल',
        show: 'दिखाएं',
        hide: 'छुपाएं',
        description: 'विभिन्न उपयोगकर्ता भूमिकाओं का पता लगाने के लिए इन क्रेडेंशियल का उपयोग करें:',
        warning: 'ये केवल परीक्षण उद्देश्यों के लिए डेमो क्रेडेंशियल हैं।'
      },
      newUser: 'ArogyaPlus में नए हैं?',
      registerHere: 'यहाँ रजिस्टर करें'
    }
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arogyaplus_language');
    if (savedLanguage && translations?.[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('arogyaplus_language', language);
  };

  const currentTranslations = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Login - ArogyaPlus Healthcare Platform</title>
        <meta name="description" content="Sign in to your ArogyaPlus account to access personalized healthcare management, medical reports, and emergency services." />
        <meta name="keywords" content="login, healthcare, ArogyaPlus, medical, health dashboard" />
      </Helmet>
      <div className="flex min-h-screen">
        {/* Left Side - Branding & Info (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            {/* Logo */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl card-elevation-2">
                <Icon name="Heart" size={32} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-primary">
                  ArogyaPlus
                </h1>
                <p className="text-text-secondary font-caption">
                  Healthcare Platform
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
                {currentLanguage === 'hi' ? 'आपके स्वास्थ्य की देखभाल' : 'Your Health, Our Priority'}
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: 'Activity',
                    title: currentLanguage === 'hi' ? 'व्यक्तिगत डैशबोर्ड' : 'Personalized Dashboard',
                    desc: currentLanguage === 'hi' ? 'अपने स्वास्थ्य मेट्रिक्स को ट्रैक करें' : 'Track your health metrics and progress'
                  },
                  {
                    icon: 'FileText',
                    title: currentLanguage === 'hi' ? 'मेडिकल रिपोर्ट विश्लेषण' : 'Medical Report Analysis',
                    desc: currentLanguage === 'hi' ? 'AI-संचालित रिपोर्ट समझ' : 'AI-powered report interpretation'
                  },
                  {
                    icon: 'AlertTriangle',
                    title: currentLanguage === 'hi' ? 'आपातकालीन प्रतिक्रिया' : 'Emergency Response',
                    desc: currentLanguage === 'hi' ? '24/7 आपातकालीन सहायता' : '24/7 emergency assistance'
                  }
                ]?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">
                        {feature?.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {feature?.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary">50K+</div>
                <div className="text-xs text-text-secondary">
                  {currentLanguage === 'hi' ? 'उपयोगकर्ता' : 'Users'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-secondary">1M+</div>
                <div className="text-xs text-text-secondary">
                  {currentLanguage === 'hi' ? 'रिपोर्ट्स' : 'Reports'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-accent">24/7</div>
                <div className="text-xs text-text-secondary">
                  {currentLanguage === 'hi' ? 'सहायता' : 'Support'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center justify-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-primary">
                  ArogyaPlus
                </h1>
                <p className="text-sm font-caption text-text-secondary">
                  Healthcare Platform
                </p>
              </div>
            </div>

            {/* Language Selector */}
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            {/* Login Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                {currentTranslations?.title}
              </h2>
              <p className="text-text-secondary">
                {currentTranslations?.subtitle}
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-card p-6 lg:p-8 rounded-2xl card-elevation-2 border medical-border">
              <LoginForm
                currentLanguage={currentLanguage}
                translations={currentTranslations}
              />

              {/* Social Login */}
              <div className="mt-6">
                <SocialLogin translations={currentTranslations} />
              </div>

              {/* Register Link */}
              <div className="text-center mt-6 pt-6 border-t border-border">
                <p className="text-text-secondary text-sm">
                  {currentTranslations?.newUser}{' '}
                  <Link
                    to="/user-registration"
                    className="text-primary hover:text-primary/80 font-medium transition-gentle"
                  >
                    {currentTranslations?.registerHere}
                  </Link>
                </p>
              </div>

              {/* Mock Credentials Info */}
              <MockCredentialsInfo translations={currentTranslations} />

              {/* Trust Signals */}
              <TrustSignals translations={currentTranslations} />
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-xs text-text-secondary">
                © {new Date()?.getFullYear()} ArogyaPlus. All rights reserved.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <Link to="#" className="text-xs text-text-secondary hover:text-primary transition-gentle">
                  Privacy Policy
                </Link>
                <span className="text-xs text-text-secondary">•</span>
                <Link to="#" className="text-xs text-text-secondary hover:text-primary transition-gentle">
                  Terms of Service
                </Link>
                <span className="text-xs text-text-secondary">•</span>
                <Link to="#" className="text-xs text-text-secondary hover:text-primary transition-gentle">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;