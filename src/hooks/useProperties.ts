import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Property, ListingType } from '../types';

interface PropertyFilters {
  listing_type?: ListingType;
  city?: string;
  property_type?: string;
  bhk?: number;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  furnishing?: string;
  construction_status?: string;
  search?: string;
}

export function useProperties(filters: PropertyFilters = {}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters.listing_type) {
      query = query.eq('listing_type', filters.listing_type);
    }
    if (filters.city) {
      query = query.eq('city', filters.city);
    }
    if (filters.property_type) {
      query = query.eq('property_type', filters.property_type);
    }
    if (filters.bhk) {
      query = query.eq('bhk', filters.bhk);
    }
    if (filters.min_price !== undefined) {
      query = query.gte('price', filters.min_price);
    }
    if (filters.max_price !== undefined) {
      query = query.lte('price', filters.max_price);
    }
    if (filters.min_area !== undefined) {
      query = query.gte('area_sqft', filters.min_area);
    }
    if (filters.max_area !== undefined) {
      query = query.lte('area_sqft', filters.max_area);
    }
    if (filters.furnishing) {
      query = query.eq('furnishing', filters.furnishing);
    }
    if (filters.construction_status) {
      query = query.eq('construction_status', filters.construction_status);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,locality.ilike.%${filters.search}%,city.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, count, error } = await query;
    if (!error && data) {
      setProperties(data);
      setTotalCount(count ?? 0);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, totalCount, refetch: fetchProperties };
}

export function useProperty(id: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data) {
          setProperty(data);
          supabase.rpc('increment_views', { property_id: id }).then(() => {});
        }
        setLoading(false);
      });
  }, [id]);

  return { property, loading };
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('properties')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(8)
      .then(({ data, error }) => {
        if (!error && data) setProperties(data);
        setLoading(false);
      });
  }, []);

  return { properties, loading };
}
