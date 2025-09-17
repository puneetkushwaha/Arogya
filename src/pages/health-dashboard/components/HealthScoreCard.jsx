import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthScoreCard = () => {
  const healthScore = 85;
  const previousScore = 78;
  const trend = healthScore > previousScore ? 'up' : 'down';
  const trendPercentage = Math.abs(((healthScore - previousScore) / previousScore) * 100)?.toFixed(1);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-2 border medical-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-text-primary">Health Score</h2>
        <div className={`p-2 rounded-lg ${getScoreBg(healthScore)}`}>
          <Icon name="Heart" size={24} color="var(--color-success)" />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className={`text-5xl font-heading font-bold ${getScoreColor(healthScore)} mb-2`}>
          {healthScore}
        </div>
        <div className="text-text-secondary text-sm">out of 100</div>
      </div>

      <div className="flex items-center justify-center space-x-2 mb-4">
        <Icon 
          name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
          size={16} 
          color={trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
        />
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
          {trendPercentage}% from last week
        </span>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-text-primary">Health Goal</span>
        </div>
        <p className="text-sm text-text-secondary">
          Maintain score above 80 for optimal wellness
        </p>
      </div>
    </div>
  );
};

export default HealthScoreCard;