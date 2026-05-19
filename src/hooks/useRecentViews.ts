import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Property } from '../types';

export function useRecentViews(userId: string | undefined) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProperties([]);
      setLoading(false);
      return;
    }
    supabase
      .from('recent_views')
      .select('property_id, properties(*)')
      .eq('user_id', userId)
      .order('viewed_at', { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!error && data) {
          setProperties(data.map((d: any) => d.properties).filter(Boolean));
        }
        setLoading(false);
      });
  }, [userId]);

  const trackView = async (propertyId: string) => {
    if (!userId) return;
    await supabase
      .from('recent_views')
      .upsert(
        { user_id: userId, property_id: propertyId, viewed_at: new Date().toISOString() },
        { onConflict: 'user_id,property_id' }
      );
  };

  return { properties, loading, trackView };
}
