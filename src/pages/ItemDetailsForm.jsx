import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { conditions, shippingOptions, listingFormats } from '../data/categories';
import { saveDraft, getDraft } from '../utils/storage';

function ItemDetailsForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const existingDraft = getDraft();

  // Redirect if no category selected
  useEffect(() => {
    if (!existingDraft?.categoryId) {
      navigate('/sell');
    }
  }, [existingDraft, navigate]);

  const [formData, setFormData] = useState({
    title: existingDraft?.title || '',
    description: existingDraft?.description || '',
    condition: existingDraft?.condition || '',
    listingFormat: existingDraft?.listingFormat || 'buy-it-now',
    price: existingDraft?.price || '',
    startingBid: existingDraft?.startingBid || '',
    buyItNowPrice: existingDraft?.buyItNowPrice || '',
    quantity: existingDraft?.quantity || 1,
    shipping: existingDraft?.shipping || 'free',
    itemSpecifics: existingDraft?.itemSpecifics || {
      brand: '',
      model: '',
      color: '',
      size: ''
    }
  });

  const [images, setImages] = useState(existingDraft?.images || []);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleItemSpecificChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      itemSpecifics: {
        ...prev.itemSpecifics,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file =>
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB max
    );

    if (validFiles.length + images.length > 12) {
      setErrors(prev => ({ ...prev, images: 'Maximum 12 images allowed' }));
      return;
    }

    setIsLoading(true);

    // Simulate upload delay for realism
    setTimeout(() => {
      const newImages = validFiles.map(file => {
        return URL.createObjectURL(file);
      });

      setImages(prev => [...prev, ...newImages]);
      setIsLoading(false);
      setErrors(prev => ({ ...prev, images: null }));
    }, 500);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    } else if (formData.title.length > 80) {
      newErrors.title = 'Title must be 80 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.condition) {
      newErrors.condition = 'Please select a condition';
    }

    if (formData.listingFormat === 'buy-it-now' || formData.listingFormat === 'auction-bin') {
      if (!formData.price || parseFloat(formData.price) <= 0) {
        newErrors.price = 'Please enter a valid price';
      }
    }

    if (formData.listingFormat === 'auction' || formData.listingFormat === 'auction-bin') {
      if (!formData.startingBid || parseFloat(formData.startingBid) <= 0) {
        newErrors.startingBid = 'Please enter a valid starting bid';
      }
    }

    if (!formData.quantity || parseInt(formData.quantity) < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const draft = getDraft() || {};
      const conditionObj = conditions.find(c => c.id === formData.condition);
      const shippingObj = shippingOptions.find(s => s.id === formData.shipping);

      saveDraft({
        ...draft,
        ...formData,
        images,
        conditionName: conditionObj?.name || formData.condition,
        shippingName: shippingObj?.name || formData.shipping,
        shippingPrice: shippingObj?.price || 0
      });

      setIsLoading(false);
      navigate('/sell/review');
    }, 800);
  };

  return (
    <div className="item-details-page">
      <div className="page-header">
        <h1>Item Details</h1>
        <p>Category: <strong>{existingDraft?.categoryName}</strong></p>
      </div>

      <form onSubmit={handleSubmit} className="listing-form" id="listing-form">
        {/* Photos Section */}
        <section className="form-section">
          <h2>Photos</h2>
          <p className="section-description">Add up to 12 photos. The first photo will be your listing's main image.</p>

          <div
            ref={dropZoneRef}
            className={`image-dropzone ${isDragging ? 'dragging' : ''} ${errors.images ? 'error' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            id="image-dropzone"
          >
            <input
              ref={fileInputRef}
              type="file"
              id="image-upload"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              className="file-input-hidden"
              aria-label="Upload images"
            />
            <div className="dropzone-content">
              <span className="upload-icon">📷</span>
              <p className="dropzone-text">Drag and drop images here</p>
              <p className="dropzone-subtext">or click to browse</p>
              <button type="button" className="browse-button" id="browse-images-button">
                Add Photos
              </button>
            </div>
          </div>

          {errors.images && <p className="error-message" id="images-error">{errors.images}</p>}

          {images.length > 0 && (
            <div className="image-preview-grid" id="image-previews">
              {images.map((img, index) => (
                <div key={index} className="image-preview" data-image-index={index}>
                  <img src={img} alt={`Product image ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    aria-label={`Remove image ${index + 1}`}
                  >
                    ×
                  </button>
                  {index === 0 && <span className="main-image-badge">Main</span>}
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="upload-progress">
              <div className="progress-spinner"></div>
              <span>Uploading images...</span>
            </div>
          )}
        </section>

        {/* Title Section */}
        <section className="form-section">
          <h2>Title</h2>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Item Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title for your item"
              maxLength={80}
              aria-describedby="title-help title-error"
            />
            <div className="input-help" id="title-help">
              <span className="char-count">{formData.title.length}/80</span>
            </div>
            {errors.title && <p className="error-message" id="title-error">{errors.title}</p>}
          </div>
        </section>

        {/* Condition Section */}
        <section className="form-section">
          <h2>Condition</h2>
          <div className="form-group">
            <label htmlFor="condition" className="form-label">
              Item Condition <span className="required">*</span>
            </label>
            <select
              id="condition"
              name="condition"
              className={`form-select ${errors.condition ? 'error' : ''}`}
              value={formData.condition}
              onChange={handleInputChange}
              aria-describedby="condition-error"
            >
              <option value="">Select condition</option>
              {conditions.map(cond => (
                <option key={cond.id} value={cond.id}>
                  {cond.name}
                </option>
              ))}
            </select>
            {formData.condition && (
              <p className="condition-description">
                {conditions.find(c => c.id === formData.condition)?.description}
              </p>
            )}
            {errors.condition && <p className="error-message" id="condition-error">{errors.condition}</p>}
          </div>
        </section>

        {/* Description Section */}
        <section className="form-section">
          <h2>Description</h2>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Item Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item in detail. Include brand, size, color, condition, and any other relevant information."
              rows={6}
              aria-describedby="description-help description-error"
            />
            <div className="input-help" id="description-help">
              <span className="char-count">{formData.description.length} characters</span>
            </div>
            {errors.description && <p className="error-message" id="description-error">{errors.description}</p>}
          </div>
        </section>

        {/* Item Specifics Section */}
        <section className="form-section">
          <h2>Item Specifics</h2>
          <p className="section-description">Help buyers find your item by providing these details</p>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="brand" className="form-label">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="form-input"
                value={formData.itemSpecifics.brand}
                onChange={handleItemSpecificChange}
                placeholder="e.g., Apple, Nike, Samsung"
              />
            </div>
            <div className="form-group">
              <label htmlFor="model" className="form-label">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                className="form-input"
                value={formData.itemSpecifics.model}
                onChange={handleItemSpecificChange}
                placeholder="e.g., iPhone 15, Air Max"
              />
            </div>
            <div className="form-group">
              <label htmlFor="color" className="form-label">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                className="form-input"
                value={formData.itemSpecifics.color}
                onChange={handleItemSpecificChange}
                placeholder="e.g., Black, Blue, Red"
              />
            </div>
            <div className="form-group">
              <label htmlFor="size" className="form-label">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                className="form-input"
                value={formData.itemSpecifics.size}
                onChange={handleItemSpecificChange}
                placeholder="e.g., Large, 10.5, 256GB"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="form-section">
          <h2>Pricing</h2>

          <div className="form-group">
            <label className="form-label">Listing Format <span className="required">*</span></label>
            <div className="radio-group" id="listing-format-group">
              {listingFormats.map(format => (
                <label key={format.id} className="radio-label">
                  <input
                    type="radio"
                    name="listingFormat"
                    value={format.id}
                    checked={formData.listingFormat === format.id}
                    onChange={handleInputChange}
                    id={`format-${format.id}`}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-text">
                    <strong>{format.name}</strong>
                    <span className="radio-description">{format.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {(formData.listingFormat === 'buy-it-now' || formData.listingFormat === 'auction-bin') && (
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                {formData.listingFormat === 'auction-bin' ? 'Buy It Now Price' : 'Price'} <span className="required">*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className={`form-input price-input ${errors.price ? 'error' : ''}`}
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  aria-describedby="price-error"
                />
              </div>
              {errors.price && <p className="error-message" id="price-error">{errors.price}</p>}
            </div>
          )}

          {(formData.listingFormat === 'auction' || formData.listingFormat === 'auction-bin') && (
            <div className="form-group">
              <label htmlFor="startingBid" className="form-label">
                Starting Bid <span className="required">*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  id="startingBid"
                  name="startingBid"
                  className={`form-input price-input ${errors.startingBid ? 'error' : ''}`}
                  value={formData.startingBid}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  aria-describedby="startingBid-error"
                />
              </div>
              {errors.startingBid && <p className="error-message" id="startingBid-error">{errors.startingBid}</p>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Quantity <span className="required">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className={`form-input quantity-input ${errors.quantity ? 'error' : ''}`}
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
              max="999"
              aria-describedby="quantity-error"
            />
            {errors.quantity && <p className="error-message" id="quantity-error">{errors.quantity}</p>}
          </div>
        </section>

        {/* Shipping Section */}
        <section className="form-section">
          <h2>Shipping</h2>
          <div className="form-group">
            <label htmlFor="shipping" className="form-label">
              Shipping Option <span className="required">*</span>
            </label>
            <select
              id="shipping"
              name="shipping"
              className="form-select"
              value={formData.shipping}
              onChange={handleInputChange}
            >
              {shippingOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} {option.price !== null && option.price > 0 ? `($${option.price.toFixed(2)})` : option.price === 0 ? '(Free)' : ''}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/sell')}
            id="back-button"
          >
            Back
          </button>
          <button
            type="submit"
            className="primary-button"
            disabled={isLoading}
            id="continue-to-review-button"
          >
            {isLoading ? (
              <>
                <span className="button-spinner"></span>
                Processing...
              </>
            ) : (
              'Continue to Review'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemDetailsForm;
