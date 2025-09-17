import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EmergencyFloatingButton from '../../components/ui/EmergencyFloatingButton';
import HealthScoreCard from './components/HealthScoreCard';
import HealthMetricsGrid from './components/HealthMetricsGrid';
import UpcomingCheckups from './components/UpcomingCheckups';
import QuickActionCards from './components/QuickActionCards';
import HealthTipsCards from './components/HealthTipsCards';
import HealthTrendGraphs from './components/HealthTrendGraphs';
import Icon from '../../components/AppIcon';

const HealthDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('arogyaplus_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Set greeting based on time of day
    const hour = new Date()?.getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Health Dashboard - Arogya+ | Your Personal Healthcare Hub</title>
        <meta name="description" content="Monitor your health metrics, track wellness trends, and access AI-powered healthcare services through your personalized ArogyaPlus dashboard." />
        <meta name="keywords" content="health dashboard, health metrics, wellness tracking, healthcare platform, medical reports, symptom checker" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs />
            
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                    {greeting}, Puneet Kushwaha! 👋
                  </h1>
                  <p className="text-text-secondary">
                    Welcome to your health dashboard. Here's your wellness overview for today.
                  </p>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-2xl font-heading font-bold text-primary">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {formatDate(currentTime)}
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Bar */}
              <div className="bg-card rounded-lg p-4 card-elevation-1 border medical-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Icon name="Activity" size={20} color="var(--color-success)" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Health Score</div>
                      <div className="font-heading font-bold text-success">85/100</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Calendar" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Next Checkup</div>
                      <div className="font-heading font-bold text-primary">3 days</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Icon name="Bell" size={20} color="var(--color-warning)" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Alerts</div>
                      <div className="font-heading font-bold text-warning">2 pending</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Trend</div>
                      <div className="font-heading font-bold text-accent">Improving</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="space-y-8">
              {/* Top Row - Health Score and Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <HealthScoreCard />
                </div>
                <div className="lg:col-span-3">
                  <HealthMetricsGrid />
                </div>
              </div>

              {/* Upcoming Checkups and Alerts */}
              <UpcomingCheckups />

              {/* Quick Actions */}
              <QuickActionCards />

              {/* Health Trends */}
              <HealthTrendGraphs />

              {/* Health Tips */}
              <HealthTipsCards />
            </div>

            {/* Footer Info */}
            <div className="mt-12 pt-8 border-t medical-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-text-secondary">
                  <Icon name="Shield" size={16} />
                  <span className="text-sm">Data secured with 256-bit encryption</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-text-secondary">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">Servers located in India</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-text-secondary">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">24/7 Emergency Support</span>
                </div>
              </div>
              <div className="text-center mt-4 text-xs text-text-secondary">
                © {new Date()?.getFullYear()} Arogya+. All rights reserved. | Health ID: HP2025001
              </div>
            </div>
          </div>
        </main>

        <EmergencyFloatingButton />
      </div>
    </>
  );
};

export default HealthDashboard;