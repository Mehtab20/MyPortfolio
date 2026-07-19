import { useState, useRef, useEffect, useCallback } from 'react';
import { getAvailableProviders, sendMessage, addMessage, createConversation } from '../../api/ai';

const providers = getAvailableProviders();

const suggestions = [
  'Explain cloud computing concepts',
  'Help me debug my React code',
  'What are best practices for DevOps?',
  'Write a Python script for data analysis',
];

export default function AiChat() {
  const [messages, setMessages] = useState(() => createConversation([{
    role: 'assistant',
    content: "Hello! I'm your AI assistant. I can help you with coding, cloud architecture, DevOps practices, and more. I support multiple AI providers — add an API key in your settings to get started.",
  }]));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    const updatedMessages = addMessage(messages, 'user', userMessage);
    setMessages(updatedMessages);
    setLoading(true);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      let assistantContent = '';

      await sendMessage(updatedMessages, {
        provider: selectedProvider,
        onStream: (chunk) => {
          assistantContent += chunk;
          // Update the last message in real-time during streaming
          setMessages((prev) => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];
            if (lastMsg?.role === 'assistant') {
              newMsgs[newMsgs.length - 1] = { ...lastMsg, content: assistantContent };
            } else {
              newMsgs.push({ role: 'assistant', content: assistantContent });
            }
            return newMsgs;
          });
        },
        signal: abortController.signal,
      });

      // Finalize with the complete message
      setMessages((prev) => addMessage(prev, 'assistant', assistantContent));
    } catch (err) {
      if (err.name !== 'AbortError') {
        const errorMsg = `⚠️ ${err.message || 'Failed to get AI response. Please check your API key and try again.'}`;
        setMessages((prev) => addMessage(prev, 'assistant', errorMsg));
      }
    } finally {
      setLoading(false);
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, loading, messages, selectedProvider]);

  const handleSuggestion = useCallback((suggestion) => {
    setInput(suggestion);
  }, []);

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

      {/* Provider Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: 'var(--theme-text-muted)' }}>
            Provider:
          </span>
          <div className="flex gap-1">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProvider(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedProvider === p.id ? 'btn-primary' : ''
                }`}
                style={
                  selectedProvider !== p.id
                    ? { color: 'var(--theme-text-muted)', border: '1px solid var(--theme-border)', background: 'transparent' }
                    : {}
                }
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        {isStreaming && (
          <button
            onClick={() => abortRef.current?.abort()}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-red-500/10 hover:text-red-500"
            style={{ color: 'var(--theme-text-muted)', border: '1px solid var(--theme-border)' }}
          >
            Stop generating
          </button>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-4 animate-fade-in">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--theme-text-muted)' }}>
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 hover:bg-white/5"
                style={{
                  backgroundColor: 'rgba(212, 165, 34, 0.06)',
                  color: 'var(--color-primary-light)',
                  border: '1px solid rgba(212, 165, 34, 0.15)',
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
