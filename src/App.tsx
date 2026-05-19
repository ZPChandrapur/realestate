import { useRouter } from './lib/router';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import RecentViewsPage from './pages/RecentViewsPage';
import PostPropertyPage from './pages/PostPropertyPage';
import MyPropertiesPage from './pages/MyPropertiesPage';

function App() {
  const route = useRouter();

  const renderPage = () => {
    const path = route.path;

    if (path === '/' || path === '') return <HomePage />;
    if (path === '/buy') return <ListingsPage />;
    if (path === '/rent') return <ListingsPage />;
    if (path === '/commercial') return <ListingsPage />;
    if (path === '/pg') return <ListingsPage />;
    if (path === '/listings') return <ListingsPage />;
    if (path.startsWith('/property/')) return <PropertyDetailPage />;
    if (path === '/login') return <LoginPage />;
    if (path === '/register') return <RegisterPage />;
    if (path === '/profile') return <ProfilePage />;
    if (path === '/favorites') return <FavoritesPage />;
    if (path === '/recent') return <RecentViewsPage />;
    if (path === '/post-property') return <PostPropertyPage />;
    if (path === '/my-properties') return <MyPropertiesPage />;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Page not found</h2>
          <a href="#/" className="text-emerald-600 hover:underline">Go Home</a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderPage()}
    </div>
  );
}

export default App;
