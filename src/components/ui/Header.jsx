import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/health-dashboard',
      icon: 'Activity',
      tooltip: 'View your health overview and metrics'
    },
    {
      label: 'Symptom Checker',
      path: '/symptom-checker',
      icon: 'Stethoscope',
      tooltip: 'AI-powered symptom analysis'
    },
    {
      label: 'Medical Reports',
      path: '/medical-report-analysis',
      icon: 'FileText',
      tooltip: 'Analyze and manage medical reports'
    },
    {
      label: 'Emergency',
      path: '/emergency-response',
      icon: 'AlertTriangle',
      tooltip: 'Emergency response and crisis management'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b medical-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/health-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-primary">
                ArogyaPlus
              </h1>
              <p className="text-xs font-caption text-text-secondary">
                Healthcare Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-gentle hover:bg-muted group ${
                isActivePath(item?.path)
                  ? 'bg-primary/10 text-primary border health-status-border' :'text-text-primary hover:text-primary'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                color={isActivePath(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
              />
              <span className="font-medium text-sm">{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">Puneet Kushwaha</p>
              <p className="text-xs text-text-secondary">Health ID: HP2025001</p>
            </div>
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t medical-border">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-gentle ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border health-status-border' :'text-text-primary hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActivePath(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
                />
                <div>
                  <span className="font-medium">{item?.label}</span>
                  <p className="text-xs text-text-secondary mt-1">{item?.tooltip}</p>
                </div>
              </Link>
            ))}
            
            {/* Mobile User Profile */}
            <div className="flex items-center space-x-3 px-4 py-3 mt-4 border-t medical-border">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Dr. Patient</p>
                <p className="text-sm text-text-secondary">Health ID: HP2025001</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;