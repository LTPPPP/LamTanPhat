'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Loader2, MessageCircle } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Xin chào, tôi là trợ lý của bạn. Hãy đặt câu hỏi để tôi có thể giúp bạn!',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

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
                { role: 'assistant', content: 'Sorry, something go wrong, Help mee!' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: 'Hi, I am Lam Tan Phat.Ask me questions so I can help you!',
            },
        ]);
        setInput('');
    };

    return (
        <div className="fixed bottom-4 right-4" style={{ fontSize: '0.6rem' }}>
            {!isChatOpen ? (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            ) : (
                <div className={`flex flex-col w-full max-w-md h-[500px] md:h-[600px] bg-white rounded-lg shadow-lg border border-gray-600 fixed bottom-4 right-4 z-50`}>
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-bold">Chat</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleNewChat}
                                className="text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-200 rounded-lg"
                            >
                                New Chat
                            </button>
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                                style={{
                                    position: 'fixed',
                                    bottom: '16px',
                                    right: '16px',
                                    zIndex: 1000, // Đảm bảo luôn hiển thị trên các thành phần khác
                                }}
                            >
                                <MessageCircle className="w-6 h-6" />
                            </button>

                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`p-3 rounded-lg max-w-[80%] break-words overflow-wrap-anywhere text-base ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                        }`} style={{ fontSize: '0.6rem' }}
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
                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Hãy đặt câu hỏi..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={isLoading}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Gửi'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
