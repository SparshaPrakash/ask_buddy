import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    // Add user's message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);

    // Send to backend
    const res = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });
    const data = await res.json();

    // Add bot's reply
    setMessages([...newMessages, { role: 'bot', text: data.answer }]);
    setInput("");
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'user-msg' : 'bot-msg'}>
            {m.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
