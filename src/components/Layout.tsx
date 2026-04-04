import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, BookOpen, ShoppingCart, User, LogOut, Search, Bell, HelpCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const navLinks = [
    { path: '/shop', label: t('nav.shop') },
    { path: '/academy', label: t('nav.academy') },
    { path: '/quran-stories-for-kids', label: t('nav.quran') },
    { path: '/stories-of-the-prophets-for-kids', label: t('nav.prophets') },
    { path: '/blog', label: t('nav.blog') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-body">
      {/* TopNavBar Shell */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf9f6]/80 backdrop-blur-md shadow-[0_10px_30px_rgba(30,86,49,0.05)] h-20">
        <div className="flex justify-between items-center px-8 h-full max-w-[1440px] mx-auto">
          <Link to="/" className="text-2xl font-black text-primary font-headline tracking-tight">
            The Illuminated Path
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-primary">
            <Link 
              to="/" 
              className={`${location.pathname === '/' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-primary-fixed-variant/70 hover:text-primary transition-all'}`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`${location.pathname === '/shop' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-primary-fixed-variant/70 hover:text-primary transition-all'}`}
            >
              Books
            </Link>
            <Link 
              to="/quran-stories-for-kids" 
              className={`${location.pathname === '/quran-stories-for-kids' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-primary-fixed-variant/70 hover:text-primary transition-all'}`}
            >
              Quran Stories
            </Link>
            <Link 
              to="/academy" 
              className={`${location.pathname === '/academy' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-primary-fixed-variant/70 hover:text-primary transition-all'}`}
            >
              Academy
            </Link>
            <Link 
              to="/stories-of-the-prophets-for-kids" 
              className={`${location.pathname === '/stories-of-the-prophets-for-kids' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-primary-fixed-variant/70 hover:text-primary transition-all'}`}
            >
              Prophet Stories
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
              <Search className="text-primary h-5 w-5" />
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32" 
                placeholder="Search..." 
                type="text"
              />
            </div>
            
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-surface-container-high transition-all text-primary">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link to="/dashboard" className="p-2 rounded-full hover:bg-surface-container-high transition-all text-primary">
                <User className="h-6 w-6" />
              </Link>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="p-2 rounded-full hover:bg-surface-container-high transition-all text-primary"
              >
                <User className="h-6 w-6" />
              </button>
            )}

            <Link to="/academy" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline font-bold text-sm hover:scale-95 transition-transform hidden sm:block">
              Join the Academy
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-primary p-2"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-t border-outline-variant/30 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/shop', label: 'Books' },
                { path: '/quran-stories-for-kids', label: 'Quran Stories' },
                { path: '/academy', label: 'Academy' },
                { path: '/stories-of-the-prophets-for-kids', label: 'Prophet Stories' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold ${
                    location.pathname === link.path
                      ? 'bg-surface-container-low text-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-outline-variant/30 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to="/dashboard" className="px-4 py-3 text-on-surface-variant font-bold">Dashboard</Link>
                    <button onClick={signOut} className="px-4 py-3 text-on-surface-variant font-bold text-left">Sign Out</button>
                  </>
                ) : (
                  <button 
                    onClick={signInWithGoogle}
                    className="w-full py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/10"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Shell */}
      <footer className="bg-[#f4f3f1] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-primary/10 pb-16">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-bold text-primary mb-6 block font-headline">The Illuminated Path</span>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Nurturing hearts through stories. We create premium Islamic educational resources for the modern Muslim family.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:text-secondary transition-colors cursor-pointer shadow-sm">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:text-secondary transition-colors cursor-pointer shadow-sm">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:text-secondary transition-colors cursor-pointer shadow-sm">
                  <HelpCircle className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Explore</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link to="/authors" className="hover:text-secondary transition-colors">Our Authors</Link></li>
                <li><Link to="/academy" className="hover:text-secondary transition-colors">Academy Login</Link></li>
                <li><Link to="/resources" className="hover:text-secondary transition-colors">Free Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><Link to="/shipping" className="hover:text-secondary transition-colors">Shipping Policy</Link></li>
                <li><Link to="/dashboard" className="hover:text-secondary transition-colors">Parent Dashboard</Link></li>
                <li><Link to="/wholesale" className="hover:text-secondary transition-colors">Wholesale</Link></li>
                <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Academy</h4>
              <div className="bg-primary/5 p-6 rounded-xl">
                <p className="text-xs text-on-surface-variant mb-4">Give the gift of knowledge. Academy gift cards available now.</p>
                <Link to="/gift-cards" className="text-primary font-bold text-sm flex items-center gap-2">
                  Buy Gift Card <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-on-surface-variant/60 font-body">
            <p>© {new Date().getFullYear()} The Illuminated Path. Nurturing hearts through stories.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
