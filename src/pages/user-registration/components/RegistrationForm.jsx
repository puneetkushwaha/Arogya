import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ 
  formData, 
  onFormChange, 
  onSubmit, 
  errors, 
  isLoading, 
  selectedLanguage,
  onShowTerms,
  onShowPrivacy 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const communicationOptions = [
    { value: 'email', label: 'Email Verification', description: 'Receive OTP via email' },
    { value: 'sms', label: 'SMS Verification', description: 'Receive OTP via SMS' }
  ];

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        emailAddress: 'Email Address',
        emailPlaceholder: 'Enter your email address',
        phoneNumber: 'Phone Number',
        phonePlaceholder: 'Enter your 10-digit phone number',
        password: 'Password',
        passwordPlaceholder: 'Create a strong password',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Re-enter your password',
        communicationMethod: 'Verification Method',
        communicationPlaceholder: 'Choose verification method',
        agreeTerms: 'I agree to the Terms of Service',
        agreePrivacy: 'I agree to the Privacy Policy',
        createAccount: 'Create Account',
        termsLink: 'Terms of Service',
        privacyLink: 'Privacy Policy'
      },
      hi: {
        fullName: 'पूरा नाम',
        fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
        emailAddress: 'ईमेल पता',
        emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
        phoneNumber: 'फोन नंबर',
        phonePlaceholder: 'अपना 10-अंकीय फोन नंबर दर्ज करें',
        password: 'पासवर्ड',
        passwordPlaceholder: 'एक मजबूत पासवर्ड बनाएं',
        confirmPassword: 'पासवर्ड की पुष्टि करें',
        confirmPasswordPlaceholder: 'अपना पासवर्ड फिर से दर्ज करें',
        communicationMethod: 'सत्यापन विधि',
        communicationPlaceholder: 'सत्यापन विधि चुनें',
        agreeTerms: 'मैं सेवा की शर्तों से सहमत हूं',
        agreePrivacy: 'मैं गोपनीयता नीति से सहमत हूं',
        createAccount: 'खाता बनाएं',
        termsLink: 'सेवा की शर्तें',
        privacyLink: 'गोपनीयता नीति'
      }
    };
    return translations?.[selectedLanguage]?.[key] || translations?.en?.[key];
  };

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Full Name */}
      <Input
        label={getTranslatedText('fullName')}
        type="text"
        placeholder={getTranslatedText('fullNamePlaceholder')}
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
      />
      {/* Email Address */}
      <Input
        label={getTranslatedText('emailAddress')}
        type="email"
        placeholder={getTranslatedText('emailPlaceholder')}
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      {/* Phone Number */}
      <Input
        label={getTranslatedText('phoneNumber')}
        type="tel"
        placeholder={getTranslatedText('phonePlaceholder')}
        value={formData?.phone}
        onChange={(e) => handleInputChange('phone', e?.target?.value)}
        error={errors?.phone}
        required
        maxLength={10}
      />
      {/* Password */}
      <div className="relative">
        <Input
          label={getTranslatedText('password')}
          type={showPassword ? 'text' : 'password'}
          placeholder={getTranslatedText('passwordPlaceholder')}
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          minLength={8}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-gentle"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      {/* Confirm Password */}
      <div className="relative">
        <Input
          label={getTranslatedText('confirmPassword')}
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder={getTranslatedText('confirmPasswordPlaceholder')}
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-gentle"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      {/* Communication Method */}
      <Select
        label={getTranslatedText('communicationMethod')}
        options={communicationOptions}
        value={formData?.communicationMethod}
        onChange={(value) => handleInputChange('communicationMethod', value)}
        placeholder={getTranslatedText('communicationPlaceholder')}
        error={errors?.communicationMethod}
        required
      />
      {/* Terms and Privacy Checkboxes */}
      <div className="space-y-4">
        <Checkbox
          label={
            <span>
              {getTranslatedText('agreeTerms')}{' '}
              <button
                type="button"
                onClick={onShowTerms}
                className="text-primary hover:underline font-medium"
              >
                {getTranslatedText('termsLink')}
              </button>
            </span>
          }
          checked={formData?.agreeTerms}
          onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
          error={errors?.agreeTerms}
          required
        />

        <Checkbox
          label={
            <span>
              {getTranslatedText('agreePrivacy')}{' '}
              <button
                type="button"
                onClick={onShowPrivacy}
                className="text-primary hover:underline font-medium"
              >
                {getTranslatedText('privacyLink')}
              </button>
            </span>
          }
          checked={formData?.agreePrivacy}
          onChange={(e) => handleInputChange('agreePrivacy', e?.target?.checked)}
          error={errors?.agreePrivacy}
          required
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8"
      >
        {getTranslatedText('createAccount')}
      </Button>
    </form>
  );
};

export default RegistrationForm;