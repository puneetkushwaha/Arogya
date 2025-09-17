import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ currentLanguage, translations }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    'patient@arogyaplus.com': { password: 'patient123', type: 'patient' },
    'doctor@arogyaplus.com': { password: 'doctor123', type: 'doctor' },
    '9876543210': { password: 'mobile123', type: 'patient' },
    'admin@arogyaplus.com': { password: 'admin123', type: 'admin' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.identifier?.trim()) {
      newErrors.identifier = translations?.errors?.identifierRequired;
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = translations?.errors?.passwordRequired;
    } else if (formData?.password?.length < 6) {
      newErrors.password = translations?.errors?.passwordMinLength;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const credential = mockCredentials?.[formData?.identifier];
      
      if (!credential || credential?.password !== formData?.password) {
        setErrors({
          general: translations?.errors?.invalidCredentials
        });
        setIsLoading(false);
        return;
      }
      
      // Create mock session
      const sessionData = {
        userId: `user_${Date.now()}`,
        email: formData?.identifier,
        userType: credential?.type,
        loginTime: new Date()?.toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)?.getTime() // 24 hours
      };
      
      // Store authentication data
      localStorage.setItem('arogyaplus_auth_token', `token_${Date.now()}`);
      localStorage.setItem('arogyaplus_user_session', JSON.stringify(sessionData));
      localStorage.setItem('arogyaplus_language', currentLanguage);
      
      if (formData?.rememberMe) {
        localStorage.setItem('arogyaplus_remember_user', formData?.identifier);
      }
      
      // Navigate to dashboard
      navigate('/health-dashboard');
      
    } catch (error) {
      setErrors({
        general: translations?.errors?.loginFailed
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert(translations?.alerts?.forgotPasswordInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" />
          <p className="text-error text-sm font-medium">{errors?.general}</p>
        </div>
      )}
      {/* Email/Phone Input */}
      <Input
        label={translations?.form?.identifierLabel}
        type="text"
        name="identifier"
        value={formData?.identifier}
        onChange={handleInputChange}
        placeholder={translations?.form?.identifierPlaceholder}
        error={errors?.identifier}
        required
        className="w-full"
      />
      {/* Password Input */}
      <div className="relative">
        <Input
          label={translations?.form?.passwordLabel}
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder={translations?.form?.passwordPlaceholder}
          error={errors?.password}
          required
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-gentle"
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>
      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          label={translations?.form?.rememberMe}
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-gentle"
        >
          {translations?.form?.forgotPassword}
        </button>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="h-12"
      >
        {translations?.form?.signInButton}
      </Button>
    </form>
  );
};

export default LoginForm;