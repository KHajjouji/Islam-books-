import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Loader2, Users, Mail } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-noor-cream">
        <Loader2 className="h-8 w-8 animate-spin text-noor-green" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-noor-cream px-4 text-center">
        <h1 className="text-3xl font-serif font-bold text-noor-dark mb-4">Admin Access Required</h1>
        <p className="text-noor-dark/70 mb-8">You must be logged in as an administrator to view this page.</p>
        <div className="flex gap-4">
          {!user && (
            <button 
              onClick={signInWithGoogle}
              className="px-6 py-3 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
            >
              Sign In with Google
            </button>
          )}
          <Link to="/" className="px-6 py-3 bg-white text-noor-dark border border-noor-light-green font-bold rounded-full hover:bg-stone-50 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Packs', path: '/admin/packs', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Campaigns', path: '/admin/campaigns', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-noor-dark text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="text-2xl font-serif font-bold text-noor-yellow">NoorKids Admin</Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-noor-green text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-4 text-sm text-white/50 truncate">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-rose-400 hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
