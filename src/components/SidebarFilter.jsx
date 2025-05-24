import React from 'react';

const SidebarFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="sidebar">
      <h4>Filter by Category</h4>
      <ul>
        <li onClick={() => setSelectedCategory('All')} className={selectedCategory === 'All' ? 'active' : ''}>All</li>
        {categories.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarFilter;
