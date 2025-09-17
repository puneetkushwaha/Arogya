import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const acceptedFormats = ['.pdf', '.jpg', '.jpeg', '.png', '.tiff'];
  const maxFileSize = 10; // MB

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    processFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files?.filter(file => {
      const isValidFormat = acceptedFormats?.some(format => 
        file?.name?.toLowerCase()?.endsWith(format?.substring(1))
      );
      const isValidSize = file?.size <= maxFileSize * 1024 * 1024;
      return isValidFormat && isValidSize;
    });

    if (validFiles?.length > 0) {
      simulateUpload(validFiles?.[0]);
    }
  };

  const simulateUpload = (file) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const openCameraDialog = () => {
    cameraInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Upload" size={32} color="var(--color-primary)" />
        </div>
        <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
          Upload Medical Report
        </h3>
        <p className="text-text-secondary">
          Upload your medical reports for AI-powered analysis and interpretation
        </p>
      </div>
      {/* Drag and Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadProgress > 0 && uploadProgress < 100 ? (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
              <Icon name="FileText" size={24} color="white" />
            </div>
            <div>
              <p className="text-text-primary font-medium mb-2">Uploading...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-secondary mt-2">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Icon name="CloudUpload" size={48} color="var(--color-text-secondary)" />
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">
                Drag and drop your files here
              </p>
              <p className="text-text-secondary mb-4">
                or click to browse from your device
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Upload Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button
          variant="outline"
          onClick={openFileDialog}
          disabled={isProcessing}
          iconName="FolderOpen"
          iconPosition="left"
          className="w-full"
        >
          Browse Files
        </Button>

        <Button
          variant="outline"
          onClick={openCameraDialog}
          disabled={isProcessing}
          iconName="Camera"
          iconPosition="left"
          className="w-full md:block hidden"
        >
          Take Photo
        </Button>

        <Button
          variant="ghost"
          disabled={isProcessing}
          iconName="Smartphone"
          iconPosition="left"
          className="w-full"
        >
          Mobile Scan
        </Button>
      </div>
      {/* File Format Info */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-2">Supported Formats</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
              <div>• PDF documents</div>
              <div>• JPEG images</div>
              <div>• PNG images</div>
              <div>• TIFF files</div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Maximum file size: {maxFileSize}MB
            </p>
          </div>
        </div>
      </div>
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats?.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default FileUploadZone;