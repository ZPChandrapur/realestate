import { useState } from 'react';
import { Search, MapPin, Home, Building2, Users } from 'lucide-react';
import { navigate } from '../lib/router';
import type { ListingType } from '../types';
import { CITIES } from '../types';

const TABS: { type: ListingType; label: string; icon: React.ReactNode }[] = [
  { type: 'buy', label: 'Buy', icon: <Home className="w-4 h-4" /> },
  { type: 'rent', label: 'Rent', icon: <Home className="w-4 h-4" /> },
  { type: 'commercial', label: 'Commercial', icon: <Building2 className="w-4 h-4" /> },
  { type: 'pg', label: 'PG/Co-Living', icon: <Users className="w-4 h-4" /> },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<ListingType>('buy');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('listing_type', activeTab);
    if (city) params.set('city', city);
    if (search) params.set('search', search);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-emerald-900/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Find Your Perfect <span className="text-emerald-400">Home</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover properties across India. From apartments to villas, commercial spaces to co-living -- your next home is just a search away.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-1 mb-4 bg-white/10 backdrop-blur-sm rounded-xl p-1">
            {TABS.map((tab) => (
              <button
                key={tab.type}
                onClick={() => setActiveTab(tab.type)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.type
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Select City</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="relative flex-[2]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by locality, project, or landmark..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
          <span className="flex items-center gap-1"><span className="text-emerald-400 font-semibold">50K+</span> Properties</span>
          <span className="flex items-center gap-1"><span className="text-emerald-400 font-semibold">15+</span> Cities</span>
          <span className="flex items-center gap-1"><span className="text-emerald-400 font-semibold">10K+</span> Verified Listings</span>
          <span className="flex items-center gap-1"><span className="text-emerald-400 font-semibold">5K+</span> Brokers</span>
        </div>
      </div>
    </section>
  );
}
