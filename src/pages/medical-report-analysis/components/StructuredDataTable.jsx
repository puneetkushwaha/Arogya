import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StructuredDataTable = ({ interpretation }) => {
  const [sortBy, setSortBy] = useState('parameter');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('all');

  const mockHealthParameters = [
    {
      category: "Blood Count",
      parameter: "Hemoglobin",
      value: "12.5",
      unit: "g/dL",
      referenceRange: "13.5-17.5",
      status: "low",
      severity: "mild",
      description: "Protein in red blood cells that carries oxygen"
    },
    {
      category: "Blood Count",
      parameter: "RBC Count",
      value: "4.2",
      unit: "million/μL",
      referenceRange: "4.5-5.9",
      status: "low",
      severity: "mild",
      description: "Red blood cell count"
    },
    {
      category: "Blood Count",
      parameter: "WBC Count",
      value: "7,800",
      unit: "/μL",
      referenceRange: "4,000-11,000",
      status: "normal",
      severity: "normal",
      description: "White blood cell count"
    },
    {
      category: "Blood Count",
      parameter: "Platelet Count",
      value: "250,000",
      unit: "/μL",
      referenceRange: "150,000-450,000",
      status: "normal",
      severity: "normal",
      description: "Blood clotting cells"
    },
    {
      category: "Lipid Profile",
      parameter: "Total Cholesterol",
      value: "220",
      unit: "mg/dL",
      referenceRange: "<200",
      status: "high",
      severity: "moderate",
      description: "Total cholesterol in blood"
    },
    {
      category: "Lipid Profile",
      parameter: "LDL Cholesterol",
      value: "140",
      unit: "mg/dL",
      referenceRange: "<100",
      status: "high",
      severity: "moderate",
      description: "Bad cholesterol"
    },
    {
      category: "Lipid Profile",
      parameter: "HDL Cholesterol",
      value: "45",
      unit: "mg/dL",
      referenceRange: ">40",
      status: "normal",
      severity: "normal",
      description: "Good cholesterol"
    },
    {
      category: "Lipid Profile",
      parameter: "Triglycerides",
      value: "180",
      unit: "mg/dL",
      referenceRange: "<150",
      status: "high",
      severity: "mild",
      description: "Blood fats"
    },
    {
      category: "Liver Function",
      parameter: "SGPT/ALT",
      value: "35",
      unit: "U/L",
      referenceRange: "7-56",
      status: "normal",
      severity: "normal",
      description: "Liver enzyme"
    },
    {
      category: "Liver Function",
      parameter: "SGOT/AST",
      value: "28",
      unit: "U/L",
      referenceRange: "10-40",
      status: "normal",
      severity: "normal",
      description: "Liver enzyme"
    },
    {
      category: "Kidney Function",
      parameter: "Blood Urea",
      value: "25",
      unit: "mg/dL",
      referenceRange: "15-40",
      status: "normal",
      severity: "normal",
      description: "Kidney waste product"
    },
    {
      category: "Kidney Function",
      parameter: "Serum Creatinine",
      value: "1.1",
      unit: "mg/dL",
      referenceRange: "0.7-1.3",
      status: "normal",
      severity: "normal",
      description: "Kidney function marker"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'low': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-text-primary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'normal': return 'bg-success/10';
      case 'low': return 'bg-warning/10';
      case 'high': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return 'CheckCircle';
      case 'low': return 'ArrowDown';
      case 'high': return 'ArrowUp';
      default: return 'Circle';
    }
  };

  const filteredData = mockHealthParameters?.filter(item => {
    if (filterBy === 'all') return true;
    return item?.status === filterBy;
  });

  const sortedData = [...filteredData]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'value') {
      aValue = parseFloat(aValue?.replace(/,/g, ''));
      bValue = parseFloat(bValue?.replace(/,/g, ''));
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Category', 'Parameter', 'Value', 'Unit', 'Reference Range', 'Status'],
      ...sortedData?.map(item => [
        item?.category,
        item?.parameter,
        item?.value,
        item?.unit,
        item?.referenceRange,
        item?.status
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical-report-data.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (!interpretation) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Table" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-text-primary">
              Structured Health Data
            </h3>
            <p className="text-sm text-text-secondary">
              Extracted parameters with reference ranges
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={exportData}
          iconName="Download"
          iconPosition="left"
        >
          Export CSV
        </Button>
      </div>
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} color="var(--color-text-secondary)" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e?.target?.value)}
              className="text-sm border border-border rounded-lg px-3 py-1 bg-card"
            >
              <option value="all">All Results</option>
              <option value="normal">Normal Only</option>
              <option value="high">High Values</option>
              <option value="low">Low Values</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-text-secondary">
              {mockHealthParameters?.filter(p => p?.status === 'normal')?.length} Normal
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-text-secondary">
              {mockHealthParameters?.filter(p => p?.status === 'low')?.length} Low
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-text-secondary">
              {mockHealthParameters?.filter(p => p?.status === 'high')?.length} High
            </span>
          </div>
        </div>
      </div>
      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left py-3 px-4 font-medium text-text-primary cursor-pointer hover:bg-muted/50 transition-gentle"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-2">
                  <span>Category</span>
                  {sortBy === 'category' && (
                    <Icon name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-text-primary cursor-pointer hover:bg-muted/50 transition-gentle"
                onClick={() => handleSort('parameter')}
              >
                <div className="flex items-center space-x-2">
                  <span>Parameter</span>
                  {sortBy === 'parameter' && (
                    <Icon name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-text-primary cursor-pointer hover:bg-muted/50 transition-gentle"
                onClick={() => handleSort('value')}
              >
                <div className="flex items-center space-x-2">
                  <span>Value</span>
                  {sortBy === 'value' && (
                    <Icon name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">
                Reference Range
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((item, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/30 transition-gentle">
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-text-primary">
                    {item?.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <span className="text-sm font-medium text-text-primary">
                      {item?.parameter}
                    </span>
                    <p className="text-xs text-text-secondary mt-1">
                      {item?.description}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-mono font-medium text-text-primary">
                    {item?.value} {item?.unit}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-mono text-text-secondary">
                    {item?.referenceRange} {item?.unit}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getStatusBg(item?.status)}`}>
                      <Icon 
                        name={getStatusIcon(item?.status)} 
                        size={12} 
                        color={`var(--color-${item?.status === 'normal' ? 'success' : item?.status === 'low' ? 'warning' : 'error'})`} 
                      />
                      <span className={`text-xs font-medium ${getStatusColor(item?.status)}`}>
                        {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Showing {sortedData?.length} of {mockHealthParameters?.length} parameters</span>
          <span>Last updated: {new Date()?.toLocaleDateString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default StructuredDataTable;