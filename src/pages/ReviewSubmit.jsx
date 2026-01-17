import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getDraft, clearDraft, saveListing } from '../utils/storage';
import { listingFormats } from '../data/categories';

function ReviewSubmit() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const existingDraft = getDraft();
    if (!existingDraft?.title) {
      navigate('/sell');
      return;
    }
    setDraft(existingDraft);
  }, [navigate]);

  const handleEdit = (section) => {
    navigate('/sell/details');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate server processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const listingId = uuidv4();
    const listing = {
      id: listingId,
      ...draft,
      createdAt: new Date().toISOString(),
      status: 'active',
      views: 0,
      watchers: 0
    };

    saveListing(listing);
    clearDraft();

    navigate(`/sell/success/${listingId}`);
  };

  const nextImage = () => {
    if (draft?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % draft.images.length);
    }
  };

  const prevImage = () => {
    if (draft?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + draft.images.length) % draft.images.length);
    }
  };

  if (!draft) {
    return (
      <div className="loading-page">
        <div className="progress-spinner large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const formatObj = listingFormats.find(f => f.id === draft.listingFormat);

  return (
    <div className="review-page">
      <div className="page-header">
        <h1>Review Your Listing</h1>
        <p>Please review your listing details before submitting</p>
      </div>

      <div className="review-container">
        {/* Listing Preview */}
        <div className="listing-preview-card">
          <div className="preview-header">
            <h2>Listing Preview</h2>
          </div>

          <div className="preview-content">
            {/* Image Gallery */}
            <div className="preview-gallery">
              {draft.images && draft.images.length > 0 ? (
                <>
                  <div className="main-preview-image">
                    <img
                      src={draft.images[currentImageIndex]}
                      alt={`${draft.title} - Image ${currentImageIndex + 1}`}
                      id="preview-main-image"
                    />
                    {draft.images.length > 1 && (
                      <>
                        <button
                          className="gallery-nav prev"
                          onClick={prevImage}
                          type="button"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>
                        <button
                          className="gallery-nav next"
                          onClick={nextImage}
                          type="button"
                          aria-label="Next image"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  <div className="thumbnail-strip">
                    {draft.images.map((img, index) => (
                      <button
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        type="button"
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-image-placeholder">No images</div>
              )}
            </div>

            {/* Listing Info */}
            <div className="preview-info">
              <h3 className="preview-title" id="preview-title">{draft.title}</h3>

              <div className="preview-price-section">
                {(draft.listingFormat === 'buy-it-now' || draft.listingFormat === 'auction-bin') && (
                  <div className="preview-price" id="preview-price">
                    ${parseFloat(draft.price).toFixed(2)}
                    {draft.listingFormat === 'auction-bin' && (
                      <span className="buy-it-now-badge">Buy It Now</span>
                    )}
                  </div>
                )}
                {(draft.listingFormat === 'auction' || draft.listingFormat === 'auction-bin') && (
                  <div className="preview-bid">
                    Starting bid: <span id="preview-starting-bid">${parseFloat(draft.startingBid).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="preview-condition">
                <span className="label">Condition:</span>
                <span className="value" id="preview-condition">{draft.conditionName}</span>
              </div>

              <div className="preview-quantity">
                <span className="label">Quantity:</span>
                <span className="value" id="preview-quantity">{draft.quantity} available</span>
              </div>

              <div className="preview-shipping">
                <span className="label">Shipping:</span>
                <span className="value" id="preview-shipping">
                  {draft.shippingName}
                  {draft.shippingPrice > 0 && ` ($${draft.shippingPrice.toFixed(2)})`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Sections */}
        <div className="review-sections">
          {/* Category */}
          <div className="review-section">
            <div className="section-header">
              <h3>Category</h3>
              <button
                type="button"
                className="edit-link"
                onClick={() => navigate('/sell')}
                id="edit-category-button"
              >
                Edit
              </button>
            </div>
            <div className="section-content">
              <p id="review-category">{draft.categoryName}</p>
            </div>
          </div>

          {/* Title & Description */}
          <div className="review-section">
            <div className="section-header">
              <h3>Title & Description</h3>
              <button
                type="button"
                className="edit-link"
                onClick={() => handleEdit('title')}
                id="edit-title-button"
              >
                Edit
              </button>
            </div>
            <div className="section-content">
              <div className="review-field">
                <span className="field-label">Title:</span>
                <span className="field-value" id="review-title">{draft.title}</span>
              </div>
              <div className="review-field">
                <span className="field-label">Description:</span>
                <p className="field-value description" id="review-description">{draft.description}</p>
              </div>
            </div>
          </div>

          {/* Item Specifics */}
          {draft.itemSpecifics && Object.values(draft.itemSpecifics).some(v => v) && (
            <div className="review-section">
              <div className="section-header">
                <h3>Item Specifics</h3>
                <button
                  type="button"
                  className="edit-link"
                  onClick={() => handleEdit('specifics')}
                  id="edit-specifics-button"
                >
                  Edit
                </button>
              </div>
              <div className="section-content specifics-grid">
                {draft.itemSpecifics.brand && (
                  <div className="review-field">
                    <span className="field-label">Brand:</span>
                    <span className="field-value" id="review-brand">{draft.itemSpecifics.brand}</span>
                  </div>
                )}
                {draft.itemSpecifics.model && (
                  <div className="review-field">
                    <span className="field-label">Model:</span>
                    <span className="field-value" id="review-model">{draft.itemSpecifics.model}</span>
                  </div>
                )}
                {draft.itemSpecifics.color && (
                  <div className="review-field">
                    <span className="field-label">Color:</span>
                    <span className="field-value" id="review-color">{draft.itemSpecifics.color}</span>
                  </div>
                )}
                {draft.itemSpecifics.size && (
                  <div className="review-field">
                    <span className="field-label">Size:</span>
                    <span className="field-value" id="review-size">{draft.itemSpecifics.size}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pricing & Format */}
          <div className="review-section">
            <div className="section-header">
              <h3>Pricing & Format</h3>
              <button
                type="button"
                className="edit-link"
                onClick={() => handleEdit('pricing')}
                id="edit-pricing-button"
              >
                Edit
              </button>
            </div>
            <div className="section-content">
              <div className="review-field">
                <span className="field-label">Format:</span>
                <span className="field-value" id="review-format">{formatObj?.name || draft.listingFormat}</span>
              </div>
              {(draft.listingFormat === 'buy-it-now' || draft.listingFormat === 'auction-bin') && (
                <div className="review-field">
                  <span className="field-label">Price:</span>
                  <span className="field-value" id="review-price">${parseFloat(draft.price).toFixed(2)}</span>
                </div>
              )}
              {(draft.listingFormat === 'auction' || draft.listingFormat === 'auction-bin') && (
                <div className="review-field">
                  <span className="field-label">Starting Bid:</span>
                  <span className="field-value" id="review-starting-bid">${parseFloat(draft.startingBid).toFixed(2)}</span>
                </div>
              )}
              <div className="review-field">
                <span className="field-label">Quantity:</span>
                <span className="field-value" id="review-quantity">{draft.quantity}</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="review-section">
            <div className="section-header">
              <h3>Shipping</h3>
              <button
                type="button"
                className="edit-link"
                onClick={() => handleEdit('shipping')}
                id="edit-shipping-button"
              >
                Edit
              </button>
            </div>
            <div className="section-content">
              <div className="review-field">
                <span className="field-label">Shipping Option:</span>
                <span className="field-value" id="review-shipping">
                  {draft.shippingName}
                  {draft.shippingPrice > 0 && ` - $${draft.shippingPrice.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="review-section">
            <div className="section-header">
              <h3>Photos ({draft.images?.length || 0})</h3>
              <button
                type="button"
                className="edit-link"
                onClick={() => handleEdit('photos')}
                id="edit-photos-button"
              >
                Edit
              </button>
            </div>
            <div className="section-content">
              <div className="review-photos-grid">
                {draft.images?.map((img, index) => (
                  <div key={index} className="review-photo">
                    <img src={img} alt={`Photo ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="submit-section">
          <div className="fee-summary">
            <h3>Fee Summary</h3>
            <div className="fee-line">
              <span>Insertion fee:</span>
              <span className="fee-value">$0.00</span>
            </div>
            <div className="fee-line">
              <span>Final value fee (on sale):</span>
              <span className="fee-value">~13%</span>
            </div>
            <div className="fee-total">
              <span>Total to pay now:</span>
              <span className="fee-value">$0.00</span>
            </div>
          </div>

          <div className="submit-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate('/sell/details')}
              disabled={isSubmitting}
              id="back-to-details-button"
            >
              Back to Edit
            </button>
            <button
              type="button"
              className="primary-button submit-listing-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              id="submit-listing-button"
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner"></span>
                  Submitting...
                </>
              ) : (
                'List Item for Sale'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSubmit;
