import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz({ onSubmit }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/questions');
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data);
      // Initialize answers object
      const initialAnswers = {};
      data.forEach(q => {
        initialAnswers[q.id] = null;
      });
      setAnswers(initialAnswers);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredCount = questions.filter(q => answers[q.id] === null).length;
    if (unansweredCount > 0) {
      if (!window.confirm(`Bạn có ${unansweredCount} câu chưa trả lời. Bạn có chắc muốn nộp bài?`)) {
        return;
      }
    }

    try {
      setSubmitting(true);
      const submitData = {
        answers: questions
          .filter(q => answers[q.id] !== null)
          .map(q => ({
            question_id: q.id,
            selected_answer: answers[q.id]
          }))
      };

      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) throw new Error('Failed to submit answers');
      const result = await response.json();
      onSubmit(result);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="quiz-container"><p>Đang tải câu hỏi...</p></div>;
  }

  if (error) {
    return (
      <div className="quiz-container">
        <p className="error-message">Lỗi: {error}</p>
        <button onClick={fetchQuestions}>Thử lại</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="quiz-container"><p>Không có câu hỏi nào</p></div>;
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          ></div>
        </div>

        <div className="question-info">
          <span className="question-number">
            Câu {currentQuestion + 1}/{questions.length}
          </span>
        </div>

        <h2 className="question-text">{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(question.id, option)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            className="btn-nav"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Trước
          </button>

          <div className="question-indicators">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className={`indicator ${idx === currentQuestion ? 'current' : ''} ${
                  answers[q.id] !== null ? 'answered' : ''
                }`}
                onClick={() => setCurrentQuestion(idx)}
                title={`Câu ${idx + 1}`}
              ></div>
            ))}
          </div>

          <button
            className="btn-nav"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Tiếp →
          </button>
        </div>

        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Đang nộp...' : 'Nộp Bài'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
