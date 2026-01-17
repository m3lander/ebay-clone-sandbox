import { Link } from 'react-router-dom';
import { getListings } from '../utils/storage';

function HomePage() {
  const listings = getListings();
  const recentListings = listings.slice(-4).reverse();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to eBay Sandbox</h1>
          <p className="hero-subtitle">Test your browser automation agents in a realistic eBay-like environment</p>
          <Link to="/sell" className="sell-button-large" id="sell-button">
            Start Selling
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Test Environment Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Realistic Forms</h3>
            <p>Standard HTML form elements with clear IDs and labels for easy automation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h3>Image Upload</h3>
            <p>Drag-and-drop and file picker support for product images</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Category Selection</h3>
            <p>Nested category hierarchy matching eBay's structure</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Local Storage</h3>
            <p>Listings persist locally for testing and verification</p>
          </div>
        </div>
      </section>

      {recentListings.length > 0 && (
        <section className="recent-listings-section">
          <h2>Recent Listings</h2>
          <div className="listings-grid">
            {recentListings.map(listing => (
              <div key={listing.id} className="listing-card">
                <div className="listing-image">
                  {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt={listing.title} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="listing-info">
                  <h4 className="listing-title">{listing.title}</h4>
                  <p className="listing-price">${listing.price.toFixed(2)}</p>
                  <p className="listing-condition">{listing.conditionName}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/listings" className="view-all-link">View All Listings</Link>
        </section>
      )}

      <section className="quick-start-section">
        <h2>Quick Start Guide</h2>
        <div className="guide-steps">
          <div className="guide-step">
            <span className="step-number">1</span>
            <p>Click <strong>"Start Selling"</strong> to begin the listing flow</p>
          </div>
          <div className="guide-step">
            <span className="step-number">2</span>
            <p>Select a <strong>category</strong> for your item</p>
          </div>
          <div className="guide-step">
            <span className="step-number">3</span>
            <p>Fill in <strong>item details</strong> and upload images</p>
          </div>
          <div className="guide-step">
            <span className="step-number">4</span>
            <p><strong>Review</strong> and submit your listing</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
