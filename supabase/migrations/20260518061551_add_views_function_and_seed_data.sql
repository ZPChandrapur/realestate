/*
  # Add increment_views function and seed sample data

  1. Functions
    - `increment_views(property_id uuid)`: Increments the views_count of a property

  2. Data
    - Creates a demo auth user (demo@nestfinder.in) - profile auto-created by trigger
    - Inserts 20 sample properties across all listing types and cities
*/

-- Function to increment property views
CREATE OR REPLACE FUNCTION public.increment_views(property_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  UPDATE properties SET views_count = views_count + 1 WHERE id = property_id;
END;
$$;

-- Create demo user in auth.users (profile will be auto-created by trigger)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  '00000000-0000-0000-0000-000000000000',
  'demo@nestfinder.in',
  crypt('demo123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "NestFinder Demo", "mobile": "+91 98765 43210"}',
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Update profile if it already exists
INSERT INTO profiles (id, full_name, mobile)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'NestFinder Demo', '+91 98765 43210')
ON CONFLICT (id) DO UPDATE SET full_name = 'NestFinder Demo', mobile = '+91 98765 43210';

-- Seed sample properties
INSERT INTO properties (user_id, title, description, listing_type, property_type, bhk, price, area_sqft, city, locality, images, furnishing, construction_status, floor, total_floors, facing, parking, bathrooms, balcony, amenities, is_verified, is_featured, listed_by, views_count) VALUES

-- Buy properties
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '3 BHK Luxury Apartment in Whitefield', 'Spacious 3 BHK apartment with modern amenities in the heart of Whitefield. Close to IT parks, malls, and schools. Gated community with 24/7 security.', 'buy', 'apartment', 3, 9500000, 1650, 'Bangalore', 'Whitefield', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'semi-furnished', 'ready-to-move', 8, 15, 'East', 2, 2, 1, ARRAY['Gym', 'Swimming Pool', 'Security', 'Parking', 'Garden', 'Lift', 'Power Backup', 'Clubhouse'], true, true, 'builder', 245),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2 BHK Compact Home in Koramangala', 'Well-designed 2 BHK in prime Koramangala location. Walking distance to restaurants, cafes, and tech parks. Ideal for young professionals.', 'buy', 'apartment', 2, 6200000, 950, 'Bangalore', 'Koramangala', ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'unfurnished', 'ready-to-move', 4, 12, 'North', 1, 2, 1, ARRAY['Security', 'Lift', 'Power Backup', 'Parking'], true, true, 'owner', 189),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '4 BHK Villa in Jubilee Hills', 'Premium 4 BHK villa with private garden and pool in the prestigious Jubilee Hills area. Italian marble flooring, modular kitchen, and smart home features.', 'buy', 'villa', 4, 45000000, 3500, 'Hyderabad', 'Jubilee Hills', ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 0, 3, 'East', 3, 4, 2, ARRAY['Swimming Pool', 'Garden', 'Security', 'Gym', 'Parking', 'CCTV', 'Intercom', 'Rainwater Harvesting'], true, true, 'builder', 312),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '3 BHK Flat in Andheri West', 'Modern 3 BHK in Andheri West with excellent connectivity to Metro and Western Express Highway. Society with all modern amenities.', 'buy', 'apartment', 3, 18000000, 1400, 'Mumbai', 'Andheri West', ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'], 'semi-furnished', 'ready-to-move', 12, 22, 'West', 1, 2, 1, ARRAY['Gym', 'Security', 'Lift', 'Parking', 'Power Backup', 'Children Play Area'], true, false, 'broker', 156),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2 BHK Apartment in Greater Kailash', 'Elegant 2 BHK in the posh Greater Kailash area. Close to M Block market, metro station. Well-maintained society with power backup.', 'buy', 'apartment', 2, 22000000, 1100, 'Delhi', 'Greater Kailash', ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'semi-furnished', 'ready-to-move', 5, 10, 'South', 1, 2, 1, ARRAY['Security', 'Lift', 'Power Backup', 'Parking', 'Garden'], true, true, 'owner', 201),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Residential Plot in Hinjewadi', 'Prime residential plot in Hinjewadi Phase 2. Near IT parks. Clear title, RERA approved. Ideal for investment or building your dream home.', 'buy', 'plot', 0, 3500000, 2000, 'Pune', 'Hinjewadi', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'], 'unfurnished', 'new-launch', 0, 0, 'East', 0, 0, 0, ARRAY[]::text[], true, false, 'owner', 98),

-- Rent properties
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2 BHK for Rent in Indiranagar', 'Beautiful 2 BHK available for rent in the vibrant Indiranagar. Close to 100 Feet Road, cafes, and nightlife. Fully furnished with AC and washing machine.', 'rent', 'apartment', 2, 35000, 1100, 'Bangalore', 'Indiranagar', ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 3, 8, 'East', 1, 2, 1, ARRAY['AC', 'Washing Machine', 'Refrigerator', 'Wi-Fi', 'Security', 'Parking'], true, true, 'owner', 178),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1 BHK Studio in Bandra', 'Compact and stylish 1 BHK studio in Bandra West. Perfect for singles. Walking distance to Bandstand and Carter Road.', 'rent', 'apartment', 1, 28000, 550, 'Mumbai', 'Bandra West', ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 6, 15, 'West', 0, 1, 0, ARRAY['AC', 'Wi-Fi', 'Security', 'Lift'], true, false, 'owner', 134),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '3 BHK for Rent in HSR Layout', 'Spacious 3 BHK in HSR Layout Sector 2. Close to startups, cafes, and parks. Semi-furnished with modular kitchen.', 'rent', 'apartment', 3, 45000, 1600, 'Bangalore', 'HSR Layout', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'semi-furnished', 'ready-to-move', 4, 10, 'North', 2, 2, 1, ARRAY['Security', 'Parking', 'Power Backup', 'Lift', 'Water Purifier'], true, true, 'broker', 167),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2 BHK Rent in Gachibowli', 'Modern 2 BHK in Gachibowli with great views. Near IT corridor and financial district. Gated community with clubhouse.', 'rent', 'apartment', 2, 25000, 1200, 'Hyderabad', 'Gachibowli', ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'], 'semi-furnished', 'ready-to-move', 7, 14, 'East', 1, 2, 1, ARRAY['Gym', 'Swimming Pool', 'Security', 'Parking', 'Clubhouse', 'Lift'], true, false, 'owner', 143),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Independent House for Rent in Anna Nagar', 'Beautiful independent house in Anna Nagar. Spacious with private garden. Close to metro and shopping areas.', 'rent', 'house', 3, 55000, 2200, 'Chennai', 'Anna Nagar', ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'semi-furnished', 'ready-to-move', 0, 2, 'South', 2, 3, 0, ARRAY['Garden', 'Parking', 'Security', 'Power Backup'], true, true, 'owner', 112),

-- Commercial properties
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Office Space in BKC', 'Premium office space in Bandra Kurla Complex. Fully fitted with cabins, conference room, and reception. Ideal for MNCs and startups.', 'commercial', 'office', 0, 150000, 2500, 'Mumbai', 'BKC', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 10, 20, 'East', 5, 4, 0, ARRAY['AC', 'Wi-Fi', 'Power Backup', 'Lift', 'Security', 'CCTV', 'Parking', 'Fire Safety'], true, true, 'broker', 89),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Shop in Connaught Place', 'Ground floor shop in the iconic Connaught Place. High footfall area. Suitable for retail, F&B, or showroom.', 'commercial', 'shop', 0, 300000, 800, 'Delhi', 'Connaught Place', ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'unfurnished', 'ready-to-move', 0, 3, 'North', 0, 1, 0, ARRAY['Power Backup', 'Security', 'CCTV'], true, true, 'owner', 76),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Co-Working Space in Koramangala', 'Modern co-working space with hot desks, private cabins, and meeting rooms. High-speed internet, pantry, and 24/7 access.', 'commercial', 'coworking', 0, 12000, 150, 'Bangalore', 'Koramangala', ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 3, 5, 'East', 0, 2, 0, ARRAY['Wi-Fi', 'AC', 'Power Backup', 'Security', 'CCTV', 'Fire Safety'], true, false, 'broker', 65),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Office Space in Cyber City', 'Grade A office space in DLF Cyber City. Fully furnished with modern amenities. Pantry, reception, and conference rooms included.', 'commercial', 'office', 0, 200000, 3000, 'Gurgaon', 'Cyber City', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 8, 15, 'North', 10, 6, 0, ARRAY['AC', 'Wi-Fi', 'Power Backup', 'Lift', 'Security', 'CCTV', 'Parking', 'Fire Safety', 'Intercom'], true, true, 'builder', 102),

-- PG/Co-Living properties
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PG for Boys in Koramangala', 'Well-maintained PG for boys in Koramangala. AC rooms, Wi-Fi, meals included. Close to tech parks and metro.', 'pg', 'pg', 0, 10000, 150, 'Bangalore', 'Koramangala', ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 2, 4, 'East', 0, 2, 0, ARRAY['AC', 'Wi-Fi', 'Washing Machine', 'Refrigerator', 'Water Purifier', 'Security', 'Power Backup'], true, true, 'owner', 234),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Co-Living Space in HSR Layout', 'Premium co-living space with private rooms and shared common areas. Community events, gym, and rooftop lounge included.', 'pg', 'pg', 0, 15000, 200, 'Bangalore', 'HSR Layout', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 3, 5, 'North', 0, 2, 0, ARRAY['AC', 'Wi-Fi', 'Gym', 'Washing Machine', 'Refrigerator', 'Security', 'Power Backup', 'CCTV'], true, true, 'broker', 198),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PG for Girls in Powai', 'Safe and secure PG for girls in Powai. Near IIT Bombay and Hiranandani. AC, meals, laundry included.', 'pg', 'pg', 0, 12000, 120, 'Mumbai', 'Powai', ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 2, 5, 'East', 0, 2, 0, ARRAY['AC', 'Wi-Fi', 'Washing Machine', 'Refrigerator', 'Water Purifier', 'Security', 'CCTV', 'Power Backup'], true, false, 'owner', 167),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Co-Living in Noida Sector 62', 'Modern co-living space near Sector 62 metro. Fully furnished rooms with attached bathrooms. Community kitchen and lounge.', 'pg', 'pg', 0, 9000, 180, 'Noida', 'Sector 62', ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 4, 8, 'North', 0, 2, 0, ARRAY['AC', 'Wi-Fi', 'Washing Machine', 'Refrigerator', 'Security', 'Power Backup'], true, false, 'broker', 145),

-- More buy properties
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '5 BHK Penthouse in Worli', 'Luxury 5 BHK penthouse with panoramic sea views in Worli. Private terrace, Italian interiors, and concierge service.', 'buy', 'apartment', 5, 35000000, 4000, 'Mumbai', 'Worli', ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'], 'fully-furnished', 'ready-to-move', 30, 35, 'West', 3, 5, 2, ARRAY['Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Lift', 'Power Backup', 'Clubhouse', 'CCTV', 'Intercom', 'Jogging Track', 'Sports Facility'], true, true, 'builder', 287),

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '3 BHK in Viman Nagar', 'Affordable 3 BHK in Viman Nagar, Pune. Close to airport and Kalyani Nagar. Gated community with amenities.', 'buy', 'apartment', 3, 7500000, 1300, 'Pune', 'Viman Nagar', ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'], 'unfurnished', 'under-construction', 5, 12, 'East', 1, 2, 1, ARRAY['Gym', 'Security', 'Parking', 'Garden', 'Lift', 'Power Backup', 'Children Play Area'], true, false, 'builder', 87);
