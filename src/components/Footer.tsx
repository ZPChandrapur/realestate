import { Home, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from '../lib/router';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">HouseFinder</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              India's trusted property portal. Find your dream home with verified listings across 15+ cities.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" /> +91 1800-123-4567
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
              <Mail className="w-4 h-4" /> support@housefinder.in
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buy" className="hover:text-emerald-400 transition-colors">Buy Property</Link></li>
              <li><Link to="/rent" className="hover:text-emerald-400 transition-colors">Rent Property</Link></li>
              <li><Link to="/commercial" className="hover:text-emerald-400 transition-colors">Commercial Space</Link></li>
              <li><Link to="/pg" className="hover:text-emerald-400 transition-colors">PG / Co-Living</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Top Cities</h3>
            <ul className="space-y-2 text-sm">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'].map((city) => (
                <li key={city}>
                  <Link to={`/listings?listing_type=buy&city=${city}`} className="hover:text-emerald-400 transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">About Us</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Careers</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Blog</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 HouseFinder. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" /> Made in India
          </div>
        </div>
      </div>
    </footer>
  );
}
