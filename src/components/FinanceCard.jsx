import React from 'react';
import { CheckCircle, Circle, BookOpen, Lightbulb, Target, PiggyBank, Wallet, Scale, ShieldCheck, PieChart, TrendingUp, Compass } from 'lucide-react';

const iconMap = {
  PiggyBank,
  Wallet,
  Scale,
  ShieldCheck,
  PieChart,
  Target,
  TrendingUp,
  Compass
};

const FinanceCard = ({ topic, isCompleted, onToggleComplete }) => {
  const IconComponent = iconMap[topic.icon] || BookOpen;

  return (
    <div className={`finance-card ${isCompleted ? 'completed' : ''}`}>
      <div className="finance-card-header">
        <div className="finance-title-box">
          <div className="topic-icon-wrap">
            <IconComponent size={22} />
          </div>
          <div>
            <span className="topic-category-badge">{topic.category}</span>
            <h3 className="finance-card-title">{topic.title}</h3>
          </div>
        </div>

        <button
          onClick={() => onToggleComplete(topic.id)}
          className={`completion-btn ${isCompleted ? 'is-done' : ''}`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted ? (
            <>
              <CheckCircle size={18} />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Circle size={18} />
              <span>Mark as Completed</span>
            </>
          )}
        </button>
      </div>

      <p className="finance-explanation">{topic.explanation}</p>

      <div className="finance-section-box key-points-box">
        <h4 className="section-subtitle flex items-center gap-2">
          <Target size={16} /> Key Concepts
        </h4>
        <ul className="key-points-list">
          {topic.keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="finance-section-box example-box">
        <h4 className="section-subtitle flex items-center gap-2">
          <Lightbulb size={16} /> Practical Example
        </h4>
        <p className="example-text">{topic.example}</p>
      </div>
    </div>
  );
};

export default FinanceCard;
