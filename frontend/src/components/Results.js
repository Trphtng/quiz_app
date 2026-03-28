import React from 'react';
import './Results.css';

function Results({ results, onRestart }) {
  if (!results) {
    return <div className="results-container"><p>Không có kết quả</p></div>;
  }

  const scorePercentage = Math.round(results.score);
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Kết Quả</h1>

        <div className="score-display">
          <div className="score-circle" style={{ borderColor: getScoreColor(scorePercentage) }}>
            <div className="score-number" style={{ color: getScoreColor(scorePercentage) }}>
              {scorePercentage}%
            </div>
          </div>
          <div className="score-stats">
            <p className="score-detail">
              <strong>Câu đúng:</strong> {results.correct_answers}/{results.total_questions}
            </p>
            <p className="score-detail">
              <strong>Tổng điểm:</strong> {results.score.toFixed(2)}/100
            </p>
          </div>
        </div>

        <div className="results-message">
          {scorePercentage >= 80 && <p>🎉 Xuất sắc! Bạn nắm vững kiến thức!</p>}
          {scorePercentage >= 60 && scorePercentage < 80 && <p>👍 Tốt! Tiếp tục ôn tập để cải thiện hơn!</p>}
          {scorePercentage < 60 && <p>📚 Chưa đạt yêu cầu. Hãy ôn tập thêm!</p>}
        </div>

        <div className="details-section">
          <h2>Chi Tiết Từng Câu</h2>
          <div className="results-list">
            {results.results.map((result, index) => (
              <div
                key={result.question_id}
                className={`result-item ${result.is_correct ? 'correct' : 'incorrect'}`}
              >
                <div className="result-header">
                  <span className="result-number">Câu {index + 1}</span>
                  <span className={`result-badge ${result.is_correct ? 'badge-correct' : 'badge-incorrect'}`}>
                    {result.is_correct ? '✓ Đúng' : '✗ Sai'}
                  </span>
                </div>

                <p className="result-question">{result.question}</p>

                <div className="result-answers">
                  <div className="answer-row">
                    <span className="answer-label">Bạn chọn:</span>
                    <span className="answer-value">
                      {result.selected_answer || 'Không giải đáp'}
                    </span>
                  </div>

                  {!result.is_correct && (
                    <div className="answer-row">
                      <span className="answer-label">Đáp án đúng:</span>
                      <span className="answer-value correct-answer">
                        {result.correct_answer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-restart" onClick={onRestart}>
          Làm Lại
        </button>
      </div>
    </div>
  );
}

export default Results;
