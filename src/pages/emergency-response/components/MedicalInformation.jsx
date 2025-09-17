import React from 'react';
import Icon from '../../../components/AppIcon';

const MedicalInformation = ({ userMedicalData }) => {
  const medicalInfo = {
    personalDetails: {
      name: "Puneet Kushwaha",
      age: 21,
      bloodType: "O+",
      healthId: "HP2025001",
      emergencyContact: "+91 85768 54862"
    },
    conditions: [
      {
        condition: "Hypertension",
        severity: "Moderate",
        diagnosed: "2023-01-15",
        icon: "Heart"
      },
      {
        condition: "Type 2 Diabetes",
        severity: "Controlled",
        diagnosed: "2022-08-20",
        icon: "Droplets"
      }
    ],
    medications: [
      {
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        purpose: "Blood pressure control"
      },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        purpose: "Diabetes management"
      }
    ],
    allergies: [
      {
        allergen: "Penicillin",
        severity: "Severe",
        reaction: "Anaphylaxis"
      },
      {
        allergen: "Shellfish",
        severity: "Moderate",
        reaction: "Hives, swelling"
      }
    ],
    emergencyContacts: [
      {
        name: "Kshitij Kumar Shukla (Bro)",
        relationship: "Brother",
        phone: "+91 73806 63685",
        isPrimary: true
      },
      {
        name: "Dr. Ayush Bajpai",
        relationship: "Family Doctor",
        phone: "+91 90262 95568",
        isPrimary: false
      }
    ]
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'severe':
        return 'text-error bg-error/10 border-error/20';
      case 'moderate':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'controlled':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 card-elevation-2 border medical-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="FileText" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Medical Information
          </h2>
          <p className="text-sm text-text-secondary">
            Critical data for first responders
          </p>
        </div>
      </div>
      {/* Personal Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="User" size={16} />
          <span>Personal Details</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-sm text-text-secondary">Name</span>
            <p className="font-medium text-text-primary">{medicalInfo?.personalDetails?.name}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-sm text-text-secondary">Age</span>
            <p className="font-medium text-text-primary">{medicalInfo?.personalDetails?.age} years</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-sm text-text-secondary">Blood Type</span>
            <p className="font-medium text-error">{medicalInfo?.personalDetails?.bloodType}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-sm text-text-secondary">Health ID</span>
            <p className="font-medium text-text-primary">{medicalInfo?.personalDetails?.healthId}</p>
          </div>
        </div>
      </div>
      {/* Medical Conditions */}
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} />
          <span>Medical Conditions</span>
        </h3>
        <div className="space-y-3">
          {medicalInfo?.conditions?.map((condition, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={condition?.icon} size={16} color="var(--color-primary)" />
                  <span className="font-medium text-text-primary">{condition?.condition}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(condition?.severity)}`}>
                  {condition?.severity}
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Diagnosed: {new Date(condition.diagnosed)?.toLocaleDateString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Current Medications */}
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Pill" size={16} />
          <span>Current Medications</span>
        </h3>
        <div className="space-y-3">
          {medicalInfo?.medications?.map((medication, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text-primary">{medication?.name}</span>
                <span className="text-sm text-primary font-medium">{medication?.dosage}</span>
              </div>
              <p className="text-sm text-text-secondary mb-1">{medication?.frequency}</p>
              <p className="text-xs text-text-secondary">{medication?.purpose}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Allergies */}
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="AlertTriangle" size={16} />
          <span>Allergies</span>
        </h3>
        <div className="space-y-3">
          {medicalInfo?.allergies?.map((allergy, index) => (
            <div key={index} className="p-4 bg-error/5 rounded-lg border border-error/20">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-error">{allergy?.allergen}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(allergy?.severity)}`}>
                  {allergy?.severity}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{allergy?.reaction}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Phone" size={16} />
          <span>Emergency Contacts</span>
        </h3>
        <div className="space-y-3">
          {medicalInfo?.emergencyContacts?.map((contact, index) => (
            <div key={index} className={`p-4 rounded-lg ${contact?.isPrimary ? 'bg-primary/10 border border-primary/20' : 'bg-muted'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text-primary">{contact?.name}</span>
                {contact?.isPrimary && (
                  <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                    Primary
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-1">{contact?.relationship}</p>
              <p className="text-sm font-mono text-primary">{contact?.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalInformation;