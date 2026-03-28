import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  const [appState, setAppState] = useState('start'); // start, quiz, results
  const [results, setResults] = useState(null);

  const handleStartQuiz = () => {
    setAppState('quiz');
    setResults(null);
  };

  const handleSubmitQuiz = (quizResults) => {
    setResults(quizResults);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('start');
    setResults(null);
  };

  return (
    <div className="app-container">
      {appState === 'start' && (
        <div className="start-screen">
          <div className="start-content">
            <h1>Ứng Dụng Trắc Nghiệm</h1>
            <p>Kiểm tra kiến thức của bạn với những câu hỏi thú vị</p>
            <button className="btn-start" onClick={handleStartQuiz}>
              Bắt Đầu
            </button>
          </div>
        </div>
      )}

      {appState === 'quiz' && (
        <Quiz onSubmit={handleSubmitQuiz} />
      )}

      {appState === 'results' && (
        <Results results={results} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
