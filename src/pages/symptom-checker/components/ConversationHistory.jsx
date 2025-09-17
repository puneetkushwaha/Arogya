import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversationHistory = ({ conversations, currentLanguage }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'user':
        return 'User';
      case 'ai':
        return 'Bot';
      case 'clarification':
        return 'HelpCircle';
      default:
        return 'MessageCircle';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'user':
        return 'var(--color-primary)';
      case 'ai':
        return 'var(--color-secondary)';
      case 'clarification':
        return 'var(--color-warning)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  if (!conversations || conversations?.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MessageCircle" size={24} color="var(--color-text-secondary)" />
        </div>
        <p className="text-text-secondary">
          {currentLanguage === 'hi' ? 'अभी तक कोई बातचीत नहीं' : 
           currentLanguage === 'ta'? 'இன்னும் உரையாடல் இல்லை' : 'No conversations yet'}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          {currentLanguage === 'hi' ? 'अपने लक्षणों का वर्णन करके शुरू करें' : 
           currentLanguage === 'ta'? 'உங்கள் அறிகுறிகளை விவரிப்பதன் மூலம் தொடங்குங்கள்' : 'Start by describing your symptoms'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
        <h3 className="font-heading font-semibold text-text-primary">
          {currentLanguage === 'hi' ? 'बातचीत का इतिहास' : 
           currentLanguage === 'ta'? 'உரையாடல் வரலாறு' : 'Conversation History'}
        </h3>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {conversations?.map((conversation, index) => (
          <div
            key={index}
            className={`flex ${conversation?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                conversation?.type === 'user' ?'bg-primary text-white'
                  : conversation?.type === 'ai' ?'bg-card border medical-border' :'bg-warning/10 border border-warning/20'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={getMessageTypeIcon(conversation?.type)} 
                  size={16} 
                  color={conversation?.type === 'user' ? 'white' : getMessageTypeColor(conversation?.type)} 
                />
                <span className={`text-xs font-medium ${
                  conversation?.type === 'user' ? 'text-white/80' : 'text-text-secondary'
                }`}>
                  {conversation?.type === 'user' 
                    ? (currentLanguage === 'hi' ? 'आप' : currentLanguage === 'ta' ? 'நீங்கள்' : 'You')
                    : conversation?.type === 'ai'
                    ? (currentLanguage === 'hi' ? 'AI सहायक' : currentLanguage === 'ta' ? 'AI உதவியாளர்' : 'AI Assistant')
                    : (currentLanguage === 'hi' ? 'स्पष्टीकरण' : currentLanguage === 'ta' ? 'தெளிவுபடுத்தல்' : 'Clarification')
                  }
                </span>
                <span className={`text-xs ${
                  conversation?.type === 'user' ? 'text-white/60' : 'text-text-secondary'
                }`}>
                  {formatTime(conversation?.timestamp)}
                </span>
              </div>

              {/* Message Content */}
              <div className={`text-sm leading-relaxed ${
                conversation?.type === 'user' ? 'text-white' : 'text-text-primary'
              }`}>
                {conversation?.content}
              </div>

              {/* Additional Info for AI responses */}
              {conversation?.type === 'ai' && conversation?.confidence && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={14} color="var(--color-secondary)" />
                    <span className="text-xs text-text-secondary">
                      {currentLanguage === 'hi' ? 'विश्वसनीयता:' : 
                       currentLanguage === 'ta'? 'நம்பகத்தன்மை:' : 'Confidence:'} {conversation?.confidence}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationHistory;