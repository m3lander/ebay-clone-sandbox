import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getListings, deleteListing, clearAllListings } from '../utils/storage';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = () => {
    const allListings = getListings();
    setListings(allListings.reverse()); // Most recent first
  };

  const handleDelete = (id) => {
    deleteListing(id);
    loadListings();
    setShowDeleteConfirm(null);
  };

  const handleClearAll = () => {
    clearAllListings();
    loadListings();
    setShowClearConfirm(false);
  };

  return (
    <div className="listings-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Listings</h1>
          <p>{listings.length} {listings.length === 1 ? 'listing' : 'listings'}</p>
        </div>
        <div className="header-actions">
          <Link to="/sell" className="primary-button" id="create-listing-button">
            Create New Listing
          </Link>
          {listings.length > 0 && (
            <button
              className="secondary-button danger"
              onClick={() => setShowClearConfirm(true)}
              id="clear-all-button"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No Listings Yet</h2>
          <p>Start selling by creating your first listing</p>
          <Link to="/sell" className="primary-button" id="start-selling-empty-button">
            Start Selling
          </Link>
        </div>
      ) : (
        <div className="listings-table-container">
          <table className="listings-table" id="listings-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Condition</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Listed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} data-listing-id={listing.id}>
                  <td className="image-cell">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="listing-thumbnail"
                      />
                    ) : (
                      <div className="no-image-thumb">No Image</div>
                    )}
                  </td>
                  <td className="title-cell">
                    <span className="listing-title-text">{listing.title}</span>
                    <span className="listing-id">ID: {listing.id.slice(0, 8).toUpperCase()}</span>
                  </td>
                  <td className="category-cell">{listing.categoryName}</td>
                  <td className="price-cell">
                    ${parseFloat(listing.price || listing.startingBid).toFixed(2)}
                  </td>
                  <td className="condition-cell">{listing.conditionName}</td>
                  <td className="quantity-cell">{listing.quantity}</td>
                  <td className="status-cell">
                    <span className={`status-badge ${listing.status}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="date-cell">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-icon-button delete"
                      onClick={() => setShowDeleteConfirm(listing.id)}
                      title="Delete listing"
                      aria-label="Delete listing"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Listings as Cards for Mobile */}
      {listings.length > 0 && (
        <div className="listings-cards" id="listings-cards">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-card-full" data-listing-id={listing.id}>
              <div className="card-image">
                {listing.images && listing.images.length > 0 ? (
                  <img src={listing.images[0]} alt={listing.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <span className={`card-status ${listing.status}`}>{listing.status}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{listing.title}</h3>
                <p className="card-category">{listing.categoryName}</p>
                <div className="card-details">
                  <span className="card-price">${parseFloat(listing.price || listing.startingBid).toFixed(2)}</span>
                  <span className="card-condition">{listing.conditionName}</span>
                </div>
                <div className="card-meta">
                  <span>Qty: {listing.quantity}</span>
                  <span>Listed: {new Date(listing.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="card-actions">
                  <button
                    className="delete-button"
                    onClick={() => setShowDeleteConfirm(listing.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Listing?</h3>
            <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="primary-button danger"
                onClick={() => handleDelete(showDeleteConfirm)}
                id="confirm-delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Clear All Listings?</h3>
            <p>Are you sure you want to delete all {listings.length} listings? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="primary-button danger"
                onClick={handleClearAll}
                id="confirm-clear-all-button"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
