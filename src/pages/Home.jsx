import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-wrapper">
      {/* Welcome Banner */}
      <section className="hero-section">
        <h1>Personal Finance Learning Portal</h1>
        <p className="hero-sub">
          Welcome! This educational portal is designed for students to learn essential money management skills, savings strategies, budgeting rules, and financial planning basics.
        </p>
      </section>

      {/* Main Feature Navigation Cards */}
      <h2 className="section-heading">Explore Portal Features</h2>
      <div className="home-cards-grid">
        <div className="home-card">
          <h3>📚 1. Learn Finance</h3>
          <p>
            Read simple lessons on saving money, building budgets, needs vs wants, and emergency safety funds.
          </p>
          <Link to="/learn" className="btn-link">Start Learning</Link>
        </div>

        <div className="home-card">
          <h3>📝 2. Take Quiz</h3>
          <p>
            Test your personal finance knowledge with a quick 5-question multiple-choice quiz.
          </p>
          <Link to="/quiz" className="btn-link">Take Quiz</Link>
        </div>

        <div className="home-card">
          <h3>🧮 3. Financial Calculator</h3>
          <p>
            Calculate your monthly budget surplus/deficit and estimate months required to reach your savings goal.
          </p>
          <Link to="/calculator" className="btn-link">Use Calculator</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
