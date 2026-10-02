import React from 'react';

const ProgressBar = ({ current, total, percentage, label, color = "indigo", showDetails = true }) => {
  const calcPercent = percentage !== undefined ? percentage : (total > 0 ? Math.round((current / total) * 100) : 0);
  const clampedPercent = Math.min(Math.max(calcPercent, 0), 100);

  return (
    <div className="progress-container">
      {label && (
        <div className="progress-label-row">
          <span className="progress-label">{label}</span>
          {showDetails && (
            <span className="progress-details">
              {current !== undefined && total !== undefined ? `${current} / ${total}` : `${clampedPercent}%`}
            </span>
          )}
        </div>
      )}
      <div className="progress-track">
        <div
          className={`progress-fill progress-bar-${color}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
