import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OTPVerification = ({ 
  communicationMethod, 
  contactInfo, 
  onVerify, 
  onResend, 
  isLoading, 
  selectedLanguage,
  onBack 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        verificationTitle: 'Verify Your Account',
        verificationDesc: `We've sent a 6-digit verification code to your ${communicationMethod === 'email' ? 'email' : 'phone number'}`,
        enterCode: 'Enter Verification Code',resendCode: 'Resend Code',resendIn: 'Resend in',seconds: 'seconds',
        verifyAccount: 'Verify Account',backToForm: 'Back to Registration',
        didntReceive: "Didn\'t receive the code?"
      },
      hi: {
        verificationTitle: 'अपना खाता सत्यापित करें',
        verificationDesc: `हमने आपके ${communicationMethod === 'email' ? 'ईमेल' : 'फोन नंबर'} पर 6-अंकीय सत्यापन कोड भेजा है`,
        enterCode: 'सत्यापन कोड दर्ज करें',resendCode: 'कोड फिर से भेजें',resendIn: 'फिर से भेजें',seconds: 'सेकंड में',
        verifyAccount: 'खाता सत्यापित करें',backToForm: 'पंजीकरण पर वापस जाएं',didntReceive: 'कोड प्राप्त नहीं हुआ?'
      }
    };
    return translations?.[selectedLanguage]?.[key] || translations?.en?.[key];
  };

  const handleOtpChange = (index, value) => {
    if (value?.length <= 1 && /^\d*$/?.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp?.join('');
    if (otpString?.length === 6) {
      onVerify(otpString);
    }
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(60);
      setCanResend(false);
      onResend();
    }
  };

  const isOtpComplete = otp?.every(digit => digit !== '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          {getTranslatedText('verificationTitle')}
        </h2>
        <p className="text-text-secondary">
          {getTranslatedText('verificationDesc')}
        </p>
        <p className="text-primary font-medium mt-2">
          {communicationMethod === 'email' ? contactInfo : `+91 ${contactInfo}`}
        </p>
      </div>
      {/* OTP Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-text-primary">
          {getTranslatedText('enterCode')}
        </label>
        <div className="flex justify-center space-x-3">
          {otp?.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e?.target?.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-gentle"
            />
          ))}
        </div>
      </div>
      {/* Resend Section */}
      <div className="text-center">
        <p className="text-text-secondary mb-2">
          {getTranslatedText('didntReceive')}
        </p>
        {canResend ? (
          <Button
            variant="link"
            onClick={handleResend}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {getTranslatedText('resendCode')}
          </Button>
        ) : (
          <p className="text-text-secondary">
            {getTranslatedText('resendIn')} {resendTimer} {getTranslatedText('seconds')}
          </p>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleVerify}
          loading={isLoading}
          disabled={!isOtpComplete}
          iconName="CheckCircle"
          iconPosition="left"
        >
          {getTranslatedText('verifyAccount')}
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          {getTranslatedText('backToForm')}
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;