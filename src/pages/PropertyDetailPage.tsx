import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin, Maximize, BedDouble, Bath, Car, Building2, Phone, CheckCircle, Calendar, Eye } from 'lucide-react';
import { useRouter, navigate } from '../lib/router';
import { useProperty } from '../hooks/useProperties';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentViews } from '../hooks/useRecentViews';
import { formatPrice, formatArea, timeAgo, getPropertyImage, cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { LISTING_TYPE_LABELS, LISTED_BY_LABELS, FURNISHING_LABELS, CONSTRUCTION_STATUS_LABELS } from '../types';
import Footer from '../components/Footer';
import EMICalculator from '../components/EMICalculator';

export default function PropertyDetailPage() {
  const route = useRouter();
  const id = route.params.id;
  const { property, loading } = useProperty(id);
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites(user?.id);
  const { trackView } = useRecentViews(user?.id);

  const [currentImage, setCurrentImage] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMobile, setInquiryMobile] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  useEffect(() => {
    if (property && user) {
      trackView(property.id);
    }
  }, [property?.id, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Property not found</h2>
          <button onClick={() => navigate('/')} className="text-emerald-600 hover:underline">Go Home</button>
        </div>
      </div>
    );
  }

  const images = property.images.length > 0 ? property.images : [getPropertyImage(property)];
  const favorite = isFavorite(property.id);

  const handleInquiry = async () => {
    if (!user || !inquiryName || !inquiryMobile) return;
    setInquiryLoading(true);
    try {
      const { error } = await supabase
        .from('property_inquiries')
        .insert({
          property_id: property.id,
          user_id: user.id,
          name: inquiryName,
          mobile: inquiryMobile,
          message: inquiryMessage,
        });
      if (!error) {
        setInquirySent(true);
      }
    } catch (e) {}
    setInquiryLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src={images[currentImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        i === currentImage ? 'bg-white' : 'bg-white/50'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg">
                {LISTING_TYPE_LABELS[property.listing_type]}
              </span>
              {property.is_verified && (
                <span className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-emerald-700 text-sm font-medium rounded-lg">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              )}
            </div>
            <button
              onClick={() => toggleFavorite(property.id)}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
            >
              <Heart className={cn('w-5 h-5', favorite ? 'fill-red-500 text-red-500' : 'text-gray-600')} />
            </button>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    'flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors',
                    i === currentImage ? 'border-emerald-500' : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{property.locality}, {property.city}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700">
                    {formatPrice(property.price, property.listing_type)}
                  </p>
                  <p className="text-sm text-gray-500">{formatArea(property.area_sqft)}</p>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.bhk > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <BedDouble className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-gray-500">BHK</p>
                      <p className="font-semibold text-gray-900">{property.bhk}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Maximize className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="font-semibold text-gray-900">{formatArea(property.area_sqft)}</p>
                  </div>
                </div>
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Bath className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-gray-500">Bathrooms</p>
                      <p className="font-semibold text-gray-900">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.floor > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-gray-500">Floor</p>
                      <p className="font-semibold text-gray-900">{property.floor}/{property.total_floors}</p>
                    </div>
                  </div>
                )}
                {property.parking > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Car className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-gray-500">Parking</p>
                      <p className="font-semibold text-gray-900">{property.parking}</p>
                    </div>
                  </div>
                )}
                {property.balcony > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-gray-500">Balcony</p>
                      <p className="font-semibold text-gray-900">{property.balcony}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Furnishing</p>
                  <p className="text-sm font-medium text-gray-900">{FURNISHING_LABELS[property.furnishing]}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">{CONSTRUCTION_STATUS_LABELS[property.construction_status]}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Listed By</p>
                  <p className="text-sm font-medium text-gray-900">{LISTED_BY_LABELS[property.listed_by]}</p>
                </div>
                {property.facing && (
                  <div>
                    <p className="text-xs text-gray-500">Facing</p>
                    <p className="text-sm font-medium text-gray-900">{property.facing}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description || 'No description provided.'}</p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMI Calculator */}
            {property.listing_type === 'buy' && (
              <EMICalculator />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{LISTED_BY_LABELS[property.listed_by]}</p>
                  <p className="text-sm text-gray-500">{timeAgo(property.created_at)}</p>
                </div>
              </div>

              {user ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowInquiry(true)}
                    className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Contact Owner
                  </button>
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={cn(
                      'w-full py-3 border font-medium rounded-xl transition-colors flex items-center justify-center gap-2',
                      favorite
                        ? 'border-red-200 text-red-600 bg-red-50'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Heart className={cn('w-4 h-4', favorite && 'fill-red-500')} />
                    {favorite ? 'Saved' : 'Save Property'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Login to contact the owner</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Login to Contact
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                {property.views_count} views
              </div>
            </div>

            {/* Inquiry Modal */}
            {showInquiry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                  {inquirySent ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Inquiry Sent!</h3>
                      <p className="text-gray-500 text-sm mb-4">The property owner will contact you soon.</p>
                      <button onClick={() => setShowInquiry(false)} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Done
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="tel"
                          value={inquiryMobile}
                          onChange={(e) => setInquiryMobile(e.target.value)}
                          placeholder="Mobile Number"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <textarea
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                          placeholder="Message (optional)"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowInquiry(false)}
                            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleInquiry}
                            disabled={!inquiryName || !inquiryMobile || inquiryLoading}
                            className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            {inquiryLoading ? 'Sending...' : 'Send Inquiry'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
