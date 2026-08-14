import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ChatPanel.module.css';

const quickPrompts = [
  { icon: '💻', label: 'Tech Stack', text: 'What is your core tech stack?' },
  { icon: '🚀', label: 'Key Project', text: 'Tell me about the Databricks Text-to-SQL project.' },
  { icon: '🤖', label: 'GenAI Work', text: 'How did you use GenAI for MES/WMS integration?' },
  { icon: '⚡', label: 'Current Role', text: 'What is your role in the Battery-Data Digital Platform?' }
];

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSend = async (textOverride) => {
    const text = textOverride || inputText;
    if (!text.trim() || isStreaming) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputText('');
    setIsStreaming(true);
    setStreamingContent('');

    try {
      const res = await fetch('http://127.0.0.1:8000/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') continue;
          try {
            const { token } = JSON.parse(payload);
            if (token) {
              full += token;
              setStreamingContent(full);
            }
          } catch {}
        }
      }

      setMessages(prev => [...prev, { role: 'ai', content: full }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Connection error. Please ensure the backend is running on port 8000.' }]);
    } finally {
      setStreamingContent('');
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div 
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`} 
        onClick={onClose}
      />
      
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.avatarOrb}></div>
            <div className={styles.headerText}>
              <h3 className={styles.name}>Mohammad Saquib</h3>
              <p className={styles.status}>
                <span className={styles.statusDot}></span>
                AI Representative Online
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.chatArea}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <h2 className={styles.welcomeText}>Hello! I'm Mohammad's AI assistant.</h2>
              <p className={styles.welcomeSubtext}>Ask me anything about his experience, projects, or skills.</p>
              
              <div className={styles.quickPromptsGrid}>
                {quickPrompts.map((prompt, idx) => (
                  <button 
                    key={idx} 
                    className={styles.quickPromptBtn}
                    onClick={() => handleSend(prompt.text)}
                  >
                    <span className={styles.promptIcon}>{prompt.icon}</span>
                    <span className={styles.promptLabel}>{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.messagesList}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.messageWrapperUser : styles.messageWrapperAi}`}>
                  {msg.role === 'ai' && <div className={styles.messageOrb}></div>}
                  <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                    {msg.role === 'ai' ? (
                      <div className={styles.markdownContent}>
                         <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              
              {isStreaming && (
                <div className={`${styles.messageWrapper} ${styles.messageWrapperAi}`}>
                  <div className={styles.messageOrb}></div>
                  <div className={`${styles.messageBubble} ${styles.aiBubble}`}>
                    {streamingContent ? (
                      <div className={styles.markdownContent}>
                        <ReactMarkdown>{streamingContent}</ReactMarkdown>
                        <span className={styles.cursor}></span>
                      </div>
                    ) : (
                      <div className={styles.thinkingDots}>
                        <span>.</span><span>.</span><span>.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.textarea}
              placeholder="Ask me anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button 
              className={`${styles.sendBtn} ${inputText.trim() ? styles.sendBtnActive : ''}`}
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isStreaming}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <p className={styles.hintText}>Powered by Llama 3.3 70B · Press Enter to send</p>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
