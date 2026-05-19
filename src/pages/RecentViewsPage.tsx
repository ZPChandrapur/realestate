import { Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRecentViews } from '../hooks/useRecentViews';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { navigate } from '../lib/router';

export default function RecentViewsPage() {
  const { user } = useAuth();
  const { properties, loading } = useRecentViews(user?.id);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Recently Viewed</h1>
        <p className="text-gray-500 mb-6">Properties you've recently looked at</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No recently viewed properties</h3>
            <p className="text-gray-500 mb-4">Properties you view will appear here</p>
            <button onClick={() => navigate('/buy')} className="px-6 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              Browse Properties
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
