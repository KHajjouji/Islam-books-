import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Loader2, Users, Mail, CreditCard, ShieldCheck, Bell, FileText, LayoutTemplate } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="text-3xl font-headline font-black text-primary mb-4 tracking-tight">Admin Access Required</h1>
        <p className="text-primary/60 mb-8 font-medium">You must be logged in as an administrator to view this page.</p>
        <div className="flex gap-4">
          {!user && (
            <button 
              onClick={signInWithGoogle}
              className="px-8 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/10"
            >
              Sign In with Google
            </button>
          )}
          <Link to="/" className="px-8 py-4 bg-white text-primary border-2 border-primary/10 font-black rounded-full hover:bg-primary/5 transition-all">
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
    { name: 'Pages', path: '/admin/pages', icon: LayoutTemplate },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Packs', path: '/admin/packs', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Campaigns', path: '/admin/campaigns', icon: Mail },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
    { name: 'Blog & SEO', path: '/admin/blog', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background flex font-body">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-primary text-white flex flex-col z-50 shadow-2xl">
        <div className="p-8 mb-4">
          <Link to="/admin" className="flex items-center gap-3 text-2xl font-headline font-black text-secondary tracking-tight">
            <div className="bg-secondary text-primary p-2 rounded-2xl shadow-lg shadow-secondary/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span>Noor Admin</span>
          </Link>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-3 ml-1">Management Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                  isActive
                    ? 'bg-secondary text-primary shadow-xl shadow-secondary/10 scale-[1.02]'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <Link 
            to="/dashboard"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white/60 hover:bg-white/10 hover:text-white transition-all font-bold text-sm"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Parent Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col">
        {/* TopNavBar */}
        <header className="h-24 bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-outline-variant/10 px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-headline font-black text-primary">
              {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/5 transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-4 pl-8 border-l border-outline-variant/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black font-headline text-primary leading-none mb-1">{user.displayName || 'Admin'}</p>
                <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">System Administrator</p>
              </div>
              <div className="relative group">
                <img 
                  src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'} 
                  alt="Admin Avatar" 
                  className="w-12 h-12 rounded-2xl object-cover shadow-md border-2 border-white group-hover:border-secondary transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <button 
                onClick={handleSignOut}
                className="p-3 rounded-2xl hover:bg-red-50 text-red-400 hover:text-red-600 transition-all"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-10 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
