import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, XCircle, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Food',
  'Education',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other'
];

const TransactionForm = ({ onAddTransaction, onUpdateTransaction, editingTransaction, onCancelEdit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description || '');
      setAmount(editingTransaction.amount?.toString() || '');
      setType(editingTransaction.type || 'expense');
      setCategory(editingTransaction.category || 'Food');
      setDate(editingTransaction.date || new Date().toISOString().split('T')[0]);
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = 'Description title is required.';
    } else if (description.trim().length < 2) {
      newErrors.description = 'Description must be at least 2 characters.';
    }

    if (!amount) {
      newErrors.amount = 'Amount is required.';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number greater than 0.';
    }

    if (!date) {
      newErrors.date = 'Valid date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const transactionData = {
      id: editingTransaction ? editingTransaction.id : Date.now().toString(),
      description: description.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      type,
      category: type === 'income' ? 'Income' : category,
      date
    };

    if (editingTransaction) {
      onUpdateTransaction(transactionData);
    } else {
      onAddTransaction(transactionData);
    }

    resetForm();
  };

  return (
    <div className="transaction-form-card">
      <div className="form-header">
        <h3 className="form-title flex items-center gap-2">
          {editingTransaction ? (
            <>
              <Save size={20} className="text-emerald-500" /> Edit Transaction
            </>
          ) : (
            <>
              <PlusCircle size={20} className="text-indigo-500" /> Add New Transaction
            </>
          )}
        </h3>
        {editingTransaction && (
          <button type="button" onClick={onCancelEdit} className="btn-cancel-sm flex items-center gap-1">
            <XCircle size={16} /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Transaction Type Radio Buttons */}
        <div className="type-toggle-group">
          <label className={`type-label ${type === 'expense' ? 'active-expense' : ''}`}>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            <span>Expense</span>
          </label>

          <label className={`type-label ${type === 'income' ? 'active-income' : ''}`}>
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            <span>Income</span>
          </label>
        </div>

        <div className="form-grid">
          {/* Description */}
          <div className="form-group span-full">
            <label htmlFor="tx-desc" className="form-label">
              Description <span className="req">*</span>
            </label>
            <input
              id="tx-desc"
              type="text"
              placeholder="e.g. Textbooks purchase, Stipend, Grocery shop"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              className={`form-input ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.description}
              </span>
            )}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="tx-amount" className="form-label">
              Amount ($) <span className="req">*</span>
            </label>
            <input
              id="tx-amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
              className={`form-input ${errors.amount ? 'input-error' : ''}`}
            />
            {errors.amount && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.amount}
              </span>
            )}
          </div>

          {/* Category */}
          {type === 'expense' ? (
            <div className="form-group">
              <label htmlFor="tx-category" className="form-label">
                Category <span className="req">*</span>
              </label>
              <select
                id="tx-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                disabled
                value="Income"
                className="form-input disabled-input"
              />
            </div>
          )}

          {/* Date */}
          <div className="form-group span-full">
            <label htmlFor="tx-date" className="form-label">
              Transaction Date <span className="req">*</span>
            </label>
            <input
              id="tx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary form-submit-btn">
          {editingTransaction ? 'Save Changes' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
