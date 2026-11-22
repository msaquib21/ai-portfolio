import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ChatPanel.module.css';

const QUICK_PROMPTS = [
  { icon: '📊', label: 'Zepto Case', text: 'Walk me through the Zepto contribution-margin case.' },
  { icon: '🤖', label: 'AI Copilot', text: 'How did you design the SAP AI copilot safely?' },
  { icon: '🧭', label: 'Discovery', text: 'How do you approach product discovery and prioritization?' },
  { icon: '🚀', label: 'Current Role', text: 'What is your product work at Reliance Industries?' }
];

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [panelWidth, setPanelWidth] = useState(440);
  const messagesEndRef = useRef(null);
  const resizeRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // Resize panel width by dragging the left edge
  const handleResizeStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidth;

    const onMouseMove = (ev) => {
      const newWidth = startWidth - (ev.clientX - startX);
      setPanelWidth(Math.min(Math.max(newWidth, 320), 700));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleSend = async (textOverride) => {
    const text = textOverride || inputText;
    if (!text.trim() || isStreaming) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputText('');
    setIsStreaming(true);
    setStreamingContent('');
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server returned ${res.status}: ${errorText || res.statusText}`);
      }
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
            if (token) { full += token; setStreamingContent(full); }
          } catch {}
        }
      }
      setMessages(prev => [...prev, { role: 'ai', content: full }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: `⚠️ Connection error: ${err.message || 'Unable to reach the backend service.'}` }]);
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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        onClick={e => e.stopPropagation()}
        style={{ width: `${panelWidth}px` }}
      >
        <div className={styles.header} onMouseDown={handleResizeStart}>
          <div className={styles.headerLeft}>
            <div className={styles.cubeContainer}>
              <div className={styles.cube}>
                <div className={styles.cubeFace}></div>
                <div className={styles.cubeFace}></div>
                <div className={styles.cubeFace}></div>
                <div className={styles.cubeFace}></div>
              </div>
            </div>
            <div>
              <h3 className={styles.aiName}>Mohammad Saquib</h3>
              <p className={styles.aiStatus}>
                <span className={styles.statusDot}></span> AI Representative Online
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
          <div className={styles.resizeHandle} onMouseDown={handleResizeStart} />
        </div>

        <div className={styles.messagesArea}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Welcome to my interactive portfolio!</h2>
              <p>Ask my AI anything about my experience, skills, or projects.</p>
              <div className={styles.quickPrompts}>
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button 
                    key={idx} 
                    className={styles.promptCard}
                    onClick={() => handleSend(prompt.text)}
                  >
                    <span className={styles.promptIcon}>{prompt.icon}</span>
                    <span className={styles.promptLabel}>{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.messageList}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.aiWrapper}`}>
                  {msg.role === 'ai' && (
                    <div className={styles.messageAvatar}>
                      <div className={styles.cubeContainerSmall}>
                        <div className={styles.cube}>
                          <div className={styles.cubeFace}></div>
                          <div className={styles.cubeFace}></div>
                          <div className={styles.cubeFace}></div>
                          <div className={styles.cubeFace}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              
              {isStreaming && (
                <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
                  <div className={styles.messageAvatar}>
                    <div className={styles.cubeContainerSmall}>
                      <div className={styles.cube}>
                        <div className={styles.cubeFace}></div>
                        <div className={styles.cubeFace}></div>
                        <div className={styles.cubeFace}></div>
                        <div className={styles.cubeFace}></div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.messageBubble} ${styles.aiBubble}`}>
                    {streamingContent ? (
                      <>
                        <ReactMarkdown>{streamingContent}</ReactMarkdown>
                        <span className={styles.cursor}></span>
                      </>
                    ) : (
                      <div className={styles.thinking}>
                        <span></span><span></span><span></span>
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
            <input 
              type="text" 
              className={styles.textInput}
              placeholder="Ask anything..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
            />
            <button 
              className={`${styles.sendBtn} ${inputText.trim() ? styles.activeSend : ''}`}
              onClick={() => handleSend()}
              disabled={isStreaming || !inputText.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <div className={styles.footerHint}>
            Press Enter to send
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatPanel;
