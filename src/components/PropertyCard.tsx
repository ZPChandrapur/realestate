import { Heart, MapPin, Maximize, BedDouble, CheckCircle, Building2 } from 'lucide-react';
import { Link } from '../lib/router';
import { formatPrice, formatArea, timeAgo, getPropertyImage, cn } from '../lib/utils';
import type { Property } from '../types';
import { LISTING_TYPE_LABELS, LISTED_BY_LABELS } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  showFavorite?: boolean;
}

export default function PropertyCard({ property, isFavorite, onToggleFavorite, showFavorite = true }: PropertyCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link to={`/property/${property.id}`}>
          <img
            src={getPropertyImage(property)}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-medium rounded-lg shadow">
            {LISTING_TYPE_LABELS[property.listing_type]}
          </span>
          {property.is_verified && (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-medium rounded-lg shadow">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          )}
          {property.is_featured && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-medium rounded-lg shadow">
              Featured
            </span>
          )}
        </div>
        {showFavorite && onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
          >
            <Heart className={cn('w-4 h-4', isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500')} />
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
          <p className="text-2xl font-bold text-white">
            {formatPrice(property.price, property.listing_type)}
          </p>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/property/${property.id}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{property.locality}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {property.bhk > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-4 h-4 text-gray-400" />
              {property.bhk} BHK
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-gray-400" />
            {formatArea(property.area_sqft)}
          </span>
          {property.furnishing !== 'unfurnished' && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
              {property.furnishing === 'semi-furnished' ? 'Semi' : 'Furnished'}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Building2 className="w-3.5 h-3.5" />
            {LISTED_BY_LABELS[property.listed_by]}
          </div>
          <span className="text-xs text-gray-400">{timeAgo(property.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
