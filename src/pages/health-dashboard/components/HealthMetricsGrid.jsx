import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricsGrid = () => {
  const healthMetrics = [
    {
      id: 1,
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      trend: "stable",
      icon: "Heart",
      lastUpdated: "2 hours ago",
      chartData: [118, 120, 115, 122, 120, 118, 120]
    },
    {
      id: 2,
      title: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "normal",
      trend: "down",
      icon: "Droplets",
      lastUpdated: "4 hours ago",
      chartData: [102, 98, 95, 100, 97, 94, 95]
    },
    {
      id: 3,
      title: "Weight",
      value: "68.5",
      unit: "kg",
      status: "normal",
      trend: "up",
      icon: "Scale",
      lastUpdated: "1 day ago",
      chartData: [67.8, 68.0, 68.2, 68.1, 68.3, 68.4, 68.5]
    },
    {
      id: 4,
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      trend: "stable",
      icon: "Activity",
      lastUpdated: "30 minutes ago",
      chartData: [70, 72, 74, 71, 73, 72, 72]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'normal': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'critical': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'var(--color-success)';
      case 'down': return 'var(--color-error)';
      case 'stable': return 'var(--color-text-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const renderMiniChart = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="flex items-end space-x-1 h-8">
        {data?.map((value, index) => {
          const height = ((value - min) / range) * 24 + 4;
          return (
            <div
              key={index}
              className="bg-primary/30 rounded-sm flex-1"
              style={{ height: `${height}px` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {healthMetrics?.map((metric) => (
        <div key={metric?.id} className="bg-card rounded-xl p-6 card-elevation-1 border medical-border hover:card-elevation-2 transition-gentle">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${getStatusBg(metric?.status)}`}>
              <Icon name={metric?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon(metric?.trend)} 
                size={14} 
                color={getTrendColor(metric?.trend)} 
              />
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-medium text-text-secondary mb-1">{metric?.title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-heading font-bold ${getStatusColor(metric?.status)}`}>
                {metric?.value}
              </span>
              <span className="text-sm text-text-secondary">{metric?.unit}</span>
            </div>
          </div>

          <div className="mb-3">
            {renderMiniChart(metric?.chartData)}
          </div>

          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span className={`px-2 py-1 rounded-full ${getStatusBg(metric?.status)} ${getStatusColor(metric?.status)} font-medium`}>
              {metric?.status?.toUpperCase()}
            </span>
            <span>{metric?.lastUpdated}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthMetricsGrid;