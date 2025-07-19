import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true); // show loading sign

    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();

      // Add bot response
      setMessages([...newMessages, { role: 'bot', text: data.answer }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'bot', text: 'Error fetching response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Title at top-left */}
      <div className="app-brand">AskBuddy</div>

      {/* Chat box in center */}
      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="chat-window">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'user-msg' : 'bot-msg'}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bot-msg loading-msg">Thinking…</div>
            )}
          </div>

          <div className="input-section">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
