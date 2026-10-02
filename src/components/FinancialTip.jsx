import React, { useState } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

const TIPS = [
  "Rule of 72: Divide 72 by your expected annual rate of return to estimate how many years it will take for your money to double.",
  "Automate Savings: Set up an automatic transfer on payday so you save before you even notice the cash is gone.",
  "The 24-Hour Impulse Rule: Wait 24 hours before making non-essential purchases over $50 to curb emotional spending.",
  "Audit Subscriptions: Regularly review app and streaming subscriptions; cancel any service you haven't used in 30 days.",
  "Track Micro-Expenses: Coffee, snacks, and daily quick buys can accumulate to hundreds of dollars a month without a budget.",
  "Build emergency savings early: Having just $1,000 in emergency savings prevents 80% of minor debt spirals."
];

const FinancialTip = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="financial-tip-card">
      <div className="tip-header">
        <div className="flex items-center gap-2">
          <div className="tip-icon-glow">
            <Lightbulb size={20} className="text-amber-400" />
          </div>
          <span className="tip-tag font-semibold">Pro Financial Tip</span>
        </div>
        <button
          onClick={handleNextTip}
          className="tip-refresh-btn flex items-center gap-1 text-xs"
          title="Get another tip"
        >
          <RefreshCw size={14} /> Next Tip
        </button>
      </div>

      <p className="tip-content">"{TIPS[tipIndex]}"</p>
    </div>
  );
};

export default FinancialTip;
