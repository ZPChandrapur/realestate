import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { useProperties } from '../hooks/useProperties';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useRouter } from '../lib/router';
import type { ListingType, PropertyType, Furnishing, ConstructionStatus } from '../types';
import { LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS, FURNISHING_LABELS, CONSTRUCTION_STATUS_LABELS, CITIES } from '../types';

const BHK_OPTIONS = [1, 2, 3, 4, 5];

export default function ListingsPage() {
  const route = useRouter();
  const params = route.params;
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites(user?.id);

  const [showFilters, setShowFilters] = useState(false);

  const [listingType, setListingType] = useState<ListingType>((params.listing_type as ListingType) || 'buy');
  const [city, setCity] = useState(params.city || '');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>((params.property_type as PropertyType) || '');
  const [bhk, setBhk] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [furnishing, setFurnishing] = useState<Furnishing | ''>('');
  const [constructionStatus, setConstructionStatus] = useState<ConstructionStatus | ''>('');
  const [search, setSearch] = useState(params.search || '');

  const filters = useMemo(() => ({
    listing_type: listingType,
    city: city || undefined,
    property_type: propertyType || undefined,
    bhk: bhk || undefined,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    furnishing: furnishing || undefined,
    construction_status: constructionStatus || undefined,
    search: search || undefined,
  }), [listingType, city, propertyType, bhk, minPrice, maxPrice, furnishing, constructionStatus, search]);

  const { properties, loading, totalCount } = useProperties(filters);

  const clearFilters = () => {
    setCity('');
    setPropertyType('');
    setBhk(0);
    setMinPrice('');
    setMaxPrice('');
    setFurnishing('');
    setConstructionStatus('');
    setSearch('');
  };

  const activeFilterCount = [city, propertyType, bhk, minPrice, maxPrice, furnishing, constructionStatus, search].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
            {(['buy', 'rent', 'commercial', 'pg'] as ListingType[]).map((type) => (
              <button
                key={type}
                onClick={() => setListingType(type)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  listingType === type
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {LISTING_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by locality, project, or landmark..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                showFilters ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType | '')}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Property Type</option>
                {Object.entries(PROPERTY_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>

              <select
                value={bhk}
                onChange={(e) => setBhk(Number(e.target.value))}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={0}>BHK</option>
                {BHK_OPTIONS.map((b) => <option key={b} value={b}>{b} BHK</option>)}
              </select>

              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value as Furnishing | '')}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Furnishing</option>
                {Object.entries(FURNISHING_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>

              <select
                value={constructionStatus}
                onChange={(e) => setConstructionStatus(e.target.value as ConstructionStatus | '')}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Status</option>
                {Object.entries(CONSTRUCTION_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>

              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {loading ? 'Searching...' : `${totalCount} properties found`}
            {listingType && ` in ${LISTING_TYPE_LABELS[listingType]}`}
            {city && `, ${city}`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={isFavorite(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
            <button onClick={clearFilters} className="px-6 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
