import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Favorite, Property } from '../types';

export function useFavorites(userId: string | undefined) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritePropertyIds, setFavoritePropertyIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!userId) {
      setFavorites([]);
      setFavoritePropertyIds(new Set());
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setFavorites(data);
      setFavoritePropertyIds(new Set(data.map((f) => f.property_id)));
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (propertyId: string) => {
    if (!userId) return;
    if (favoritePropertyIds.has(propertyId)) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);
      if (!error) {
        setFavoritePropertyIds((prev) => {
          const next = new Set(prev);
          next.delete(propertyId);
          return next;
        });
      }
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, property_id: propertyId });
      if (!error) {
        setFavoritePropertyIds((prev) => {
          const next = new Set(prev);
          next.add(propertyId);
          return next;
        });
      }
    }
  };

  const isFavorite = (propertyId: string) => favoritePropertyIds.has(propertyId);

  return { favorites, favoritePropertyIds, loading, toggleFavorite, isFavorite, refetch: fetchFavorites };
}

export function useFavoriteProperties(userId: string | undefined) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProperties([]);
      setLoading(false);
      return;
    }
    supabase
      .from('favorites')
      .select('property_id, properties(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setProperties(data.map((d: any) => d.properties).filter(Boolean));
        }
        setLoading(false);
      });
  }, [userId]);

  return { properties, loading };
}
