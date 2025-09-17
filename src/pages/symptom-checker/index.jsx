import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EmergencyFloatingButton from '../../components/ui/EmergencyFloatingButton';
import SymptomInput from './components/SymptomInput';
import ConversationHistory from './components/ConversationHistory';
import ConditionSuggestions from './components/ConditionSuggestions';
import LanguageSelector from './components/LanguageSelector';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import { analyzeSymptoms, generateConditionSuggestions, healthChatWithHistory } from '../../services/geminiService';
import { handleGeminiError } from '../../utils/geminiClient';
import useCancellableRequest from '../../hooks/useCancellableRequest';

const SymptomChecker = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conditionSuggestions, setConditionSuggestions] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock data for condition suggestions
  const mockConditions = {
    en: [
      {
        id: 1,
        name: "Tension Headache",
        probability: 85,
        severity: "low",
        description: "Most common type of headache, often caused by stress, poor posture, or eye strain.",
        detailedDescription: "Tension headaches are characterized by a dull, aching sensation all over the head. They often feel like a tight band around the forehead or back of the head and neck. These headaches are typically caused by muscle contractions in the head and neck regions due to stress, anxiety, poor posture, or eye strain.",
        recommendedAction: "monitor",
        specialistType: "General Physician",
        commonSymptoms: ["Dull aching head pain", "Sensation of tightness", "Tenderness on scalp", "Neck and shoulder muscle aches"],
        recommendations: [
          "Apply cold or warm compress to head or neck",
          "Practice relaxation techniques like deep breathing",
          "Maintain regular sleep schedule",
          "Stay hydrated and avoid skipping meals",
          "Consider over-the-counter pain relievers if needed"
        ]
      },
      {
        id: 2,
        name: "Viral Fever",
        probability: 72,
        severity: "medium",
        description: "Common viral infection causing fever, body aches, and general malaise.",
        detailedDescription: "Viral fever is a common condition caused by various viral infections. It typically presents with elevated body temperature, body aches, fatigue, and sometimes respiratory symptoms. Most viral fevers are self-limiting and resolve within 3-7 days with proper rest and supportive care.",
        recommendedAction: "consult",
        specialistType: "General Physician",
        commonSymptoms: ["Fever above 100°F", "Body aches", "Fatigue", "Headache", "Sometimes runny nose"],
        recommendations: [
          "Get adequate rest and sleep",
          "Drink plenty of fluids to stay hydrated",
          "Take paracetamol for fever and body aches",
          "Eat light, nutritious meals",
          "Consult doctor if fever persists beyond 3 days"
        ]
      },
      {
        id: 3,
        name: "Migraine",
        probability: 45,
        severity: "medium",
        description: "Severe headache disorder often accompanied by nausea and sensitivity to light.",
        detailedDescription: "Migraine is a neurological condition characterized by intense, throbbing headaches that can last from hours to days. They often occur on one side of the head and may be accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraines can significantly impact daily activities.",
        recommendedAction: "consult",
        specialistType: "Neurologist",
        commonSymptoms: ["Severe throbbing headache", "Nausea or vomiting", "Light sensitivity", "Sound sensitivity", "Visual disturbances"],
        recommendations: [
          "Rest in a quiet, dark room",
          "Apply cold compress to forehead",
          "Stay hydrated",
          "Avoid known triggers",
          "Consider prescription migraine medications"
        ]
      }
    ],
    hi: [
      {
        id: 1,
        name: "तनाव सिरदर्द",
        probability: 85,
        severity: "low",
        description: "सबसे आम प्रकार का सिरदर्द, अक्सर तनाव, गलत मुद्रा, या आंखों के तनाव के कारण होता है।",
        detailedDescription: "तनाव सिरदर्द पूरे सिर में एक सुस्त, दर्द की संवेदना की विशेषता है। वे अक्सर माथे या सिर और गर्दन के पीछे एक तंग बैंड की तरह महसूस होते हैं। ये सिरदर्द आमतौर पर तनाव, चिंता, गलत मुद्रा, या आंखों के तनाव के कारण सिर और गर्दन के क्षेत्रों में मांसपेशियों के संकुचन के कारण होते हैं।",
        recommendedAction: "monitor",
        specialistType: "सामान्य चिकित्सक",
        commonSymptoms: ["सुस्त सिर दर्द", "कसाव की संवेदना", "खोपड़ी में कोमलता", "गर्दन और कंधे की मांसपेशियों में दर्द"],
        recommendations: [
          "सिर या गर्दन पर ठंडा या गर्म सेक लगाएं",
          "गहरी सांस लेने जैसी विश्राम तकनीकों का अभ्यास करें",
          "नियमित नींद का समय बनाए रखें",
          "हाइड्रेटेड रहें और भोजन न छोड़ें",
          "यदि आवश्यक हो तो ओवर-द-काउंटर दर्द निवारक दवाओं पर विचार करें"
        ]
      },
      {
        id: 2,
        name: "वायरल बुखार",
        probability: 72,
        severity: "medium",
        description: "आम वायरल संक्रमण जो बुखार, शरीर में दर्द, और सामान्य अस्वस्थता का कारण बनता है।",
        detailedDescription: "वायरल बुखार विभिन्न वायरल संक्रमणों के कारण होने वाली एक आम स्थिति है। यह आमतौर पर शरीर के तापमान में वृद्धि, शरीर में दर्द, थकान, और कभी-कभी श्वसन संबंधी लक्षणों के साथ प्रस्तुत होता है। अधिकांश वायरल बुखार स्व-सीमित होते हैं और उचित आराम और सहायक देखभाल के साथ 3-7 दिनों में ठीक हो जाते हैं।",
        recommendedAction: "consult",
        specialistType: "सामान्य चिकित्सक",
        commonSymptoms: ["100°F से ऊपर बुखार", "शरीर में दर्द", "थकान", "सिरदर्द", "कभी-कभी नाक बहना"],
        recommendations: [
          "पर्याप्त आराम और नींद लें",
          "हाइड्रेटेड रहने के लिए भरपूर तरल पदार्थ पिएं",
          "बुखार और शरीर के दर्द के लिए पैरासिटामोल लें",
          "हल्का, पौष्टिक भोजन करें",
          "यदि बुखार 3 दिनों से अधिक बना रहे तो डॉक्टर से सलाह लें"
        ]
      }
    ],
    ta: [
      {
        id: 1,
        name: "மன அழுத்த தலைவலி",
        probability: 85,
        severity: "low",
        description: "மிகவும் பொதுவான தலைவலி வகை, பெரும்பாலும் மன அழுத்தம், தவறான நிலை, அல்லது கண் சோர்வு காரணமாக ஏற்படுகிறது।",
        detailedDescription: "மன அழுத்த தலைவலிகள் தலை முழுவதும் மந்தமான, வலி உணர்வால் வகைப்படுத்தப்படுகின்றன. அவை பெரும்பாலும் நெற்றி அல்லது தலை மற்று�் கழுத்தின் பின்புறத்தில் இறுக்கமான பட்டையைப் போல உணரப்படுகின்றன. இந்த தலைவலிகள் பொதுவாக மன அழுத்தம், பதட்டம், தவறான நிலை, அல்லது கண் சோர்வு காரணமாக தலை மற்றும் கழுத்து பகுதிகளில் தசை சுருக்கங்களால் ஏற்படுகின்றன।",
        recommendedAction: "monitor",
        specialistType: "பொது மருத்துவர்",
        commonSymptoms: ["மந்தமான தலை வலி", "இறுக்கம் உணர்வு", "உச்சந்தலையில் மென்மை", "கழுத்து மற்றும் தோள்பட்டை தசை வலிகள்"],
        recommendations: [
          "தலை அல்லது கழுத்தில் குளிர் அல்லது வெப்பமான ஒத்தடம் கொடுங்கள்",
          "ஆழ்ந்த மூச்சு போன்ற தளர்வு நுட்பங்களை பயிற்சி செய்யுங்கள்",
          "வழக்கமான தூக்க அட்டவணையை பராமரிக்கவும்",
          "நீரேற்றத்துடன் இருங்கள் மற்றும் உணவைத் தவிர்க்காதீர்கள்",
          "தேவைப்பட்டால் மருந்தகத்தில் கிடைக்கும் வலி நிவாரணிகளை கருத்தில் கொள்ளுங்கள்"
        ]
      }
    ]
  };

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arogyaplus_language');
    if (savedLanguage && ['en', 'hi', 'ta']?.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('arogyaplus_language', language);
  };

  const {
    startRequest,
    cancelRequest,
    isProcessing: isGeminiProcessing,
    processingStage,
    processingProgress
  } = useCancellableRequest();

  const handleSubmitSymptoms = async (symptoms) => {
    if (!symptoms?.trim()) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setConditionSuggestions([]);

    // Add user message to conversation
    const userMessage = {
      type: 'user',
      content: symptoms,
      timestamp: new Date()
    };
    setConversations(prev => [...prev, userMessage]);

    try {
      // Use Gemini to analyze symptoms
      const response = await startRequest(async (signal) => {
        // First get the AI analysis
        const analysis = await analyzeSymptoms(symptoms, currentLanguage);
        
        // Then get structured condition suggestions
        const conditions = await generateConditionSuggestions(symptoms, currentLanguage);
        
        return { analysis, conditions };
      });

      // Add AI response to conversation
      const aiMessage = {
        type: 'ai',
        content: response?.analysis,
        timestamp: new Date(),
        confidence: 87
      };

      setConversations(prev => [...prev, aiMessage]);
      setConditionSuggestions(response?.conditions || []);
      setAnalysisComplete(true);

    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      
      const errorMessage = {
        type: 'error',
        content: handleGeminiError(error),
        timestamp: new Date()
      };
      
      setConversations(prev => [...prev, errorMessage]);
      
      // Fallback to mock data if Gemini fails
      const mockConditions = {
        en: [
          {
            id: 1,
            name: "General Health Consultation Needed",
            probability: 75,
            severity: "medium",
            description: "Based on your symptoms, it's recommended to consult with a healthcare professional for proper evaluation.",
            recommendedAction: "consult",
            specialistType: "General Physician"
          }
        ]
      };
      
      setConditionSuggestions(mockConditions?.[currentLanguage] || mockConditions?.en);
      setAnalysisComplete(true);
    }

    setIsAnalyzing(false);
  };

  const handleGetMoreInfo = async (condition) => {
    try {
      const moreInfoPrompt = `Provide more detailed information about ${condition?.name} condition including causes, symptoms, and care recommendations.`;
      
      const response = await healthChatWithHistory(moreInfoPrompt, conversations, currentLanguage);
      
      const moreInfoMessage = {
        type: 'clarification',
        content: response?.response,
        timestamp: new Date()
      };

      setConversations(prev => [...prev, moreInfoMessage]);
    } catch (error) {
      console.error('Error getting more info:', error);
      
      const fallbackMessage = {
        type: 'clarification',
        content: `Here's additional information about ${condition?.name}: This condition typically requires monitoring and may benefit from lifestyle modifications. Please consult with a healthcare provider for personalized advice.`,
        timestamp: new Date()
      };
      
      setConversations(prev => [...prev, fallbackMessage]);
    }
  };

  const handleBookAppointment = (condition) => {
    const appointmentMessages = {
      en: `I recommend booking an appointment with a ${condition?.specialistType} for your ${condition?.name}. Based on the severity level (${condition?.severity}), you should schedule this within the next few days. Would you like me to help you find available doctors in your area?`,
      hi: `मैं आपके ${condition?.name} के लिए ${condition?.specialistType} के साथ अपॉइंटमेंट बुक करने की सलाह देता हूं। गंभीरता के स्तर (${condition?.severity}) के आधार पर, आपको अगले कुछ दिनों में इसे शेड्यूल करना चाहिए। क्या आप चाहते हैं कि मैं आपके क्षेत्र में उपलब्ध डॉक्टरों को खोजने में आपकी सहायता करूं?`,
      ta: `உங்கள் ${condition?.name} க்காக ${condition?.specialistType} உடன் சந்திப்பை பதிவு செய்ய பரிந்துரைக்கிறேன். தீவிரத்தன்மை நிலை (${condition?.severity}) அடிப்படையில், அடுத்த சில நாட்களில் இதை திட்டமிட வேண்டும். உங்கள் பகுதியில் கிடைக்கும் மருத்துவர்களைக் கண்டறிய உதவ வேண்டுமா?`
    };

    const appointmentMessage = {
      type: 'ai',
      content: appointmentMessages?.[currentLanguage] || appointmentMessages?.en,
      timestamp: new Date()
    };

    setConversations(prev => [...prev, appointmentMessage]);
  };

  const handleSaveSession = () => {
    const sessionData = {
      timestamp: new Date(),
      conversations,
      conditions: conditionSuggestions,
      language: currentLanguage
    };

    // Save to localStorage (in real app, this would be saved to backend)
    const existingSessions = JSON.parse(localStorage.getItem('arogyaplus_symptom_sessions') || '[]');
    existingSessions?.push(sessionData);
    localStorage.setItem('arogyaplus_symptom_sessions', JSON.stringify(existingSessions));

    const successMessages = {
      en: 'Session saved successfully to your health history!',
      hi: 'सत्र आपके स्वास्थ्य इतिहास में सफलतापूर्वक सहेजा गया!',
      ta: 'அமர்வு உங்கள் சுகாதார வரலாற்றில் வெற்றிகரமாக சேமிக்கப்பட்டது!'
    };

    alert(successMessages?.[currentLanguage] || successMessages?.en);
  };

  const handleShareResults = () => {
    const shareText = `ArogyaPlus Symptom Analysis Results:\n\nTop Condition: ${conditionSuggestions?.[0]?.name}\nProbability: ${conditionSuggestions?.[0]?.probability}%\nRecommendation: ${conditionSuggestions?.[0]?.recommendedAction}\n\nGenerated on: ${new Date()?.toLocaleDateString('en-IN')}`;

    if (navigator.share) {
      navigator.share({
        title: 'ArogyaPlus Symptom Analysis',
        text: shareText
      });
    } else {
      navigator.clipboard?.writeText(shareText);
      const copyMessages = {
        en: 'Results copied to clipboard!',
        hi: 'परिणाम क्लिपबोर्ड में कॉपी किए गए!',
        ta: 'முடிவுகள் கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டன!'
      };
      alert(copyMessages?.[currentLanguage] || copyMessages?.en);
    }
  };

  const handleClearHistory = () => {
    const confirmMessages = {
      en: 'Are you sure you want to clear the conversation history?',
      hi: 'क्या आप वाकई बातचीत का इतिहास साफ़ करना चाहते हैं?',
      ta: 'உரையாடல் வரலாற்றை அழிக்க விரும்புகிறீர்களா?'
    };

    if (confirm(confirmMessages?.[currentLanguage] || confirmMessages?.en)) {
      setConversations([]);
      setConditionSuggestions([]);
      setAnalysisComplete(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Breadcrumbs />
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Stethoscope" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    {currentLanguage === 'hi' ? 'लक्षण जांचकर्ता' : 
                     currentLanguage === 'ta'? 'அறிகுறி சரிபார்ப்பாளர்' : 'Symptom Checker'}
                  </h1>
                  <p className="text-text-secondary">
                    {currentLanguage === 'hi' ? 'Gemini AI-संचालित स्वास्थ्य मूल्यांकन और सुझाव' : 
                     currentLanguage === 'ta'? 'Gemini AI-இயங்கும் சுகாதார மதிப்பீடு மற்றும் பரிந்துரைகள்' : 'Gemini AI-powered health assessment and recommendations'}
                  </p>
                </div>
              </div>
            </div>
            
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input and Actions */}
            <div className="lg:col-span-1 space-y-6">
              <SymptomInput
                onSubmitSymptoms={handleSubmitSymptoms}
                isLoading={isAnalyzing}
                currentLanguage={currentLanguage}
              />
              
              <QuickActions
                onSaveSession={handleSaveSession}
                onShareResults={handleShareResults}
                onClearHistory={handleClearHistory}
                currentLanguage={currentLanguage}
                hasResults={analysisComplete}
              />

              {/* Cancel button when processing */}
              {isGeminiProcessing && (
                <div className="bg-card rounded-xl p-4 card-elevation-1 border medical-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-text-primary">
                      {processingStage}
                    </span>
                    <button
                      onClick={cancelRequest}
                      className="text-sm text-error hover:text-error-dark"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Conversation and Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analysis Status */}
              {(isAnalyzing || isGeminiProcessing) && (
                <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        {currentLanguage === 'hi' ? 'Gemini AI लक्षणों का विश्लेषण कर रहा है...' : 
                         currentLanguage === 'ta'? 'Gemini AI அறிகுறிகளை பகுப்பாய்வு செய்கிறது...' : 'Gemini AI is analyzing your symptoms...'}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {currentLanguage === 'hi' ? 'कृपया प्रतीक्षा करें, विश्लेषण पूर्ण होने में कुछ समय लग सकता है' : 
                         currentLanguage === 'ta'? 'தயவுசெய்து காத்திருங்கள், பகுப்பாய்வு முடிக்க சிறிது நேரம் ஆகலாம்' : 'Please wait, analysis may take a few moments to complete'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Conversation History */}
              <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
                <ConversationHistory
                  conversations={conversations}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Condition Suggestions */}
              {analysisComplete && conditionSuggestions?.length > 0 && (
                <div className="bg-card rounded-xl p-6 card-elevation-2 border medical-border">
                  <ConditionSuggestions
                    suggestions={conditionSuggestions}
                    onGetMoreInfo={handleGetMoreInfo}
                    onBookAppointment={handleBookAppointment}
                    currentLanguage={currentLanguage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <EmergencyFloatingButton />
    </div>
  );
};

export default SymptomChecker;