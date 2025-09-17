import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();

  const pathMappings = {
    '/health-dashboard': {
      label: 'Health Dashboard',
      icon: 'Activity'
    },
    '/symptom-checker': {
      label: 'Symptom Checker',
      icon: 'Stethoscope'
    },
    '/medical-report-analysis': {
      label: 'Medical Report Analysis',
      icon: 'FileText'
    },
    '/emergency-response': {
      label: 'Emergency Response',
      icon: 'AlertTriangle'
    },
    '/user-registration': {
      label: 'User Registration',
      icon: 'UserPlus'
    },
    '/user-login': {
      label: 'User Login',
      icon: 'LogIn'
    }
  };

  const currentPath = location?.pathname;
  const currentPage = pathMappings?.[currentPath];

  // Don't show breadcrumbs on login/registration pages
  if (currentPath === '/user-login' || currentPath === '/user-registration') {
    return null;
  }

  // Don't show breadcrumbs on dashboard (it's the home)
  if (currentPath === '/health-dashboard') {
    return null;
  }

  if (!currentPage) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {/* Home/Dashboard Link */}
      <Link
        to="/health-dashboard"
        className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-gentle"
      >
        <Icon name="Home" size={16} />
        <span>Dashboard</span>
      </Link>
      {/* Separator */}
      <Icon name="ChevronRight" size={16} className="text-text-secondary" />
      {/* Current Page */}
      <div className="flex items-center space-x-1 text-text-primary">
        <Icon name={currentPage?.icon} size={16} color="var(--color-primary)" />
        <span className="font-medium">{currentPage?.label}</span>
      </div>
    </nav>
  );
};

export default Breadcrumbs;