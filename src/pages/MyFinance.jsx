import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { Wallet, TrendingUp, TrendingDown, DollarSign, CheckCircle2 } from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'sample-1',
    description: 'Part-time Tutoring Stipend',
    amount: 450.00,
    type: 'income',
    category: 'Income',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'sample-2',
    description: 'Semester Textbooks & Lab Manual',
    amount: 120.00,
    type: 'expense',
    category: 'Education',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'sample-3',
    description: 'Campus Cafeteria Pass',
    amount: 65.50,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  }
];

const MyFinance = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Load transactions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('my_finance_transactions');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        setTransactions(INITIAL_TRANSACTIONS);
      }
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.setItem('my_finance_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    }
  }, []);

  // Sync to localStorage
  const saveTransactions = (newTransactions) => {
    setTransactions(newTransactions);
    localStorage.setItem('my_finance_transactions', JSON.stringify(newTransactions));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleAddTransaction = (newTx) => {
    const updated = [newTx, ...transactions];
    saveTransactions(updated);
    showToast('Transaction added successfully!');
  };

  const handleUpdateTransaction = (updatedTx) => {
    const updated = transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx);
    saveTransactions(updated);
    setEditingTransaction(null);
    showToast('Transaction updated successfully!');
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction record?')) {
      const updated = transactions.filter(tx => tx.id !== id);
      saveTransactions(updated);
      showToast('Transaction deleted!');
    }
  };

  const handleEditTransaction = (tx) => {
    setEditingTransaction(tx);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Compute live financial totals using Array.reduce
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + parseFloat(t.amount || 0), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + parseFloat(t.amount || 0), 0);

  const currentBalance = totalIncome - totalExpenses;

  // Filter transactions by search term and selected category using Array.filter
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container page-my-finance">
      {/* Page Header */}
      <header className="page-header">
        <div className="header-title-box">
          <div className="header-icon bg-amber">
            <Wallet size={28} />
          </div>
          <div>
            <h1 className="page-title">My Finance Budget Tracker</h1>
            <p className="page-subtitle">
              Manage your personal student income, track daily expense categories, and monitor live balance.
            </p>
          </div>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-notification flex items-center gap-2">
          <CheckCircle2 size={18} /> {toastMessage}
        </div>
      )}

      {/* Summary KPI Cards Grid */}
      <div className="kpi-cards-grid mb-8">
        <div className="kpi-card card-balance">
          <div className="kpi-icon-wrap bg-indigo">
            <DollarSign size={24} />
          </div>
          <div>
            <span className="kpi-label">Current Balance</span>
            <h3 className={`kpi-val ${currentBalance >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
              ${currentBalance.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="kpi-card card-income">
          <div className="kpi-icon-wrap bg-emerald">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="kpi-label">Total Income</span>
            <h3 className="kpi-val text-emerald-600">${totalIncome.toFixed(2)}</h3>
          </div>
        </div>

        <div className="kpi-card card-expenses">
          <div className="kpi-icon-wrap bg-rose">
            <TrendingDown size={24} />
          </div>
          <div>
            <span className="kpi-label">Total Expenses</span>
            <h3 className="kpi-val text-rose-600">${totalExpenses.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Form, Right List */}
      <div className="finance-tracker-grid">
        <div className="tracker-form-col">
          <TransactionForm
            onAddTransaction={handleAddTransaction}
            onUpdateTransaction={handleUpdateTransaction}
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
          />
        </div>

        <div className="tracker-list-col">
          <TransactionList
            transactions={filteredTransactions}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default MyFinance;
