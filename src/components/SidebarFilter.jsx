import React from 'react';
import './SidebarFilter.css';

const SidebarFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRanges,
  selectedPriceRange,
  setSelectedPriceRange,
  disabled = false
}) => {
  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h4>Filter by Category</h4>
        <ul className="filter-list">
          {categories.map((category, idx) => (
            <li
              key={idx}
              onClick={() => !disabled && setSelectedCategory(category)}
              className={
                "filter-item" +
                (selectedCategory === category ? ' active' : '') +
                (disabled ? ' disabled' : '')
              }
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4>Filter by Price</h4>
        <ul className="filter-list">
          {priceRanges.map((range, idx) => (
            <li
              key={idx}
              onClick={() => !disabled && setSelectedPriceRange(range)}
              className={
                "filter-item" +
                (selectedPriceRange === range ? ' active' : '') +
                (disabled ? ' disabled' : '')
              }
            >
              {range}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarFilter;
