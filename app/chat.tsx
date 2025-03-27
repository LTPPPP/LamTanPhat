'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Loader2, MessageCircle } from 'lucide-react';
import './ChatInterface.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Xin chào, tôi là trợ lý của bạn. Hãy đặt câu hỏi để tôi có thể giúp bạn!',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            setIsLoading(true);
            const newMessage: Message = { role: 'user', content: input };
            setMessages(prev => [...prev, newMessage]);
            setInput('');

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: input, messages }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Sorry, something went wrong!' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: 'Hi, I am your assistant. Ask me questions so I can help you!',
            },
        ]);
        setInput('');
    };

    // Đóng chat khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
                setIsChatOpen(false);
            }
        };

        if (isChatOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isChatOpen]);

    return (
        <div className="fixed bottom-4 right-4">
            {!isChatOpen ? (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="chat-toggle-button"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            ) : (
                <div className="chat-container" ref={chatContainerRef}>
                    <header className="chat-header">
                        <h2 className="chat-title">Chat</h2>
                        <div className="chat-header-buttons">
                            <button
                                onClick={handleNewChat}
                                className="new-chat-button"
                            >
                                New Chat
                            </button>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="close-button"
                                aria-label="Close chat"
                            >
                                ✕
                            </button>
                        </div>
                    </header>

                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message-wrapper ${message.role === 'user' ? 'message-user' : 'message-assistant'
                                    }`}
                            >
                                <div
                                    className={`message-bubble ${message.role === 'user'
                                        ? 'message-bubble-user'
                                        : 'message-bubble-assistant'
                                        }`}
                                >
                                    {message.role === 'assistant' ? (
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    ) : (
                                        message.content
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <footer className="chat-input-container">
                        <div className="chat-input-wrapper">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Hãy đặt câu hỏi..."
                                className="chat-input"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={isLoading}
                                className="send-button"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Gửi'
                                )}
                            </Button>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
