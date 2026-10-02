import React from 'react';

// Component to render one quiz question
function QuizQuestion({ questionData, selectedAnswer, onSelectAnswer, onNextQuestion, currentQuestionIndex, totalQuestions }) {
  return (
    <div className="quiz-question-box">
      <div className="quiz-progress-text">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>

      <h3 className="question-title">{questionData.question}</h3>

      <div className="options-container">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`option-button ${selectedAnswer === index ? 'selected-option' : ''}`}
            onClick={() => onSelectAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>

      <button onClick={onNextQuestion} className="next-btn">
        {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
}

export default QuizQuestion;
