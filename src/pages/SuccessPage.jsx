import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../utils/storage';

function SuccessPage() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const foundListing = getListingById(listingId);
    setListing(foundListing);

    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [listingId]);

  if (!listing) {
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h2>Listing Not Found</h2>
            <p>We couldn't find the listing you're looking for.</p>
            <Link to="/" className="primary-button">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      {showConfetti && (
        <div className="confetti-container" aria-hidden="true">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#e53238', '#0064d2', '#f5af02', '#86b817'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      )}

      <div className="success-container">
        <div className="success-header">
          <div className="success-icon">
            <span className="checkmark">✓</span>
          </div>
          <h1 id="success-title">Congratulations!</h1>
          <p className="success-subtitle">Your item has been listed successfully</p>
        </div>

        <div className="listing-confirmation-card" id="listing-confirmation">
          <div className="confirmation-image">
            {listing.images && listing.images.length > 0 ? (
              <img src={listing.images[0]} alt={listing.title} id="confirmation-image" />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>

          <div className="confirmation-details">
            <h2 className="confirmation-title" id="confirmation-title">{listing.title}</h2>

            <div className="confirmation-info">
              <div className="info-row">
                <span className="info-label">Listing ID:</span>
                <span className="info-value" id="confirmation-listing-id">{listing.id.slice(0, 8).toUpperCase()}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Price:</span>
                <span className="info-value price" id="confirmation-price">
                  ${parseFloat(listing.price || listing.startingBid).toFixed(2)}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">Category:</span>
                <span className="info-value" id="confirmation-category">{listing.categoryName}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Condition:</span>
                <span className="info-value" id="confirmation-condition">{listing.conditionName}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Quantity:</span>
                <span className="info-value" id="confirmation-quantity">{listing.quantity}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Shipping:</span>
                <span className="info-value" id="confirmation-shipping">
                  {listing.shippingName}
                  {listing.shippingPrice > 0 && ` ($${listing.shippingPrice.toFixed(2)})`}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">Listed:</span>
                <span className="info-value" id="confirmation-date">
                  {new Date(listing.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="listing-status">
              <span className="status-badge active">Active</span>
              <span className="status-text">Your listing is now live</span>
            </div>
          </div>
        </div>

        {/* Description Preview */}
        <div className="description-preview">
          <h3>Description</h3>
          <p id="confirmation-description">{listing.description}</p>
        </div>

        {/* Item Specifics */}
        {listing.itemSpecifics && Object.values(listing.itemSpecifics).some(v => v) && (
          <div className="specifics-preview">
            <h3>Item Specifics</h3>
            <div className="specifics-grid">
              {listing.itemSpecifics.brand && (
                <div className="specific-item">
                  <span className="specific-label">Brand:</span>
                  <span className="specific-value" id="confirmation-brand">{listing.itemSpecifics.brand}</span>
                </div>
              )}
              {listing.itemSpecifics.model && (
                <div className="specific-item">
                  <span className="specific-label">Model:</span>
                  <span className="specific-value" id="confirmation-model">{listing.itemSpecifics.model}</span>
                </div>
              )}
              {listing.itemSpecifics.color && (
                <div className="specific-item">
                  <span className="specific-label">Color:</span>
                  <span className="specific-value" id="confirmation-color">{listing.itemSpecifics.color}</span>
                </div>
              )}
              {listing.itemSpecifics.size && (
                <div className="specific-item">
                  <span className="specific-label">Size:</span>
                  <span className="specific-value" id="confirmation-size">{listing.itemSpecifics.size}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Photos */}
        {listing.images && listing.images.length > 1 && (
          <div className="photos-preview">
            <h3>All Photos ({listing.images.length})</h3>
            <div className="photos-grid">
              {listing.images.map((img, index) => (
                <div key={index} className="photo-item">
                  <img src={img} alt={`${listing.title} - Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="success-actions">
          <Link to="/sell" className="action-button primary" id="list-another-button">
            List Another Item
          </Link>
          <Link to="/listings" className="action-button secondary" id="view-listings-button">
            View My Listings
          </Link>
          <Link to="/" className="action-button tertiary" id="return-home-button">
            Return Home
          </Link>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>Tips for a Successful Sale</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">📸</span>
              <p>Add more photos to increase buyer confidence</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">💰</span>
              <p>Competitive pricing helps items sell faster</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📦</span>
              <p>Offer free shipping to attract more buyers</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">⭐</span>
              <p>Respond quickly to buyer questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
