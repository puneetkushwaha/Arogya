import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthTrendGraphs = () => {
  const [activeMetric, setActiveMetric] = useState('bloodPressure');
  const [dateRange, setDateRange] = useState('7days');

  const bloodPressureData = [
    { date: '12 Jan', systolic: 120, diastolic: 80, time: '09:00' },
    { date: '13 Jan', systolic: 118, diastolic: 78, time: '09:15' },
    { date: '14 Jan', systolic: 122, diastolic: 82, time: '08:45' },
    { date: '15 Jan', systolic: 119, diastolic: 79, time: '09:30' },
    { date: '16 Jan', systolic: 121, diastolic: 81, time: '09:00' },
    { date: '17 Jan', systolic: 117, diastolic: 77, time: '08:30' },
    { date: '18 Jan', systolic: 120, diastolic: 80, time: '09:10' }
  ];

  const bloodSugarData = [
    { date: '12 Jan', fasting: 95, postMeal: 140, time: '07:00' },
    { date: '13 Jan', fasting: 92, postMeal: 135, time: '07:15' },
    { date: '14 Jan', fasting: 98, postMeal: 145, time: '06:45' },
    { date: '15 Jan', fasting: 94, postMeal: 138, time: '07:30' },
    { date: '16 Jan', fasting: 96, postMeal: 142, time: '07:00' },
    { date: '17 Jan', fasting: 91, postMeal: 132, time: '06:30' },
    { date: '18 Jan', fasting: 95, postMeal: 140, time: '07:10' }
  ];

  const weightData = [
    { date: '12 Jan', weight: 68.2, bmi: 22.1 },
    { date: '13 Jan', weight: 68.0, bmi: 22.0 },
    { date: '14 Jan', weight: 68.3, bmi: 22.2 },
    { date: '15 Jan', weight: 68.1, bmi: 22.1 },
    { date: '16 Jan', weight: 68.4, bmi: 22.2 },
    { date: '17 Jan', weight: 68.2, bmi: 22.1 },
    { date: '18 Jan', weight: 68.5, bmi: 22.3 }
  ];

  const metrics = [
    {
      id: 'bloodPressure',
      title: 'Blood Pressure',
      icon: 'Heart',
      color: '#2196F3',
      unit: 'mmHg',
      data: bloodPressureData,
      lines: [
        { key: 'systolic', name: 'Systolic', color: '#2196F3' },
        { key: 'diastolic', name: 'Diastolic', color: '#4CAF50' }
      ]
    },
    {
      id: 'bloodSugar',
      title: 'Blood Sugar',
      icon: 'Droplets',
      color: '#FF9800',
      unit: 'mg/dL',
      data: bloodSugarData,
      lines: [
        { key: 'fasting', name: 'Fasting', color: '#FF9800' },
        { key: 'postMeal', name: 'Post Meal', color: '#F44336' }
      ]
    },
    {
      id: 'weight',
      title: 'Weight & BMI',
      icon: 'Scale',
      color: '#4CAF50',
      unit: 'kg',
      data: weightData,
      lines: [
        { key: 'weight', name: 'Weight (kg)', color: '#4CAF50' }
      ]
    }
  ];

  const dateRanges = [
    { id: '7days', label: '7 Days' },
    { id: '1month', label: '1 Month' },
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' }
  ];

  const currentMetric = metrics?.find(m => m?.id === activeMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card p-3 rounded-lg card-elevation-2 border medical-border">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-text-secondary">{entry?.name}:</span>
              <span className="font-medium text-text-primary">
                {entry?.value} {currentMetric?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">Health Trends</h2>
        <div className="flex items-center space-x-1 text-sm text-text-secondary">
          <Icon name="TrendingUp" size={16} />
          <span>Analytics</span>
        </div>
      </div>
      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {metrics?.map((metric) => (
          <button
            key={metric?.id}
            onClick={() => setActiveMetric(metric?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-gentle ${
              activeMetric === metric?.id
                ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={metric?.icon} size={16} />
            <span>{metric?.title}</span>
          </button>
        ))}
      </div>
      {/* Date Range Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {dateRanges?.map((range) => (
            <button
              key={range?.id}
              onClick={() => setDateRange(range?.id)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-gentle ${
                dateRange === range?.id
                  ? 'bg-primary/10 text-primary' :'text-text-secondary hover:bg-muted'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="ghost" size="sm" iconName="Share">
            Share
          </Button>
        </div>
      </div>
      {/* Chart Container */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentMetric?.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis 
              dataKey="date" 
              stroke="#757575"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#757575"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {currentMetric?.lines?.map((line) => (
              <Line
                key={line?.key}
                type="monotone"
                dataKey={line?.key}
                stroke={line?.color}
                strokeWidth={2}
                dot={{ fill: line?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: line?.color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {currentMetric?.lines?.map((line) => {
          const latestValue = currentMetric?.data?.[currentMetric?.data?.length - 1]?.[line?.key];
          const previousValue = currentMetric?.data?.[currentMetric?.data?.length - 2]?.[line?.key];
          const change = latestValue - previousValue;
          const changePercent = ((change / previousValue) * 100)?.toFixed(1);
          
          return (
            <div key={line?.key} className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: line?.color }}
                ></div>
                <span className="text-sm font-medium text-text-primary">{line?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-heading font-bold text-text-primary">
                  {latestValue} {currentMetric?.unit}
                </span>
                <div className={`flex items-center space-x-1 text-sm ${
                  change > 0 ? 'text-error' : change < 0 ? 'text-success' : 'text-text-secondary'
                }`}>
                  <Icon 
                    name={change > 0 ? 'TrendingUp' : change < 0 ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                  />
                  <span>{Math.abs(changePercent)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t medical-border">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Info" size={16} />
          <span>Data updated automatically from connected devices</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Plus">
            Add Data
          </Button>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendGraphs;