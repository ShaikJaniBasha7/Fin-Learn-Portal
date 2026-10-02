import React from 'react';
import { Search, Filter, Edit, Trash2, ArrowUpRight, ArrowDownRight, Inbox } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Food',
  'Education',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other'
];

const TransactionList = ({
  transactions,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onEditTransaction,
  onDeleteTransaction
}) => {
  return (
    <div className="transaction-list-card">
      <div className="list-controls-header">
        <h3 className="list-title">Transaction History</h3>

        <div className="filters-row">
          {/* Search Box */}
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-box">
            <Filter className="filter-icon" size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="filter-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <Inbox size={48} className="empty-icon text-gray-400" />
          <h4>No Transactions Found</h4>
          <p>Try clearing filters or add your first transaction using the form.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const isIncome = tx.type === 'income';
                return (
                  <tr key={tx.id} className="tx-row">
                    <td>
                      <span className={`type-badge ${isIncome ? 'badge-income' : 'badge-expense'}`}>
                        {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {isIncome ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="tx-desc-cell">{tx.description}</td>
                    <td>
                      <span className="cat-chip">{tx.category}</span>
                    </td>
                    <td className="tx-date-cell">{tx.date}</td>
                    <td className={`tx-amount-cell text-right ${isIncome ? 'amount-income' : 'amount-expense'}`}>
                      {isIncome ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}
                    </td>
                    <td>
                      <div className="action-buttons-cell">
                        <button
                          onClick={() => onEditTransaction(tx)}
                          className="btn-action btn-edit"
                          title="Edit transaction"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteTransaction(tx.id)}
                          className="btn-action btn-delete"
                          title="Delete transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
