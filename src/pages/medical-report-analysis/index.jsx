import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EmergencyFloatingButton from '../../components/ui/EmergencyFloatingButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import FileUploadZone from './components/FileUploadZone';
import OCRExtractionPanel from './components/OCRExtractionPanel';
import AIInterpretationSection from './components/AIInterpretationSection';
import StructuredDataTable from './components/StructuredDataTable';
import ActionButtons from './components/ActionButtons';

const MedicalReportAnalysis = () => {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [interpretation, setInterpretation] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);
  const navigate = useNavigate();

  // Load language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arogyaplus_language') || 'english';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setAnalysisStep(2);
    setIsProcessing(true);
  };

  const handleTextExtracted = (text) => {
    setExtractedText(text);
    setIsProcessing(false);
    if (text) {
      setAnalysisStep(3);
    }
  };

  const handleInterpretationComplete = (interpretationData) => {
    setInterpretation(interpretationData);
    setAnalysisStep(4);
  };

  const handleSaveToHistory = (reportData) => {
    // Navigate to dashboard with success message
    navigate('/health-dashboard', { 
      state: { 
        message: 'Medical report analysis saved to your health history successfully!',
        type: 'success'
      }
    });
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setExtractedText('');
    setInterpretation(null);
    setIsProcessing(false);
    setAnalysisStep(1);
  };

  const analysisSteps = [
    { step: 1, label: 'Upload Report', icon: 'Upload', completed: analysisStep > 1 },
    { step: 2, label: 'Extract Text', icon: 'FileText', completed: analysisStep > 2 },
    { step: 3, label: 'AI Analysis', icon: 'Brain', completed: analysisStep > 3 },
    { step: 4, label: 'Results', icon: 'CheckCircle', completed: analysisStep >= 4 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="FileText" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-text-primary">
                    Medical Report Analysis
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Upload your medical reports for AI-powered analysis and interpretation
                  </p>
                </div>
              </div>
              
              {uploadedFile && (
                <Button
                  variant="outline"
                  onClick={resetAnalysis}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Start New Analysis
                </Button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                Analysis Progress
              </h3>
              <div className="flex items-center justify-between">
                {analysisSteps?.map((step, index) => (
                  <React.Fragment key={step?.step}>
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step?.completed 
                          ? 'bg-success text-white' 
                          : analysisStep === step?.step 
                            ? 'bg-primary text-white' :'bg-muted text-text-secondary'
                      }`}>
                        <Icon 
                          name={step?.completed ? 'Check' : step?.icon} 
                          size={16} 
                          color="currentColor" 
                        />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-medium ${
                          step?.completed || analysisStep === step?.step 
                            ? 'text-text-primary' :'text-text-secondary'
                        }`}>
                          {step?.label}
                        </p>
                      </div>
                    </div>
                    {index < analysisSteps?.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                        step?.completed ? 'bg-success' : 'bg-border'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload and OCR */}
            <div className="space-y-8">
              {/* File Upload Zone */}
              <FileUploadZone 
                onFileUpload={handleFileUpload}
                isProcessing={isProcessing}
              />

              {/* OCR Extraction Panel */}
              {uploadedFile && (
                <OCRExtractionPanel
                  uploadedFile={uploadedFile}
                  onTextExtracted={handleTextExtracted}
                  isProcessing={isProcessing}
                />
              )}
            </div>

            {/* Right Column - Analysis and Results */}
            <div className="space-y-8">
              {/* AI Interpretation */}
              {extractedText && (
                <AIInterpretationSection
                  extractedText={extractedText}
                  onInterpretationComplete={handleInterpretationComplete}
                />
              )}

              {/* Action Buttons */}
              {interpretation && (
                <ActionButtons
                  interpretation={interpretation}
                  extractedText={extractedText}
                  onSaveToHistory={handleSaveToHistory}
                />
              )}
            </div>
          </div>

          {/* Full Width Structured Data Table */}
          {interpretation && (
            <div className="mt-8">
              <StructuredDataTable interpretation={interpretation} />
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 bg-card rounded-xl p-6 card-elevation-1 border medical-border">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
                  How to Use Medical Report Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">Upload Your Report</h4>
                        <p className="text-sm text-text-secondary">
                          Drag and drop or browse to upload PDF or image files of your medical reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">Review Extracted Text</h4>
                        <p className="text-sm text-text-secondary">
                          Our OCR technology extracts text from your reports. You can edit if needed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">Get AI Analysis</h4>
                        <p className="text-sm text-text-secondary">
                          Our AI provides easy-to-understand explanations of your medical results
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">Save & Share</h4>
                        <p className="text-sm text-text-secondary">
                          Save to your health history, download summaries, or share with doctors
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <EmergencyFloatingButton />
    </div>
  );
};

export default MedicalReportAnalysis;