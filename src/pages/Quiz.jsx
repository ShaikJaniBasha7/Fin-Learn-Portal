import React, { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';
import { quizData } from '../data/quizData';

function Quiz() {
  // Simple state variables as requested
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalQuestions = quizData.length;

  // Handle selecting an option
  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
    setErrorMessage('');
  };

  // Handle Next button click
  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      setErrorMessage('Please select an answer before continuing.');
      return;
    }

    // Check if selected answer is correct
    let newScore = score;
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }

    // Move to next question or finish quiz
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  // Handle Restart Quiz button
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizFinished(false);
    setErrorMessage('');
  };

  // Calculate score percentage
  const percentage = Math.round((score / totalQuestions) * 100);

  // Get simple feedback message based on score
  const getMessage = () => {
    if (percentage >= 80) return "Excellent! You have great personal finance knowledge.";
    if (percentage >= 60) return "Good effort! You passed the quiz.";
    return "Keep practicing! Review the learning section to improve your score.";
  };

  return (
    <div className="page-wrapper">
      <h2>Personal Finance Knowledge Quiz</h2>

      {!isQuizFinished ? (
        <div className="quiz-box">
          {errorMessage && <p className="error-alert">{errorMessage}</p>}

          <QuizQuestion
            questionData={quizData[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={handleNextQuestion}
            currentQuestionIndex={currentQuestion}
            totalQuestions={totalQuestions}
          />
        </div>
      ) : (
        /* Quiz Result View */
        <div className="quiz-result-card">
          <h3>Quiz Completed! 🎉</h3>
          <p className="score-text">Your Score: <strong>{score} / {totalQuestions}</strong></p>
          <p className="percentage-text">Percentage: <strong>{percentage}%</strong></p>
          <p className="feedback-message">{getMessage()}</p>

          <button onClick={handleRestartQuiz} className="restart-btn">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
