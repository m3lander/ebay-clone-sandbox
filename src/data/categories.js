// eBay-like category hierarchy
export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    subcategories: [
      {
        id: 'cell-phones',
        name: 'Cell Phones & Smartphones',
        subcategories: [
          { id: 'iphone', name: 'Apple iPhone' },
          { id: 'samsung', name: 'Samsung Galaxy' },
          { id: 'google-pixel', name: 'Google Pixel' },
          { id: 'other-phones', name: 'Other Smartphones' }
        ]
      },
      {
        id: 'computers',
        name: 'Computers & Tablets',
        subcategories: [
          { id: 'laptops', name: 'Laptops & Netbooks' },
          { id: 'desktops', name: 'Desktop Computers' },
          { id: 'tablets', name: 'Tablets & eReaders' },
          { id: 'monitors', name: 'Monitors' }
        ]
      },
      {
        id: 'cameras',
        name: 'Cameras & Photo',
        subcategories: [
          { id: 'digital-cameras', name: 'Digital Cameras' },
          { id: 'camera-lenses', name: 'Lenses & Filters' },
          { id: 'camera-accessories', name: 'Camera Accessories' }
        ]
      },
      {
        id: 'video-games',
        name: 'Video Games & Consoles',
        subcategories: [
          { id: 'consoles', name: 'Video Game Consoles' },
          { id: 'games', name: 'Video Games' },
          { id: 'gaming-accessories', name: 'Gaming Accessories' }
        ]
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Clothing, Shoes & Accessories',
    icon: '👕',
    subcategories: [
      {
        id: 'mens-clothing',
        name: "Men's Clothing",
        subcategories: [
          { id: 'mens-shirts', name: 'Shirts' },
          { id: 'mens-pants', name: 'Pants' },
          { id: 'mens-jackets', name: 'Coats & Jackets' },
          { id: 'mens-suits', name: 'Suits & Blazers' }
        ]
      },
      {
        id: 'womens-clothing',
        name: "Women's Clothing",
        subcategories: [
          { id: 'womens-dresses', name: 'Dresses' },
          { id: 'womens-tops', name: 'Tops & Blouses' },
          { id: 'womens-pants', name: 'Pants & Leggings' },
          { id: 'womens-jackets', name: 'Coats & Jackets' }
        ]
      },
      {
        id: 'shoes',
        name: 'Shoes',
        subcategories: [
          { id: 'mens-shoes', name: "Men's Shoes" },
          { id: 'womens-shoes', name: "Women's Shoes" },
          { id: 'kids-shoes', name: "Kids' Shoes" }
        ]
      }
    ]
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    icon: '🏠',
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        subcategories: [
          { id: 'sofas', name: 'Sofas & Couches' },
          { id: 'tables', name: 'Tables' },
          { id: 'chairs', name: 'Chairs' },
          { id: 'beds', name: 'Beds & Bed Frames' }
        ]
      },
      {
        id: 'kitchen',
        name: 'Kitchen, Dining & Bar',
        subcategories: [
          { id: 'cookware', name: 'Cookware' },
          { id: 'small-appliances', name: 'Small Kitchen Appliances' },
          { id: 'dinnerware', name: 'Dinnerware & Serveware' }
        ]
      },
      {
        id: 'tools',
        name: 'Tools & Workshop Equipment',
        subcategories: [
          { id: 'power-tools', name: 'Power Tools' },
          { id: 'hand-tools', name: 'Hand Tools' },
          { id: 'tool-storage', name: 'Tool Storage' }
        ]
      }
    ]
  },
  {
    id: 'sporting-goods',
    name: 'Sporting Goods',
    icon: '⚽',
    subcategories: [
      {
        id: 'outdoor-sports',
        name: 'Outdoor Sports',
        subcategories: [
          { id: 'cycling', name: 'Cycling' },
          { id: 'camping', name: 'Camping & Hiking' },
          { id: 'fishing', name: 'Fishing' }
        ]
      },
      {
        id: 'fitness',
        name: 'Fitness, Running & Yoga',
        subcategories: [
          { id: 'cardio-equipment', name: 'Cardio Equipment' },
          { id: 'strength-training', name: 'Strength Training' },
          { id: 'yoga-pilates', name: 'Yoga & Pilates' }
        ]
      },
      {
        id: 'team-sports',
        name: 'Team Sports',
        subcategories: [
          { id: 'basketball', name: 'Basketball' },
          { id: 'soccer', name: 'Soccer' },
          { id: 'baseball', name: 'Baseball & Softball' }
        ]
      }
    ]
  },
  {
    id: 'collectibles',
    name: 'Collectibles & Art',
    icon: '🎨',
    subcategories: [
      {
        id: 'collectibles-memorabilia',
        name: 'Collectibles',
        subcategories: [
          { id: 'trading-cards', name: 'Trading Cards' },
          { id: 'coins', name: 'Coins & Paper Money' },
          { id: 'stamps', name: 'Stamps' },
          { id: 'sports-memorabilia', name: 'Sports Memorabilia' }
        ]
      },
      {
        id: 'art',
        name: 'Art',
        subcategories: [
          { id: 'paintings', name: 'Paintings' },
          { id: 'prints', name: 'Art Prints' },
          { id: 'sculptures', name: 'Sculptures' }
        ]
      },
      {
        id: 'antiques',
        name: 'Antiques',
        subcategories: [
          { id: 'antique-furniture', name: 'Furniture' },
          { id: 'antique-decor', name: 'Decorative Arts' },
          { id: 'antique-jewelry', name: 'Jewelry' }
        ]
      }
    ]
  },
  {
    id: 'motors',
    name: 'Motors',
    icon: '🚗',
    subcategories: [
      {
        id: 'auto-parts',
        name: 'Auto Parts & Accessories',
        subcategories: [
          { id: 'car-parts', name: 'Car & Truck Parts' },
          { id: 'car-electronics', name: 'Car Electronics' },
          { id: 'wheels-tires', name: 'Wheels, Tires & Parts' }
        ]
      },
      {
        id: 'motorcycles',
        name: 'Motorcycles',
        subcategories: [
          { id: 'motorcycle-parts', name: 'Motorcycle Parts' },
          { id: 'motorcycle-accessories', name: 'Accessories & Gear' }
        ]
      }
    ]
  }
];

export const conditions = [
  { id: 'new', name: 'New', description: 'A brand-new, unused item in its original packaging' },
  { id: 'open-box', name: 'Open Box', description: 'An item in excellent condition with original packaging opened' },
  { id: 'refurbished', name: 'Certified Refurbished', description: 'Professionally restored to working order' },
  { id: 'used-like-new', name: 'Used - Like New', description: 'In perfect working condition with no signs of wear' },
  { id: 'used-good', name: 'Used - Good', description: 'Shows some signs of wear but works perfectly' },
  { id: 'used-acceptable', name: 'Used - Acceptable', description: 'Shows wear and may have minor cosmetic damage' },
  { id: 'for-parts', name: 'For Parts or Not Working', description: 'Not in working condition, for parts only' }
];

export const shippingOptions = [
  { id: 'free', name: 'Free Shipping', price: 0 },
  { id: 'standard', name: 'Standard Shipping', price: 5.99 },
  { id: 'expedited', name: 'Expedited Shipping', price: 12.99 },
  { id: 'express', name: 'Express Shipping (1-2 days)', price: 24.99 },
  { id: 'local-pickup', name: 'Local Pickup Only', price: 0 },
  { id: 'calculated', name: 'Calculated (based on buyer location)', price: null }
];

export const listingFormats = [
  { id: 'buy-it-now', name: 'Buy It Now', description: 'Fixed price listing' },
  { id: 'auction', name: 'Auction', description: 'Buyers bid on your item' },
  { id: 'auction-bin', name: 'Auction with Buy It Now', description: 'Auction with optional instant purchase' }
];

// Flatten categories for search/selection
export const flattenCategories = (cats, parent = null, level = 0) => {
  let result = [];
  for (const cat of cats) {
    result.push({
      ...cat,
      parent,
      level,
      fullPath: parent ? `${parent.fullPath} > ${cat.name}` : cat.name
    });
    if (cat.subcategories) {
      result = result.concat(flattenCategories(cat.subcategories, { ...cat, fullPath: parent ? `${parent.fullPath} > ${cat.name}` : cat.name }, level + 1));
    }
  }
  return result;
};

export const getCategoryPath = (categoryId, cats = categories) => {
  for (const cat of cats) {
    if (cat.id === categoryId) {
      return [cat];
    }
    if (cat.subcategories) {
      const subPath = getCategoryPath(categoryId, cat.subcategories);
      if (subPath.length > 0) {
        return [cat, ...subPath];
      }
    }
  }
  return [];
};
