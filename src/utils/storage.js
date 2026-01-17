// Local storage utilities for persisting listings

const LISTINGS_KEY = 'ebay_clone_listings';
const DRAFT_KEY = 'ebay_clone_draft';

export const getListings = () => {
  try {
    const listings = localStorage.getItem(LISTINGS_KEY);
    return listings ? JSON.parse(listings) : [];
  } catch (error) {
    console.error('Error reading listings from storage:', error);
    return [];
  }
};

export const saveListing = (listing) => {
  try {
    const listings = getListings();
    listings.push(listing);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
    return true;
  } catch (error) {
    console.error('Error saving listing:', error);
    return false;
  }
};

export const getListingById = (id) => {
  const listings = getListings();
  return listings.find(listing => listing.id === id);
};

export const deleteListing = (id) => {
  try {
    const listings = getListings().filter(listing => listing.id !== id);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
    return true;
  } catch (error) {
    console.error('Error deleting listing:', error);
    return false;
  }
};

export const clearAllListings = () => {
  localStorage.removeItem(LISTINGS_KEY);
};

// Draft management for the listing flow
export const saveDraft = (draft) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch (error) {
    console.error('Error saving draft:', error);
    return false;
  }
};

export const getDraft = () => {
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error reading draft:', error);
    return null;
  }
};

export const clearDraft = () => {
  localStorage.removeItem(DRAFT_KEY);
};
