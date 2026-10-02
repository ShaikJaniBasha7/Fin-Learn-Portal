import React, { useState } from 'react';

function Calculator() {
  // State for Monthly Budget Calculator
  const [income, setIncome] = useState('');
  const [food, setFood] = useState('');
  const [transport, setTransport] = useState('');
  const [education, setEducation] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [remainingMoney, setRemainingMoney] = useState(null);
  const [budgetError, setBudgetError] = useState('');

  // State for Savings Goal Calculator
  const [savingsGoal, setSavingsGoal] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [monthsRequired, setMonthsRequired] = useState(null);
  const [savingsError, setSavingsError] = useState('');

  // Handler for Monthly Budget Calculation
  const handleCalculateBudget = (e) => {
    e.preventDefault();
    setBudgetError('');

    // Check if fields are empty
    if (!income || !food || !transport || !education || !entertainment || !otherExpenses) {
      setBudgetError('Please fill in all budget fields.');
      return;
    }

    const inc = parseFloat(income);
    const f = parseFloat(food);
    const t = parseFloat(transport);
    const ed = parseFloat(education);
    const ent = parseFloat(entertainment);
    const oth = parseFloat(otherExpenses);

    // Basic validation for negative numbers
    if (inc < 0 || f < 0 || t < 0 || ed < 0 || ent < 0 || oth < 0) {
      setBudgetError('Values cannot be negative numbers.');
      return;
    }

    // Formulas
    const totalExp = f + t + ed + ent + oth;
    const remaining = inc - totalExp;

    setTotalExpenses(totalExp);
    setRemainingMoney(remaining);
  };

  // Handler for Savings Goal Calculation
  const handleCalculateSavings = (e) => {
    e.preventDefault();
    setSavingsError('');

    // Check if fields are empty
    if (!savingsGoal || !monthlySavings) {
      setSavingsError('Please fill in both savings goal fields.');
      return;
    }

    const goal = parseFloat(savingsGoal);
    const monthly = parseFloat(monthlySavings);

    // Validation
    if (goal <= 0 || monthly <= 0) {
      setSavingsError('Goal amount and monthly savings must be greater than zero.');
      return;
    }

    // Formula: Months = Savings Goal / Monthly Savings
    const months = Math.ceil(goal / monthly);
    setMonthsRequired(months);
  };

  return (
    <div className="page-wrapper">
      <h2>Financial Calculators</h2>

      {/* Calculator 1: Monthly Budget Calculator */}
      <div className="calc-card">
        <h3>1. Monthly Budget Calculator</h3>
        <p className="calc-sub">Calculate your total expenses and remaining monthly balance.</p>

        {budgetError && <p className="error-alert">{budgetError}</p>}

        <form onSubmit={handleCalculateBudget} className="simple-form">
          <div className="form-group">
            <label>Monthly Income ($):</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 1000"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Food ($):</label>
              <input
                type="number"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="e.g. 250"
              />
            </div>

            <div className="form-group">
              <label>Transport ($):</label>
              <input
                type="number"
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
                placeholder="e.g. 100"
              />
            </div>

            <div className="form-group">
              <label>Education ($):</label>
              <input
                type="number"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. 150"
              />
            </div>

            <div className="form-group">
              <label>Entertainment ($):</label>
              <input
                type="number"
                value={entertainment}
                onChange={(e) => setEntertainment(e.target.value)}
                placeholder="e.g. 80"
              />
            </div>

            <div className="form-group">
              <label>Other Expenses ($):</label>
              <input
                type="number"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(e.target.value)}
                placeholder="e.g. 70"
              />
            </div>
          </div>

          <button type="submit" className="calc-btn">Calculate Budget</button>
        </form>

        {totalExpenses !== null && remainingMoney !== null && (
          <div className="calc-results-box">
            <p>Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong></p>
            <p>Remaining Money: <strong className={remainingMoney >= 0 ? 'text-green' : 'text-red'}>${remainingMoney.toFixed(2)}</strong></p>
          </div>
        )}
      </div>

      {/* Calculator 2: Savings Goal Calculator */}
      <div className="calc-card margin-top">
        <h3>2. Savings Goal Calculator</h3>
        <p className="calc-sub">Estimate how many months required to reach your target savings.</p>

        {savingsError && <p className="error-alert">{savingsError}</p>}

        <form onSubmit={handleCalculateSavings} className="simple-form">
          <div className="form-group">
            <label>Savings Goal Target ($):</label>
            <input
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              placeholder="e.g. 1200"
            />
          </div>

          <div className="form-group">
            <label>Monthly Savings Amount ($):</label>
            <input
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(e.target.value)}
              placeholder="e.g. 200"
            />
          </div>

          <button type="submit" className="calc-btn">Calculate Months Required</button>
        </form>

        {monthsRequired !== null && (
          <div className="calc-results-box">
            <p>Approximate Time Required: <strong>{monthsRequired} month(s)</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
