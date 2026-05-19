import { Home, Building2, Users, TrendingUp, ArrowRight, Shield, Eye, BadgeCheck } from 'lucide-react';
import { Link } from '../lib/router';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import EMICalculator from '../components/EMICalculator';
import Footer from '../components/Footer';
import { useFeaturedProperties } from '../hooks/useProperties';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import type { ListingType } from '../types';

const CATEGORIES: { type: ListingType; label: string; desc: string; icon: React.ReactNode; color: string; bg: string }[] = [
  { type: 'buy', label: 'Buy', desc: 'Find your dream home to own', icon: <Home className="w-6 h-6" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { type: 'rent', label: 'Rent', desc: 'Rental homes across India', icon: <Building2 className="w-6 h-6" />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { type: 'commercial', label: 'Commercial', desc: 'Offices, shops & more', icon: <TrendingUp className="w-6 h-6" />, color: 'text-amber-600', bg: 'bg-amber-50' },
  { type: 'pg', label: 'PG/Co-Living', desc: 'Affordable shared spaces', icon: <Users className="w-6 h-6" />, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const FEATURED_CITIES = [
  { name: 'Mumbai', image: 'https://images.pexels.com/photos/1019506/pexels-photo-1019506.jpeg?auto=compress&cs=tinysrgb&w=400', count: '12,500+' },
  { name: 'Delhi', image: 'https://images.pexels.com/photos/5879635/pexels-photo-5879635.jpeg?auto=compress&cs=tinysrgb&w=400', count: '8,200+' },
  { name: 'Bangalore', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400', count: '9,800+' },
  { name: 'Hyderabad', image: 'https://images.pexels.com/photos/2660262/pexels-photo-2660262.jpeg?auto=compress&cs=tinysrgb&w=400', count: '6,300+' },
  { name: 'Pune', image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400', count: '5,700+' },
  { name: 'Chennai', image: 'https://images.pexels.com/photos/2449756/pexels-photo-2449756.jpeg?auto=compress&cs=tinysrgb&w=400', count: '4,900+' },
];

export default function HomePage() {
  const { properties: featured, loading: featuredLoading } = useFeaturedProperties();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites(user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.type}
              to={`/listings?listing_type=${cat.type}`}
              className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{cat.label}</h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-1">Handpicked listings for you</p>
          </div>
          <Link
            to="/listings?listing_type=buy"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={isFavorite(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No featured properties yet. Be the first to list!</p>
            <Link to="/post-property" className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              Post Property
            </Link>
          </div>
        )}
      </section>

      {/* Explore Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Explore Top Cities</h2>
        <p className="text-gray-500 mb-8">Discover properties in India's most sought-after locations</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURED_CITIES.map((city) => (
            <Link
              key={city.name}
              to={`/listings?listing_type=buy&city=${city.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{city.name}</h3>
                <p className="text-gray-300 text-xs">{city.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why HouseFinder + EMI Calculator */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Why HouseFinder?</h2>
              <p className="text-gray-500 mb-8">We make property hunting simple, transparent, and trustworthy.</p>
              <div className="space-y-6">
                {[
                  { icon: <BadgeCheck className="w-6 h-6" />, title: 'Verified Listings', desc: 'Every listing is verified by our team for authenticity and accuracy.' },
                  { icon: <Shield className="w-6 h-6" />, title: 'Secure Transactions', desc: 'End-to-end security for all your property dealings and data.' },
                  { icon: <Eye className="w-6 h-6" />, title: 'Virtual Tours', desc: 'Explore properties from the comfort of your home with detailed media.' },
                  { icon: <TrendingUp className="w-6 h-6" />, title: 'Price Trends', desc: 'AI-powered price insights to help you make informed decisions.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <EMICalculator />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
