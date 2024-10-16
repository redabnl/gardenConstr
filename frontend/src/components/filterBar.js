import React from 'react';

const FilterBar = ({ categories, setFilter }) => {
  return (
    <div className="filter-bar">
      {categories.map((category, index) => (
        <button 
          key={index} 
          onClick={() => setFilter(category)}
          className="filter-button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
