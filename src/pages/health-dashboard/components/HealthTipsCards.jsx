import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthTipsCards = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const healthTips = [
    {
      id: 1,
      category: 'diet',
      title: "Balanced Nutrition",
      tip: "Include 5 servings of fruits and vegetables daily for optimal nutrition and disease prevention.",
      icon: "Apple",
      color: "bg-success",
      readTime: "2 min read",
      priority: "high",
      source: "Nutritionist Approved"
    },
    {
      id: 2,
      category: 'hydration',
      title: "Stay Hydrated",
      tip: "Drink 8-10 glasses of water daily. Start your day with a glass of warm water with lemon.",
      icon: "Droplets",
      color: "bg-primary",
      readTime: "1 min read",
      priority: "high",
      source: "WHO Guidelines"
    },
    {
      id: 3,
      category: 'exercise',
      title: "Daily Movement",
      tip: "Aim for 30 minutes of moderate exercise daily. Even a brisk walk can improve cardiovascular health.",
      icon: "Activity",
      color: "bg-accent",
      readTime: "3 min read",
      priority: "medium",
      source: "Fitness Expert"
    },
    {
      id: 4,
      category: 'sleep',
      title: "Quality Sleep",
      tip: "Maintain 7-9 hours of sleep nightly. Create a consistent bedtime routine for better rest.",
      icon: "Moon",
      color: "bg-secondary",
      readTime: "2 min read",
      priority: "high",
      source: "Sleep Foundation"
    },
    {
      id: 5,
      category: 'mental',
      title: "Stress Management",
      tip: "Practice deep breathing or meditation for 10 minutes daily to reduce stress and anxiety.",
      icon: "Brain",
      color: "bg-warning",
      readTime: "4 min read",
      priority: "medium",
      source: "Mental Health Expert"
    },
    {
      id: 6,
      category: 'preventive',
      title: "Regular Checkups",
      tip: "Schedule annual health screenings and don't skip routine medical appointments.",
      icon: "Shield",
      color: "bg-error",
      readTime: "2 min read",
      priority: "high",
      source: "Medical Guidelines"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tips', icon: 'Grid3X3' },
    { id: 'diet', label: 'Diet', icon: 'Apple' },
    { id: 'hydration', label: 'Hydration', icon: 'Droplets' },
    { id: 'exercise', label: 'Exercise', icon: 'Activity' },
    { id: 'sleep', label: 'Sleep', icon: 'Moon' },
    { id: 'mental', label: 'Mental Health', icon: 'Brain' },
    { id: 'preventive', label: 'Prevention', icon: 'Shield' }
  ];

  const filteredTips = activeCategory === 'all' 
    ? healthTips 
    : healthTips?.filter(tip => tip?.category === activeCategory);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">Daily Health Tips</h2>
        <div className="flex items-center space-x-1 text-sm text-text-secondary">
          <Icon name="Lightbulb" size={16} />
          <span>Expert Advice</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-gentle ${
              activeCategory === category?.id
                ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Health Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTips?.map((tip) => (
          <div key={tip?.id} className="border medical-border rounded-lg p-4 hover:card-elevation-2 transition-gentle group">
            <div className="flex items-start space-x-3 mb-3">
              <div className={`p-2 ${tip?.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={tip?.icon} size={18} color="white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-text-primary">{tip?.title}</h3>
                  <div className={`w-2 h-2 rounded-full ${tip?.priority === 'high' ? 'bg-error' : tip?.priority === 'medium' ? 'bg-warning' : 'bg-success'}`}></div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {tip?.tip}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{tip?.readTime}</span>
                </div>
                <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
                <span className={getPriorityColor(tip?.priority)}>
                  {tip?.priority?.toUpperCase()}
                </span>
              </div>
              <span className="font-medium">{tip?.source}</span>
            </div>

            <div className="mt-3 pt-3 border-t medical-border">
              <Button variant="ghost" size="xs" iconName="BookOpen" className="w-full">
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredTips?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-text-secondary" />
          <p className="text-text-secondary">No tips found for this category</p>
        </div>
      )}
      <div className="mt-6 pt-6 border-t medical-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="RefreshCw" size={16} />
            <span>Tips updated daily</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Bookmark">
              Save Tips
            </Button>
            <Button variant="outline" size="sm" iconName="Share">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTipsCards;