import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ translations }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Mail',
      color: 'bg-red-500 hover:bg-red-600',
      action: () => handleSocialLogin('google')
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => handleSocialLogin('facebook')
    }
  ];

  const handleSocialLogin = (provider) => {
    // In a real app, this would integrate with OAuth providers
    alert(`${translations?.alerts?.socialLoginInfo} ${provider}`);
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-text-secondary">
            {translations?.form?.orContinueWith}
          </span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            onClick={provider?.action}
            className="h-12 flex items-center justify-center space-x-2"
          >
            <Icon name={provider?.icon} size={20} />
            <span>{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;