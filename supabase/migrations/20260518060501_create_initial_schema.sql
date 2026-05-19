/*
  # Real Estate Platform - Initial Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `mobile` (text)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `listing_type` (text: 'buy', 'rent', 'commercial', 'pg')
      - `property_type` (text: 'apartment', 'house', 'villa', 'plot', 'office', 'shop', 'pg')
      - `bhk` (integer)
      - `price` (bigint)
      - `area_sqft` (integer)
      - `city` (text)
      - `locality` (text)
      - `address` (text)
      - `images` (text array)
      - `furnishing` (text: 'unfurnished', 'semi-furnished', 'fully-furnished')
      - `construction_status` (text: 'ready-to-move', 'under-construction', 'new-launch')
      - `floor` (integer)
      - `total_floors` (integer)
      - `facing` (text)
      - `parking` (integer)
      - `bathrooms` (integer)
      - `balcony` (integer)
      - `amenities` (text array)
      - `is_verified` (boolean)
      - `is_featured` (boolean)
      - `listed_by` (text: 'owner', 'broker', 'builder')
      - `views_count` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `property_id` (uuid, references properties)
      - `created_at` (timestamptz)
    - `property_inquiries`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `mobile` (text)
      - `message` (text)
      - `created_at` (timestamptz)
    - `recent_views`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `property_id` (uuid, references properties)
      - `viewed_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Profiles: users can read/update own data
    - Properties: anyone can read, authenticated users can insert/update own, delete own
    - Favorites: users can manage own favorites
    - Property inquiries: users can create own inquiries, property owners can read inquiries for their properties
    - Recent views: users can manage own views

  3. Indexes
    - properties: listing_type, city, property_type, is_featured
    - favorites: user_id, property_id (unique composite)
    - recent_views: user_id, property_id (unique composite)
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  mobile text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  listing_type text NOT NULL CHECK (listing_type IN ('buy', 'rent', 'commercial', 'pg')),
  property_type text NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'plot', 'office', 'shop', 'pg', 'coworking')),
  bhk integer DEFAULT 0,
  price bigint NOT NULL DEFAULT 0,
  area_sqft integer DEFAULT 0,
  city text NOT NULL DEFAULT '',
  locality text DEFAULT '',
  address text DEFAULT '',
  images text[] DEFAULT '{}',
  furnishing text DEFAULT 'unfurnished' CHECK (furnishing IN ('unfurnished', 'semi-furnished', 'fully-furnished')),
  construction_status text DEFAULT 'ready-to-move' CHECK (construction_status IN ('ready-to-move', 'under-construction', 'new-launch')),
  floor integer DEFAULT 0,
  total_floors integer DEFAULT 0,
  facing text DEFAULT '',
  parking integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  balcony integer DEFAULT 0,
  amenities text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  listed_by text DEFAULT 'owner' CHECK (listed_by IN ('owner', 'broker', 'builder')),
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read properties"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow unauthenticated users to read properties (for browsing)
CREATE POLICY "Public can read properties"
  ON properties FOR SELECT
  TO anon
  USING (true);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Property inquiries table
CREATE TABLE IF NOT EXISTS property_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  mobile text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own inquiries"
  ON property_inquiries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own inquiries"
  ON property_inquiries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Property owners can read inquiries for their properties"
  ON property_inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_inquiries.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Recent views table
CREATE TABLE IF NOT EXISTS recent_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

ALTER TABLE recent_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own recent views"
  ON recent_views FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recent views"
  ON recent_views FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own recent views"
  ON recent_views FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_recent_views_user_id ON recent_views(user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, mobile)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger for auto profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
