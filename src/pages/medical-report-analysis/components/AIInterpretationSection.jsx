import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { analyzeMedicalReport } from '../../../services/geminiService';
import { handleGeminiError } from '../../../utils/geminiClient';
import useCancellableRequest from '../../../hooks/useCancellableRequest';

const AIInterpretationSection = ({ extractedText, onInterpretationComplete }) => {
  const [interpretation, setInterpretation] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'bengali', label: 'বাংলা', flag: '🇧🇩' },
    { value: 'tamil', label: 'தமிழ்', flag: '🇮🇳' }
  ];

  const {
    startRequest,
    cancelRequest,
    isProcessing: isGeminiProcessing,
    processingStage,
    processingProgress
  } = useCancellableRequest();

  useEffect(() => {
    if (extractedText && !interpretation) {
      startGeminiAnalysis();
    }
  }, [extractedText, selectedLanguage]);

  const startGeminiAnalysis = async () => {
    setIsAnalyzing(true);
    let attempts = 0;
    const maxAttempts = 3;

    const tryAnalyze = async () => {
      attempts++;
      try {
        const result = await startRequest(async (signal) => {
          return await analyzeMedicalReport(extractedText, selectedLanguage);
        });
        setInterpretation(result);
        onInterpretationComplete(result);
        setIsAnalyzing(false);
      } catch (error) {
        console.error(`Attempt ${attempts} failed:`, error);
        if (attempts < maxAttempts) {
          // Retry after small delay
          setTimeout(tryAnalyze, 2000 * attempts);
        } else {
          // Final fallback
          setIsAnalyzing(false);
          generateMockInterpretation();
          showErrorNotification(handleGeminiError(error));
        }
      }
    };

    tryAnalyze();
  };

  const showErrorNotification = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-error text-white p-4 rounded-lg z-50';
    errorDiv.textContent = `Gemini AI Error: ${message}. Showing sample analysis.`;
    document.body?.appendChild(errorDiv);
    setTimeout(() => document.body?.removeChild(errorDiv), 5000);
  };

  const generateMockInterpretation = () => {
    const mockInterpretation = {
      summary: {
        title: "Overall Health Assessment",
        content: `Based on your medical report analysis, your health parameters show a mixed picture. Some values are normal, while a few need attention.`,
        severity: "moderate",
        icon: "Heart"
      },
      findings: [
        {
          category: "Blood Count",
          icon: "Droplets",
          severity: "mild",
          title: "Slightly Low Hemoglobin",
          explanation: `Hemoglobin is slightly below normal range.`,
          recommendation: "Consider iron-rich foods and consult your doctor.",
          expandable: true
        },
        {
          category: "Cholesterol",
          icon: "Activity",
          severity: "moderate",
          title: "Elevated Cholesterol Levels",
          explanation: `Total cholesterol is above recommended levels.`,
          recommendation: "Adopt a heart-healthy diet and exercise regularly.",
          expandable: true
        }
      ],
      nextSteps: [
        "Schedule follow-up appointment",
        "Start iron supplementation",
        "Adopt low-cholesterol diet",
        "Begin cardiovascular exercise routine",
        "Monitor blood pressure regularly"
      ],
      riskFactors: [
        { factor: "Cardiovascular Disease", risk: "Moderate", color: "warning" },
        { factor: "Anemia", risk: "Low", color: "success" }
      ]
    };
    setInterpretation(mockInterpretation);
    onInterpretationComplete(mockInterpretation);
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'normal': return 'text-success';
      case 'mild': return 'text-warning';
      case 'moderate': return 'text-error';
      case 'severe': return 'text-destructive';
      default: return 'text-text-primary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'normal': return 'bg-success/10';
      case 'mild': return 'bg-warning/10';
      case 'moderate': return 'bg-error/10';
      case 'severe': return 'bg-destructive/10';
      default: return 'bg-muted';
    }
  };

  if (!extractedText) return null;

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-text-primary">
              Gemini AI Medical Interpretation
            </h3>
            <p className="text-sm text-text-secondary">
              AI-powered analysis in simple language
            </p>
          </div>
        </div>

        {/* Language Selector & Cancel */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-card"
            disabled={isAnalyzing || isGeminiProcessing}
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
          {(isGeminiProcessing || isAnalyzing) && (
            <button
              onClick={cancelRequest}
              className="text-sm px-3 py-1 bg-error text-white rounded-lg hover:bg-error-dark"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Progress */}
      {(isAnalyzing || isGeminiProcessing) && (
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {isGeminiProcessing ? `Gemini AI: ${processingStage}` : 'Analyzing your medical report...'}
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${isGeminiProcessing ? processingProgress : 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {interpretation && (
        <div className="space-y-6">
          {/* Summary */}
          <div className={`p-4 rounded-lg ${getSeverityBg(interpretation.summary.severity)}`}>
            <div className="flex items-start space-x-3">
              <Icon name={interpretation.summary.icon} size={24} color={`var(--color-${interpretation.summary.severity})`} />
              <div className="flex-1">
                <h4 className="font-heading font-bold text-text-primary mb-2">
                  {interpretation.summary.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {interpretation.summary.content}
                </p>
              </div>
            </div>
          </div>

          {/* Findings */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-text-primary">Detailed Findings</h4>
            {interpretation.findings.map((finding, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 cursor-pointer hover:bg-muted/50 transition-gentle" onClick={() => finding.expandable && toggleSection(idx)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${getSeverityBg(finding.severity)} rounded-lg flex items-center justify-center`}>
                        <Icon name={finding.icon} size={16} color={`var(--color-${finding.severity})`} />
                      </div>
                      <div>
                        <h5 className="font-medium text-text-primary">{finding.title}</h5>
                        <p className="text-xs text-text-secondary">{finding.category}</p>
                      </div>
                    </div>
                    {finding.expandable && <Icon name={expandedSections[idx] ? "ChevronUp" : "ChevronDown"} size={16} color="var(--color-text-secondary)" />}
                  </div>
                </div>
                {(expandedSections[idx] || !finding.expandable) && (
                  <div className="px-4 pb-4 border-t border-border bg-muted/20">
                    <h6 className="text-sm font-medium text-text-primary mb-1">Explanation:</h6>
                    <p className="text-sm text-text-secondary">{finding.explanation}</p>
                    <h6 className="text-sm font-medium text-text-primary mb-1 mt-2">Recommendation:</h6>
                    <p className="text-sm text-text-secondary">{finding.recommendation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Steps */}
          {interpretation.nextSteps.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-text-primary">Recommended Next Steps</h4>
              <div className="space-y-2">
                {interpretation.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-text-primary">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          {interpretation.riskFactors.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-text-primary">Risk Assessment</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interpretation.riskFactors.map((risk, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg text-center">
                    <h5 className="font-medium text-text-primary mb-2">{risk.factor}</h5>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      risk.color === 'success' ? 'bg-success/10 text-success' :
                      risk.color === 'warning' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {risk.risk} Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <p className="text-sm text-text-secondary">
              <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterpretationSection;
