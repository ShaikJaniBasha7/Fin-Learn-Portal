import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, description, icon: Icon, linkTo, linkText, badge, colorClass = "blue" }) => {
  return (
    <div className={`dash-card dash-card-${colorClass}`}>
      <div className="dash-card-header">
        <div className={`dash-icon-bg bg-${colorClass}`}>
          {Icon && <Icon className="dash-icon" size={24} />}
        </div>
        {badge && <span className="dash-badge">{badge}</span>}
      </div>
      <h3 className="dash-card-title">{title}</h3>
      <p className="dash-card-desc">{description}</p>
      {linkTo && (
        <Link to={linkTo} className="dash-card-link">
          <span>{linkText || 'Explore Now'}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default DashboardCard;
