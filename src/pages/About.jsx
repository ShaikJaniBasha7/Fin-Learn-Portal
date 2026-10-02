import React from 'react';

function About() {
  return (
    <div className="page-wrapper">
      <h2>About This Project</h2>

      <div className="about-card">
        <h3>🎓 Project Overview</h3>
        <p>
          This <strong>Personal Finance Learning Portal</strong> is an individual college assignment project created by a 3rd-year Computer Science Engineering (CSE) student.
        </p>

        <h3>🎯 Purpose of the Project</h3>
        <p>
          The main objective of this web application is to help college students build basic financial literacy, understand how to save money effectively, plan a monthly budget, and calculate financial goals.
        </p>

        <h3>💡 What Users Can Learn</h3>
        <ul>
          <li>Fundamentals of personal saving and budgeting.</li>
          <li>Distinguishing between essential Needs and optional Wants.</li>
          <li>Importance of maintaining an Emergency Safety Fund.</li>
          <li>Applying the popular 50/30/20 budget allocation rule.</li>
          <li>Testing financial knowledge via a 5-question interactive quiz.</li>
          <li>Calculating monthly expenses, net remaining funds, and savings timelines.</li>
        </ul>

        <h3>💻 Technologies Used</h3>
        <ul>
          <li><strong>ReactJS</strong> (Functional Components, JSX)</li>
          <li><strong>React Hooks</strong> (`useState`, `useEffect`)</li>
          <li><strong>React Router DOM</strong> (Single-page client routing)</li>
          <li><strong>JavaScript ES6</strong> (Arrow functions, Array methods)</li>
          <li><strong>HTML5 & CSS3</strong> (Responsive styling and clean card design)</li>
          <li><strong>Vite</strong> (Fast frontend build tool)</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
