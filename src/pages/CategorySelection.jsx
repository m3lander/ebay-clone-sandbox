import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { saveDraft, getDraft } from '../utils/storage';

function CategorySelection() {
  const navigate = useNavigate();
  const existingDraft = getDraft();

  const [selectedPath, setSelectedPath] = useState(
    existingDraft?.categoryPath || []
  );
  const [searchQuery, setSearchQuery] = useState('');

  const getCurrentOptions = () => {
    if (selectedPath.length === 0) {
      return categories;
    }
    let current = categories;
    for (const cat of selectedPath) {
      const found = current.find(c => c.id === cat.id);
      if (found && found.subcategories) {
        current = found.subcategories;
      } else {
        return [];
      }
    }
    return current;
  };

  const handleCategorySelect = (category) => {
    const newPath = [...selectedPath, category];
    setSelectedPath(newPath);
  };

  const handleBreadcrumbClick = (index) => {
    setSelectedPath(selectedPath.slice(0, index));
  };

  const canContinue = selectedPath.length >= 2;
  const currentOptions = getCurrentOptions();

  const handleContinue = () => {
    if (canContinue) {
      const draft = getDraft() || {};
      saveDraft({
        ...draft,
        categoryPath: selectedPath,
        categoryId: selectedPath[selectedPath.length - 1].id,
        categoryName: selectedPath.map(c => c.name).join(' > ')
      });
      navigate('/sell/details');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredCategories = () => {
    if (!searchQuery.trim()) return null;

    const results = [];
    const searchLower = searchQuery.toLowerCase();

    const searchInCategories = (cats, path = []) => {
      for (const cat of cats) {
        const currentPath = [...path, cat];
        if (cat.name.toLowerCase().includes(searchLower)) {
          results.push({
            category: cat,
            path: currentPath,
            fullPath: currentPath.map(c => c.name).join(' > ')
          });
        }
        if (cat.subcategories) {
          searchInCategories(cat.subcategories, currentPath);
        }
      }
    };

    searchInCategories(categories);
    return results.slice(0, 10);
  };

  const searchResults = getFilteredCategories();

  const handleSearchResultClick = (result) => {
    setSelectedPath(result.path);
    setSearchQuery('');
  };

  return (
    <div className="category-selection-page">
      <div className="page-header">
        <h1>Select a Category</h1>
        <p>Choose the category that best describes your item</p>
      </div>

      <div className="search-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            id="category-search"
            name="category-search"
            className="search-input"
            placeholder="Search for a category..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search categories"
          />
          <span className="search-icon">🔍</span>
        </div>

        {searchResults && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <button
                key={`${result.category.id}-${index}`}
                className="search-result-item"
                onClick={() => handleSearchResultClick(result)}
                type="button"
              >
                <span className="result-name">{result.category.name}</span>
                <span className="result-path">{result.fullPath}</span>
              </button>
            ))}
          </div>
        )}

        {searchResults && searchResults.length === 0 && searchQuery && (
          <div className="search-no-results">
            No categories found for "{searchQuery}"
          </div>
        )}
      </div>

      {selectedPath.length > 0 && (
        <nav className="breadcrumb" aria-label="Category breadcrumb">
          <button
            className="breadcrumb-item"
            onClick={() => handleBreadcrumbClick(0)}
            type="button"
          >
            All Categories
          </button>
          {selectedPath.map((cat, index) => (
            <span key={cat.id}>
              <span className="breadcrumb-separator">&gt;</span>
              <button
                className={`breadcrumb-item ${index === selectedPath.length - 1 ? 'active' : ''}`}
                onClick={() => handleBreadcrumbClick(index + 1)}
                type="button"
              >
                {cat.name}
              </button>
            </span>
          ))}
        </nav>
      )}

      <div className="categories-container">
        {currentOptions.length > 0 ? (
          <div className="category-grid" id="category-list">
            {currentOptions.map(category => (
              <button
                key={category.id}
                id={`category-${category.id}`}
                className="category-card"
                onClick={() => handleCategorySelect(category)}
                data-category-id={category.id}
                data-category-name={category.name}
                type="button"
              >
                {category.icon && <span className="category-icon">{category.icon}</span>}
                <span className="category-name">{category.name}</span>
                {category.subcategories && (
                  <span className="category-arrow">›</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="category-selected-final">
            <div className="selected-category-display">
              <span className="check-icon">✓</span>
              <span>Category selected: <strong>{selectedPath.map(c => c.name).join(' > ')}</strong></span>
            </div>
          </div>
        )}
      </div>

      <div className="action-bar">
        <div className="selected-info">
          {selectedPath.length > 0 && (
            <p>
              Selected: <strong id="selected-category-display">{selectedPath.map(c => c.name).join(' > ')}</strong>
            </p>
          )}
        </div>
        <button
          id="continue-button"
          className={`continue-button ${canContinue ? '' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!canContinue}
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CategorySelection;
