import React from 'react';
import '../../Assests/CSS/audit-logs.css';

export const SearchFilters = ({ onSearch, onFilterAction, onFilterDate, onClearFilters, currentFilters }) => {
  return (
    <div className="search-filters">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search logs by user, action, or details..."
          value={currentFilters.search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search logs"
        />
      </div>
      
      <div className="filter-group">
        <select
          className="filter-select action-filter"
          value={currentFilters.action}
          onChange={(e) => onFilterAction(e.target.value)}
          aria-label="Filter by action"
        >
          <option value="">All Actions</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
          <option value="create_invoice">Create Invoice</option>
          <option value="update_invoice">Update Invoice</option>
          <option value="delete_invoice">Delete Invoice</option>
        </select>

        <div className="date-filter">
          <input
            type="date"
            className="date-input"
            value={currentFilters.startDate}
            onChange={(e) => onFilterDate(e.target.value, currentFilters.endDate)}
            aria-label="Start date"
          />
          <span className="date-separator">to</span>
          <input
            type="date"
            className="date-input"
            value={currentFilters.endDate}
            onChange={(e) => onFilterDate(currentFilters.startDate, e.target.value)}
            aria-label="End date"
          />
        </div>

        <button
          className="clear-filter-button"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;