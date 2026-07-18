import { useState, useRef, useEffect } from 'react';

const suggestions = [
  'Explain cloud computing concepts',
  'Help me debug my React code',
  'What are best practices for DevOps?',
  'Write a Python script for data analysis',
];

export default function AiChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with coding, cloud architecture, DevOps practices, and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Simulate AI response (placeholder for actual API integration)
    setTimeout(() => {
      const responses = {
        default: "That's a great question! I'm currently configured as a demonstration. In production, I'll be connected to an AI model (like GPT-4, Claude, or an open-source alternative) to provide intelligent responses. The architecture is ready — just add your API key and connect to your preferred AI provider.",
        'cloud computing': 'Cloud computing delivers computing services—including servers, storage, databases, networking, software, and analytics—over the internet ("the cloud"). The main cloud providers are AWS, Google Cloud, and Microsoft Azure. Key benefits include pay-as-you-go pricing, global scale, and managed services that reduce operational overhead.',
      };

      const matchedResponse = Object.entries(responses).find(([key]) =>
        userMessage.toLowerCase().includes(key)
      );

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: matchedResponse ? matchedResponse[1] : responses.default,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          AI Chat
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Ask questions, get help with code, or explore ideas
        </p>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 rounded-2xl card-surface golden-border"
        style={{ maxHeight: 'calc(100vh - 24rem)' }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'btn-primary text-[#0a0a0f]'
                  : 'card-surface'
              }`}
              style={
                msg.role === 'assistant'
                  ? {
                      border: '1px solid var(--theme-border)',
                      backgroundColor: 'var(--theme-surface-light)',
                    }
                  : {}
              }
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="p-4 rounded-2xl card-surface"
              style={{
                border: '1px solid var(--theme-border)',
                backgroundColor: 'var(--theme-surface-light)',
              }}
            >
              <div className="flex gap-1.5">
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: 'var(--color-primary)', animationDelay: '0ms' }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: 'var(--color-primary)', animationDelay: '150ms' }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: 'var(--color-primary)', animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--theme-text-muted)' }}>
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(212, 165, 34, 0.08)',
                  color: 'var(--color-primary-light)',
                  border: '1px solid rgba(212, 165, 34, 0.2)',
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50"
          style={{
            backgroundColor: 'var(--theme-input-bg)',
            borderColor: 'var(--theme-border)',
            color: 'var(--theme-text)',
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-xl btn-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  );
}
