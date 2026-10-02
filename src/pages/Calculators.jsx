import React, { useState } from 'react';
import CalculatorCard from '../components/CalculatorCard';
import { Calculator, PieChart, Target, TrendingUp, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const Calculators = () => {
  const [activeTab, setActiveTab] = useState('budget');

  // --- CALCULATOR 1: BUDGET CALCULATOR ---
  const [budgetInput, setBudgetInput] = useState({
    income: '',
    housing: '',
    food: '',
    transportation: '',
    education: '',
    entertainment: '',
    other: ''
  });
  const [budgetResult, setBudgetResult] = useState(null);
  const [budgetError, setBudgetError] = useState('');

  const handleBudgetChange = (field, val) => {
    setBudgetInput({ ...budgetInput, [field]: val });
    if (budgetError) setBudgetError('');
  };

  const calculateBudget = (e) => {
    e.preventDefault();
    const { income, housing, food, transportation, education, entertainment, other } = budgetInput;

    if (!income || isNaN(income) || parseFloat(income) <= 0) {
      setBudgetError('Please enter a valid positive monthly income.');
      return;
    }

    const inc = parseFloat(income);
    const h = parseFloat(housing) || 0;
    const f = parseFloat(food) || 0;
    const t = parseFloat(transportation) || 0;
    const ed = parseFloat(education) || 0;
    const ent = parseFloat(entertainment) || 0;
    const o = parseFloat(other) || 0;

    if ([h, f, t, ed, ent, o].some(val => val < 0)) {
      setBudgetError('Expenses cannot be negative numbers.');
      return;
    }

    const totalExpenses = h + f + t + ed + ent + o;
    const remainingBalance = inc - totalExpenses;
    const savingsPercent = Math.round((remainingBalance / inc) * 100);

    setBudgetResult({
      totalIncome: inc,
      totalExpenses,
      remainingBalance,
      savingsPercent
    });
  };

  const resetBudget = () => {
    setBudgetInput({ income: '', housing: '', food: '', transportation: '', education: '', entertainment: '', other: '' });
    setBudgetResult(null);
    setBudgetError('');
  };

  // --- CALCULATOR 2: SAVINGS GOAL CALCULATOR ---
  const [goalInput, setGoalInput] = useState({
    goalAmount: '',
    currentSavings: '',
    monthlyContribution: ''
  });
  const [goalResult, setGoalResult] = useState(null);
  const [goalError, setGoalError] = useState('');

  const handleGoalChange = (field, val) => {
    setGoalInput({ ...goalInput, [field]: val });
    if (goalError) setGoalError('');
  };

  const calculateGoal = (e) => {
    e.preventDefault();
    const { goalAmount, currentSavings, monthlyContribution } = goalInput;

    const target = parseFloat(goalAmount);
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution);

    if (!goalAmount || isNaN(goalAmount) || target <= 0) {
      setGoalError('Target goal amount must be a positive number.');
      return;
    }
    if (current < 0) {
      setGoalError('Current savings cannot be negative.');
      return;
    }
    if (!monthlyContribution || isNaN(monthlyContribution) || monthly <= 0) {
      setGoalError('Monthly contribution must be a positive number greater than 0.');
      return;
    }
    if (current >= target) {
      setGoalError('Current savings already reach or exceed your goal target!');
      return;
    }

    const remaining = target - current;
    const monthsRequired = Math.ceil(remaining / monthly);
    const years = Math.floor(monthsRequired / 12);
    const remMonths = monthsRequired % 12;

    setGoalResult({
      goalAmount: target,
      currentSavings: current,
      remainingAmount: remaining,
      monthsRequired,
      years,
      remMonths
    });
  };

  const resetGoal = () => {
    setGoalInput({ goalAmount: '', currentSavings: '', monthlyContribution: '' });
    setGoalResult(null);
    setGoalError('');
  };

  // --- CALCULATOR 3: SIMPLE INTEREST CALCULATOR ---
  const [interestInput, setInterestInput] = useState({
    principal: '',
    rate: '',
    time: ''
  });
  const [interestResult, setInterestResult] = useState(null);
  const [interestError, setInterestError] = useState('');

  const handleInterestChange = (field, val) => {
    setInterestInput({ ...interestInput, [field]: val });
    if (interestError) setInterestError('');
  };

  const calculateInterest = (e) => {
    e.preventDefault();
    const p = parseFloat(interestInput.principal);
    const r = parseFloat(interestInput.rate);
    const t = parseFloat(interestInput.time);

    if (!interestInput.principal || isNaN(p) || p <= 0) {
      setInterestError('Principal amount must be a positive number.');
      return;
    }
    if (!interestInput.rate || isNaN(r) || r <= 0) {
      setInterestError('Interest rate must be greater than 0%.');
      return;
    }
    if (!interestInput.time || isNaN(t) || t <= 0) {
      setInterestError('Time duration (in years) must be greater than 0.');
      return;
    }

    const interest = (p * r * t) / 100;
    const finalAmount = p + interest;

    setInterestResult({
      principal: p,
      rate: r,
      time: t,
      interest,
      finalAmount
    });
  };

  const resetInterest = () => {
    setInterestInput({ principal: '', rate: '', time: '' });
    setInterestResult(null);
    setInterestError('');
  };

  return (
    <div className="page-container page-calculators">
      {/* Header Banner */}
      <header className="page-header">
        <div className="header-title-box">
          <div className="header-icon bg-purple">
            <Calculator size={28} />
          </div>
          <div>
            <h1 className="page-title">Interactive Financial Calculators</h1>
            <p className="page-subtitle">
              Plan your monthly budget, calculate timeline for financial goals, and estimate simple interest earnings.
            </p>
          </div>
        </div>
      </header>

      {/* Tab Navigation Controls */}
      <div className="calc-tabs-bar">
        <button
          className={`calc-tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          <PieChart size={18} /> Budget Calculator
        </button>
        <button
          className={`calc-tab-btn ${activeTab === 'goal' ? 'active' : ''}`}
          onClick={() => setActiveTab('goal')}
        >
          <Target size={18} /> Savings Goal Calculator
        </button>
        <button
          className={`calc-tab-btn ${activeTab === 'interest' ? 'active' : ''}`}
          onClick={() => setActiveTab('interest')}
        >
          <TrendingUp size={18} /> Simple Interest Calculator
        </button>
      </div>

      {/* TAB 1: BUDGET CALCULATOR */}
      {activeTab === 'budget' && (
        <CalculatorCard
          title="1. Monthly Budget Calculator"
          subtitle="Input your monthly income and category expenses to compute total outflow and remaining savings rate."
          icon={PieChart}
        >
          <form onSubmit={calculateBudget} className="calc-form">
            {budgetError && (
              <div className="alert alert-error mb-4 flex items-center gap-2">
                <AlertCircle size={18} /> <span>{budgetError}</span>
              </div>
            )}

            <div className="form-group mb-4">
              <label className="form-label font-bold text-gray-800">
                Monthly Net Income ($) <span className="req">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 1500"
                value={budgetInput.income}
                onChange={(e) => handleBudgetChange('income', e.target.value)}
                className="form-input text-lg font-semibold"
              />
            </div>

            <h4 className="font-semibold text-gray-700 mt-4 mb-2">Category Expenses ($)</h4>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Housing / Rent</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={budgetInput.housing}
                  onChange={(e) => handleBudgetChange('housing', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Food & Groceries</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={budgetInput.food}
                  onChange={(e) => handleBudgetChange('food', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Transportation</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={budgetInput.transportation}
                  onChange={(e) => handleBudgetChange('transportation', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Education / Books</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={budgetInput.education}
                  onChange={(e) => handleBudgetChange('education', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Entertainment / Dining Out</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={budgetInput.entertainment}
                  onChange={(e) => handleBudgetChange('entertainment', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Other Expenses</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={budgetInput.other}
                  onChange={(e) => handleBudgetChange('other', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="btn-row mt-6">
              <button type="submit" className="btn-primary">
                Calculate Budget
              </button>
              <button type="button" onClick={resetBudget} className="btn-secondary flex items-center gap-1">
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          </form>

          {budgetResult && (
            <div className="calc-result-card mt-6">
              <h4 className="result-card-title flex items-center gap-2 text-indigo-600 font-bold text-lg mb-3">
                <CheckCircle2 size={20} /> Budget Summary Results
              </h4>
              <div className="results-grid-3">
                <div className="res-stat-box">
                  <span className="res-label">Total Income</span>
                  <span className="res-val text-gray-800">${budgetResult.totalIncome.toFixed(2)}</span>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Total Expenses</span>
                  <span className="res-val text-rose-600">${budgetResult.totalExpenses.toFixed(2)}</span>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Remaining Balance</span>
                  <span className={`res-val ${budgetResult.remainingBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    ${budgetResult.remainingBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="savings-rate-banner mt-4 p-4 rounded-lg bg-indigo-50 border border-indigo-100 flex justify-between items-center">
                <div>
                  <h5 className="font-semibold text-indigo-900">Savings Rate</h5>
                  <p className="text-xs text-indigo-700">Percentage of net monthly income retained</p>
                </div>
                <span className={`text-2xl font-black ${budgetResult.savingsPercent >= 20 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {budgetResult.savingsPercent}%
                </span>
              </div>
            </div>
          )}
        </CalculatorCard>
      )}

      {/* TAB 2: SAVINGS GOAL CALCULATOR */}
      {activeTab === 'goal' && (
        <CalculatorCard
          title="2. Savings Goal Calculator"
          subtitle="Determine how long it will take to reach your financial goal based on monthly contributions."
          icon={Target}
        >
          <form onSubmit={calculateGoal} className="calc-form">
            {goalError && (
              <div className="alert alert-error mb-4 flex items-center gap-2">
                <AlertCircle size={18} /> <span>{goalError}</span>
              </div>
            )}

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">
                  Savings Goal Amount ($) <span className="req">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3000"
                  value={goalInput.goalAmount}
                  onChange={(e) => handleGoalChange('goalAmount', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Savings ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={goalInput.currentSavings}
                  onChange={(e) => handleGoalChange('currentSavings', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Monthly Contribution ($) <span className="req">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 250"
                  value={goalInput.monthlyContribution}
                  onChange={(e) => handleGoalChange('monthlyContribution', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="btn-row mt-6">
              <button type="submit" className="btn-primary">
                Calculate Goal Timeline
              </button>
              <button type="button" onClick={resetGoal} className="btn-secondary flex items-center gap-1">
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          </form>

          {goalResult && (
            <div className="calc-result-card mt-6">
              <h4 className="result-card-title flex items-center gap-2 text-emerald-600 font-bold text-lg mb-3">
                <CheckCircle2 size={20} /> Savings Timeline Results
              </h4>
              <div className="results-grid-3">
                <div className="res-stat-box">
                  <span className="res-label">Target Goal</span>
                  <span className="res-val text-gray-800">${goalResult.goalAmount.toFixed(2)}</span>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Remaining Required</span>
                  <span className="res-val text-indigo-600">${goalResult.remainingAmount.toFixed(2)}</span>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Est. Time Required</span>
                  <span className="res-val text-emerald-600">
                    {goalResult.monthsRequired} {goalResult.monthsRequired === 1 ? 'Month' : 'Months'}
                  </span>
                </div>
              </div>

              <p className="goal-detail-subtext mt-3 text-sm text-gray-600 bg-emerald-50 p-3 rounded border-l-4 border-emerald-500">
                🎯 At your current deposit rate, you will achieve your target goal in approximately{' '}
                <strong>
                  {goalResult.years > 0 ? `${goalResult.years} year(s) and ${goalResult.remMonths} month(s)` : `${goalResult.monthsRequired} month(s)`}
                </strong>!
              </p>
            </div>
          )}
        </CalculatorCard>
      )}

      {/* TAB 3: SIMPLE INTEREST CALCULATOR */}
      {activeTab === 'interest' && (
        <CalculatorCard
          title="3. Simple Interest Calculator"
          subtitle="Calculate interest accrued and total maturity amount using the formula: Interest = (Principal × Rate × Time) / 100."
          icon={TrendingUp}
        >
          <form onSubmit={calculateInterest} className="calc-form">
            {interestError && (
              <div className="alert alert-error mb-4 flex items-center gap-2">
                <AlertCircle size={18} /> <span>{interestError}</span>
              </div>
            )}

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">
                  Principal Amount ($) <span className="req">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1000"
                  value={interestInput.principal}
                  onChange={(e) => handleInterestChange('principal', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Annual Interest Rate (%) <span className="req">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 6.5"
                  value={interestInput.rate}
                  onChange={(e) => handleInterestChange('rate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Time Duration (Years) <span className="req">*</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 3"
                  value={interestInput.time}
                  onChange={(e) => handleInterestChange('time', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="btn-row mt-6">
              <button type="submit" className="btn-primary">
                Calculate Interest
              </button>
              <button type="button" onClick={resetInterest} className="btn-secondary flex items-center gap-1">
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          </form>

          {interestResult && (
            <div className="calc-result-card mt-6">
              <h4 className="result-card-title flex items-center gap-2 text-purple-600 font-bold text-lg mb-3">
                <CheckCircle2 size={20} /> Simple Interest Results
              </h4>
              <div className="results-grid-3">
                <div className="res-stat-box">
                  <span className="res-label">Initial Principal</span>
                  <span className="res-val text-gray-800">${interestResult.principal.toFixed(2)}</span>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Total Interest Earned</span>
                  <span className="res-val text-emerald-600">+${interestResult.interest.toFixed(2)}</span>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Final Maturity Amount</span>
                  <span className="res-val text-purple-600">${interestResult.finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </CalculatorCard>
      )}
    </div>
  );
};

export default Calculators;
