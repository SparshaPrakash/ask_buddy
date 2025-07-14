import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/chat', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Something went wrong. Make sure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem', fontFamily: 'Arial' }}>
      <h1>AskBuddy 🤖</h1>
      <textarea
        rows={4}
        cols={60}
        placeholder="Ask me anything about your docs..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      <button onClick={askQuestion} style={{ marginTop: '1rem' }}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {answer && (
        <>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </>
      )}
    </div>
  );
}

export default App;
