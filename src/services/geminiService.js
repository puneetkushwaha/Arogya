import genAI, { getSafetySettings, handleGeminiError } from '../utils/geminiClient.js';

/**
 * Helper function: Retry logic for Gemini API calls
 * @param {Function} fn - The async function to retry
 * @param {number} retries - Number of retries
 * @param {number} delayMs - Delay between retries in ms
 */
async function retryGeminiCall(fn, retries = 3, delayMs = 2000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= retries) throw error;
      console.warn(`Gemini call failed, retrying (${attempt}/${retries})...`, error.message);
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}

/**
 * Generates text response based on user input for symptom analysis.
 */
export async function analyzeSymptoms(prompt, language = 'en') {
  return retryGeminiCall(async () => {
    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      safetySettings: getSafetySettings()
    });

    const healthcarePrompt = `You are a healthcare AI assistant analyzing symptoms. Please provide a professional medical analysis in ${language === 'hi' ? 'Hindi' : language === 'ta' ? 'Tamil' : 'English'} language.

User symptoms: ${prompt}

Please provide:
1. A brief analysis of the described symptoms
2. Possible conditions to consider (with confidence levels)
3. Recommended actions (immediate care, doctor consultation, etc.)
4. Important disclaimers about seeking professional medical advice

Format your response as a clear, professional medical consultation. Remember this is for informational purposes only and does not replace professional medical advice.`;

    const result = await model?.generateContent({
      contents: [{ parts: [{ text: healthcarePrompt }] }],
      generationConfig: { temperature: 0.3, topP: 0.8, topK: 40, maxOutputTokens: 1500 },
      safetySettings: getSafetySettings()
    });

    return (await result?.response)?.text();
  });
}

/**
 * Generates comprehensive medical condition suggestions based on symptoms.
 */
export async function generateConditionSuggestions(symptoms, language = 'en') {
  return retryGeminiCall(async () => {
    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-pro',
      safetySettings: getSafetySettings()
    });

    const conditionPrompt = `As a medical AI assistant, analyze these symptoms and provide structured condition suggestions in ${language === 'hi' ? 'Hindi' : language === 'ta' ? 'Tamil' : 'English'} language.

Symptoms: ${symptoms}

Please provide your response in this JSON format:
{
  "conditions": [
    {
      "name": "Condition name",
      "probability": 85,
      "severity": "low/medium/high",
      "description": "Brief description",
      "detailedDescription": "Detailed explanation",
      "recommendedAction": "monitor/consult/urgent",
      "specialistType": "Type of specialist",
      "commonSymptoms": ["symptom1", "symptom2"],
      "recommendations": ["recommendation1", "recommendation2"]
    }
  ]
}

Provide 3-4 most likely conditions ranked by probability. Include severity levels and clear recommendations.`;

    const result = await model?.generateContent({
      contents: [{ parts: [{ text: conditionPrompt }] }],
      generationConfig: { temperature: 0.2, topP: 0.8, topK: 40, maxOutputTokens: 2000 },
      safetySettings: getSafetySettings()
    });

    const responseText = (await result?.response)?.text();

    try {
      const jsonMatch = responseText?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return jsonResponse?.conditions || [];
      }
    } catch {
      console.warn('JSON parse failed, returning fallback response');
    }

    return [{
      id: 1,
      name: language === 'hi' ? 'सामान्य स्वास्थ्य चिंता' : language === 'ta' ? 'பொது சுகாதார கவலை' : 'General Health Concern',
      probability: 70,
      severity: 'medium',
      description: responseText,
      recommendedAction: 'consult',
      specialistType: language === 'hi' ? 'सामान्य चिकित्सक' : language === 'ta' ? 'பொது மருத்துவர்' : 'General Physician'
    }];
  });
}

/**
 * Analyzes medical report text and provides interpretation.
 */
export async function analyzeMedicalReport(extractedText, language = 'english') {
  return retryGeminiCall(async () => {
    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-pro',
      safetySettings: getSafetySettings()
    });

    const reportPrompt = `As a medical AI assistant, analyze this medical report and provide a comprehensive interpretation in ${language} language.

Medical Report Text: ${extractedText}

Please provide your response in this JSON format:
{
  "summary": { "title": "Overall Health Assessment", "content": "Brief summary of findings", "severity": "normal/mild/moderate/severe", "icon": "Heart" },
  "findings": [
    { "category": "Test Category", "icon": "Icon name", "severity": "normal/mild/moderate/severe", "title": "Finding title", "explanation": "Detailed explanation", "recommendation": "What to do next", "expandable": true }
  ],
  "nextSteps": ["Step 1", "Step 2"],
  "riskFactors": [{ "factor": "Risk name", "risk": "Low/Moderate/High", "color": "success/warning/error" }]
}`;

    const result = await model?.generateContent({
      contents: [{ parts: [{ text: reportPrompt }] }],
      generationConfig: { temperature: 0.2, topP: 0.8, topK: 40, maxOutputTokens: 2500 },
      safetySettings: getSafetySettings()
    });

    const responseText = (await result?.response)?.text();

    try {
      const jsonMatch = responseText?.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    } catch {
      console.warn('JSON parse failed, returning fallback response');
    }

    return {
      summary: { title: "Medical Report Analysis", content: responseText, severity: "moderate", icon: "FileText" },
      findings: [{ category: "Analysis", icon: "Search", severity: "normal", title: "AI Analysis", explanation: responseText, recommendation: "Consult with your healthcare provider", expandable: true }],
      nextSteps: ["Review with your doctor", "Follow recommended treatments"],
      riskFactors: []
    };
  });
}

/**
 * Generates text analysis based on a text prompt and an image.
 */
export async function analyzeImageWithText(prompt, imageFile) {
  return retryGeminiCall(async () => {
    const model = genAI?.getGenerativeModel({ model: 'gemini-2.5-pro', safetySettings: getSafetySettings() });

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
    });

    const imageBase64 = await toBase64(imageFile);
    const imagePart = { inlineData: { data: imageBase64, mimeType: imageFile?.type } };

    const medicalPrompt = `As a medical AI assistant, analyze this medical image/document.

User question: ${prompt}

Please provide:
1. A description of what you can see in the image
2. Any notable medical findings or observations
3. Educational information about the condition/procedure shown
4. Recommendations for next steps or further consultation

Important: This is for educational purposes only and does not replace professional medical diagnosis.`;

    const result = await model?.generateContent([medicalPrompt, imagePart]);
    return (await result?.response)?.text();
  });
}

/**
 * Manages a chat session with history for health consultations.
 */
export async function healthChatWithHistory(prompt, history = [], language = 'en') {
  return retryGeminiCall(async () => {
    const model = genAI?.getGenerativeModel({ model: 'gemini-2.5-flash', safetySettings: getSafetySettings() });

    const systemMessage = {
      role: 'user',
      parts: [{ text: `You are ArogyaPlus AI, a healthcare assistant. Provide helpful, accurate health information in ${language === 'hi' ? 'Hindi' : language === 'ta' ? 'Tamil' : 'English'} language. Always remind users to consult healthcare professionals for medical decisions.` }]
    };

    const chat = model?.startChat({ 
      history: [systemMessage, ...history],
      generationConfig: { temperature: 0.4, topP: 0.8, topK: 40, maxOutputTokens: 1000 }
    });

    const result = await chat?.sendMessage(prompt);
    const text = (await result?.response)?.text();

    const updatedHistory = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] },
      { role: 'model', parts: [{ text }] },
    ];

    return { response: text, updatedHistory };
  });
}
