export type ListingType = 'buy' | 'rent' | 'commercial' | 'pg';
export type PropertyType = 'apartment' | 'house' | 'villa' | 'plot' | 'office' | 'shop' | 'pg' | 'coworking';
export type Furnishing = 'unfurnished' | 'semi-furnished' | 'fully-furnished';
export type ConstructionStatus = 'ready-to-move' | 'under-construction' | 'new-launch';
export type ListedBy = 'owner' | 'broker' | 'builder';

export interface Property {
  id: string;
  user_id: string;
  title: string;
  description: string;
  listing_type: ListingType;
  property_type: PropertyType;
  bhk: number;
  price: number;
  area_sqft: number;
  city: string;
  locality: string;
  address: string;
  images: string[];
  furnishing: Furnishing;
  construction_status: ConstructionStatus;
  floor: number;
  total_floors: number;
  facing: string;
  parking: number;
  bathrooms: number;
  balcony: number;
  amenities: string[];
  is_verified: boolean;
  is_featured: boolean;
  listed_by: ListedBy;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  mobile: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface PropertyInquiry {
  id: string;
  property_id: string;
  user_id: string;
  name: string;
  mobile: string;
  message: string;
  created_at: string;
}

export interface RecentView {
  id: string;
  user_id: string;
  property_id: string;
  viewed_at: string;
}

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  buy: 'Buy',
  rent: 'Rent',
  commercial: 'Commercial',
  pg: 'PG/Co-Living',
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Apartment',
  house: 'House',
  villa: 'Villa',
  plot: 'Plot',
  office: 'Office',
  shop: 'Shop',
  pg: 'PG/Co-Living',
  coworking: 'Co-Working',
};

export const FURNISHING_LABELS: Record<Furnishing, string> = {
  unfurnished: 'Unfurnished',
  'semi-furnished': 'Semi-Furnished',
  'fully-furnished': 'Fully Furnished',
};

export const CONSTRUCTION_STATUS_LABELS: Record<ConstructionStatus, string> = {
  'ready-to-move': 'Ready to Move',
  'under-construction': 'Under Construction',
  'new-launch': 'New Launch',
};

export const LISTED_BY_LABELS: Record<ListedBy, string> = {
  owner: 'Owner',
  broker: 'Broker',
  builder: 'Builder',
};

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida',
  'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Indore',
];

export const AMENITIES_LIST = [
  'Swimming Pool', 'Gym', 'Power Backup', 'Security',
  'Parking', 'Garden', 'Clubhouse', 'Lift', 'Wi-Fi',
  'AC', 'Washing Machine', 'Refrigerator', 'Water Purifier',
  'CCTV', 'Intercom', 'Rainwater Harvesting', 'Jogging Track',
  'Children Play Area', 'Sports Facility', 'Fire Safety',
];
