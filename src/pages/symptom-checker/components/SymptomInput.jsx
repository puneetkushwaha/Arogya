import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SymptomInput = ({ onSubmitSymptoms, isLoading, currentLanguage }) => {
  const [symptomText, setSymptomText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const textareaRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const placeholderTexts = {
    en: "Describe your symptoms in detail... (e.g., I have been experiencing headaches for 2 days, along with fever and body aches)",
    hi: "अपने लक्षणों का विस्तार से वर्णन करें... (जैसे, मुझे 2 दिनों से सिरदर्द हो रहा है, साथ में बुखार और शरीर में दर्द)",
    ta: "உங்கள் அறிகுறிகளை விரிவாக விவரிக்கவும்... (எ.கா., எனக்கு 2 நாட்களாக தலைவலி உள்ளது, காய்ச்சல் மற்றும் உடல் வலியுடன்)"
  };

  const buttonTexts = {
    en: {
      analyze: 'Analyze Symptoms',
      recording: 'Recording...',
      startVoice: 'Start Voice Input',
      stopVoice: 'Stop Recording'
    },
    hi: {
      analyze: 'लक्षणों का विश्लेषण करें',
      recording: 'रिकॉर्डिंग...',
      startVoice: 'वॉयस इनपुट शुरू करें',
      stopVoice: 'रिकॉर्डिंग बंद करें'
    },
    ta: {
      analyze: 'அறிகுறிகளை பகுப்பாய்வு செய்யுங்கள்',
      recording: 'பதிவு செய்கிறது...',
      startVoice: 'குரல் உள்ளீட்டைத் தொடங்கவும்',
      stopVoice: 'பதிவை நிறுத்தவும்'
    }
  };

  const quickSymptoms = {
    en: [
      "Headache and fever",
      "Stomach pain and nausea",
      "Cough and cold",
      "Chest pain",
      "Back pain",
      "Skin rash"
    ],
    hi: [
      "सिरदर्द और बुखार",
      "पेट दर्द और जी मिचलाना",
      "खांसी और जुकाम",
      "छाती में दर्द",
      "कमर दर्द",
      "त्वचा पर चकत्ते"
    ],
    ta: [
      "தலைவலி மற்றும் காய்ச்சல்",
      "வயிற்று வலி மற்றும் குமட்டல்",
      "இருமல் மற்றும் சளி",
      "மார்பு வலி",
      "முதுகு வலி",
      "தோல் அரிப்பு"
    ]
  };

  // handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(recordingIntervalRef.current);
      setRecordingTime(0);
    }

    return () => clearInterval(recordingIntervalRef.current);
  }, [isRecording]);

  const handleVoiceInput = () => {
    if (isRecording) {
      // stop recording
      setIsRecording(false);
      const voiceResults = {
        en: "I have been experiencing severe headaches for the past 3 days along with fever and body aches. The pain is mostly on the right side of my head.",
        hi: "मुझे पिछले 3 दिनों से तेज सिरदर्द हो रहा है साथ में बुखार और शरीर में दर्द है। दर्द ज्यादातर मेरे सिर के दाईं ओर है।",
        ta: "கடந்த 3 நாட்களாக எனக்கு கடுமையான தலைவலி உள்ளது, காய்ச்சல் மற்றும் உடல் வலியுடன். வலி பெரும்பாலும் என் தலையின் வலது பக்கத்தில் உள்ளது."
      };
      setSymptomText(voiceResults[currentLanguage] || voiceResults.en);
    } else {
      // start recording
      setIsRecording(true);
      setSymptomText('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptomText.trim()) {
      onSubmitSymptoms(symptomText.trim());
    }
  };

  const handleQuickSymptom = (symptom) => {
    setSymptomText(symptom);
    textareaRef.current?.focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-xl p-6 card-elevation-2 border medical-border">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Stethoscope" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-bold text-text-primary">
            {currentLanguage === 'hi'
              ? 'लक्षण विवरण'
              : currentLanguage === 'ta'
              ? 'அறிகுறி விவரம்'
              : 'Symptom Description'}
          </h2>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'hi'
              ? 'अपने लक्षणों का विस्तृत विवरण दें'
              : currentLanguage === 'ta'
              ? 'உங்கள் அறிகுறிகளின் விரிவான விவரணையை வழங்கவும்'
              : 'Provide detailed description of your symptoms'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textarea with mic */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder={placeholderTexts[currentLanguage] || placeholderTexts.en}
            className="w-full h-32 p-4 border medical-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-gentle"
            disabled={isLoading || isRecording}
          />

          {/* mic button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isLoading}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecording
                ? 'bg-error text-white voice-pulse'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            <Icon name={isRecording ? 'Square' : 'Mic'} size={16} />
          </button>

          {/* timer */}
          {isRecording && (
            <div className="absolute top-3 right-3 bg-error text-white px-3 py-1 rounded-full text-xs font-medium">
              {formatTime(recordingTime)}
            </div>
          )}
        </div>

        {/* quick symptom buttons */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-text-primary">
            {currentLanguage === 'hi'
              ? 'त्वरित लक्षण चयन:'
              : currentLanguage === 'ta'
              ? 'விரைவு அறிகுறி தேர்வு:'
              : 'Quick Symptom Selection:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(quickSymptoms[currentLanguage] || quickSymptoms.en).map((symptom, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQuickSymptom(symptom)}
                disabled={isLoading || isRecording}
                className="px-3 py-2 text-sm bg-muted text-text-primary rounded-lg hover:bg-primary hover:text-white transition-gentle disabled:opacity-50"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* submit */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-xs text-text-secondary">
            {currentLanguage === 'hi'
              ? 'AI द्वारा संचालित विश्लेषण'
              : currentLanguage === 'ta'
              ? 'AI மூலம் இயக்கப்படும் பகுப்பாய்வு'
              : 'AI-powered analysis'}
          </div>

          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            disabled={!symptomText.trim() || isRecording}
            iconName="Search"
            iconPosition="left"
          >
            {isRecording
              ? buttonTexts[currentLanguage]?.recording || buttonTexts.en.recording
              : buttonTexts[currentLanguage]?.analyze || buttonTexts.en.analyze}
          </Button>
        </div>
      </form>

      {/* listening note */}
      {isRecording && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Mic" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">
              {currentLanguage === 'hi'
                ? 'सुन रहा है...'
                : currentLanguage === 'ta'
                ? 'கேட்டுக்கொண்டிருக்கிறது...'
                : 'Listening...'}
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            {currentLanguage === 'hi'
              ? 'अपने लक्षणों को स्पष्ट रूप से बोलें। रिकॉर्डिंग बंद करने के लिए माइक बटन दबाएं।'
              : currentLanguage === 'ta'
              ? 'உங்கள் அறிகுறிகளை தெளிவாக பேசுங்கள். பதிவை நிறுத்த மைக் பொத்தானை அழுத்தவும்.'
              : 'Speak your symptoms clearly. Press the mic button to stop recording.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomInput;
