import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Symptom Checker",
      description: "AI-powered health assessment",
      icon: "Stethoscope",
      color: "bg-primary",
      route: "/symptom-checker",
      features: ["Voice input", "Text analysis", "Doctor recommendations"]
    },
    {
      id: 2,
      title: "Upload Medical Report",
      description: "Analyze reports with AI",
      icon: "FileText",
      color: "bg-secondary",
      route: "/medical-report-analysis",
      features: ["PDF upload", "OCR extraction", "AI interpretation"]
    },
    {
      id: 3,
      title: "Health Data Entry",
      description: "Log your health metrics",
      icon: "PlusCircle",
      color: "bg-accent",
      route: "/health-data-entry",
      features: ["Blood pressure", "Weight", "Blood sugar"]
    },
    {
      id: 4,
      title: "Medicine Search",
      description: "Find medicine information",
      icon: "Search",
      color: "bg-warning",
      route: "/medicine-search",
      features: ["Drug database", "Side effects", "Interactions"]
    },
    {
      id: 5,
      title: "Health Chat",
      description: "AI health assistant",
      icon: "MessageCircle",
      color: "bg-success",
      route: "/https://chatgpt.com/",
      features: ["24/7 support", "Multilingual", "Health tips"]
    },
    {
      id: 6,
      title: "Emergency Response",
      description: "Crisis management",
      icon: "AlertTriangle",
      color: "bg-error",
      route: "/emergency-response",
      features: ["Auto detection", "GPS location", "Emergency contacts"]
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">Quick Actions</h2>
        <div className="flex items-center space-x-1 text-sm text-text-secondary">
          <Icon name="Zap" size={16} />
          <span>Fast Access</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className="group border medical-border rounded-lg p-4 hover:card-elevation-2 transition-all duration-300 cursor-pointer hover:border-primary/30"
            onClick={() => handleActionClick(action?.route)}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`p-3 ${action?.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                  {action?.title}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {action?.description}
                </p>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {action?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full group-hover:bg-primary/10 group-hover:text-primary"
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t medical-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>All features are available 24/7</span>
          </div>
          <Button variant="outline" size="sm" iconName="HelpCircle">
            Need Help?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards;