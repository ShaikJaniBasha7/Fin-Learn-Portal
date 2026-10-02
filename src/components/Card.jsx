import React from 'react';

// Simple reusable Card component
function Card({ title, description, example, linkText, linkTo, onComplete, isCompleted }) {
  return (
    <div className={`custom-card ${isCompleted ? 'completed-card' : ''}`}>
      <h3>{title}</h3>
      <p className="card-desc">{description}</p>

      {/* Show simple example if provided */}
      {example && (
        <div className="card-example">
          <strong>Example: </strong> {example}
        </div>
      )}

      {/* Show optional link */}
      {linkTo && (
        <a href={linkTo} className="card-link">{linkText || 'Open'}</a>
      )}

      {/* Show mark as completed button if callback provided */}
      {onComplete && (
        <button
          onClick={onComplete}
          className={`complete-btn ${isCompleted ? 'btn-done' : ''}`}
        >
          {isCompleted ? '✓ Completed' : 'Mark as Completed'}
        </button>
      )}
    </div>
  );
}

export default Card;
