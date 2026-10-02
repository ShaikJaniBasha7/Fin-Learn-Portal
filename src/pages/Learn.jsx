import React, { useState } from 'react';
import Card from '../components/Card';

function Learn() {
  // Simple state to track completed topic IDs
  const [completedTopics, setCompletedTopics] = useState([]);

  // Array of 5 core topics required by assignment
  const topicsData = [
    {
      id: 1,
      title: "1. What is Saving?",
      description: "Saving money means setting aside a portion of your current income or stipend for future use rather than spending it all immediately on non-essential items.",
      example: "If you receive $100 allowance per month, keeping $20 in a separate bank account or wallet as savings."
    },
    {
      id: 2,
      title: "2. What is Budgeting?",
      description: "A budget is a simple financial plan that lists your total income and expected expenses to keep track of where your money goes every month.",
      example: "Listing $500 monthly income and allocating $200 for rent, $150 for groceries, $50 for transport, and $100 for savings."
    },
    {
      id: 3,
      title: "3. Needs vs Wants",
      description: "Needs are essential items required for survival and basic daily living (food, basic shelter, tuition). Wants are non-essential items that increase comfort or fun.",
      example: "Buying textbooks and basic meals is a Need. Buying expensive branded clothes or high-end gadgets is a Want."
    },
    {
      id: 4,
      title: "4. Emergency Fund",
      description: "An emergency fund is money set aside specifically for unexpected urgent situations like sudden medical expenses, car/laptop repair, or temporary job loss.",
      example: "Keeping $500 saved exclusively for sudden laptop repairs so you do not have to borrow money."
    },
    {
      id: 5,
      title: "5. 50/30/20 Budget Rule",
      description: "A popular rule where 50% of your income goes to Needs (essentials), 30% goes to Wants (entertainment/hobbies), and 20% goes to Savings or paying off debt.",
      example: "On a $1,000 income: $500 for Needs, $300 for Wants, and $200 directly into Savings."
    }
  ];

  // Function to toggle topic completion
  const handleToggleComplete = (id) => {
    if (completedTopics.includes(id)) {
      setCompletedTopics(completedTopics.filter((item) => item !== id));
    } else {
      setCompletedTopics([...completedTopics, id]);
    }
  };

  return (
    <div className="page-wrapper">
      <h2>Financial Learning Topics</h2>
      <p className="page-intro">
        Read through each topic below to understand the fundamentals of money management.
        Completed: {completedTopics.length} / {topicsData.length} topics
      </p>

      <div className="topics-container">
        {topicsData.map((topic) => (
          <Card
            key={topic.id}
            title={topic.title}
            description={topic.description}
            example={topic.example}
            isCompleted={completedTopics.includes(topic.id)}
            onComplete={() => handleToggleComplete(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Learn;
