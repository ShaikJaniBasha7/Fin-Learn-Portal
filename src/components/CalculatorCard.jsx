import React from 'react';

const CalculatorCard = ({ title, subtitle, icon: Icon, children }) => {
  return (
    <div className="calculator-card">
      <div className="calc-card-header">
        <div className="calc-icon-box">
          {Icon && <Icon size={24} />}
        </div>
        <div>
          <h3 className="calc-card-title">{title}</h3>
          {subtitle && <p className="calc-card-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="calc-card-body">
        {children}
      </div>
    </div>
  );
};

export default CalculatorCard;
