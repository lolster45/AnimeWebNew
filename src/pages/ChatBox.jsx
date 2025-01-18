import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/ChatBox.scss';

const ChatBox = () => {
    const [conversationsLog, setConversationsLog] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    
    const conversationsEndRef = useRef(null);  // Ref for scrolling

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('/api/chat', { prompt });
            setConversationsLog(prevLogs => [
                ...prevLogs,
                { owner: 'user', message: prompt },
                { owner: 'gpt-model', message: res.data.response }
            ]);
            setPrompt('');
        } catch (error) {
            console.error('Error from backend:', error);
        }

        setLoading(false);
    };

    // Scroll to the bottom when conversations change
    useEffect(() => {
        conversationsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversationsLog]);

    return (
        <div className='chat-box-page'>
            <div className="conversations-wrap">
                <h1>What can I help with?</h1>
                <div className='log-wrap'>
                    {conversationsLog.length > 0 &&
                        conversationsLog.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`${msg.owner === 'user' ? 'right' : 'left'}`}
                            >
                                {msg.owner === 'gpt-model' && 
                                    <img 
                                        src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-on-transparent-background-png.png" 
                                        alt="GPT Logo"
                                        className="gpt-logo"
                                    />
                                }
                                {msg.message}
                            </div>
                        ))
                    }
                    <div ref={conversationsEndRef} /> {/* Scroll target */}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask something..."
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ChatBox;
