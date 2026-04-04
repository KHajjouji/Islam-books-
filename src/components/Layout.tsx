import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, BookOpen, ShoppingCart, User, LogOut, Search, Bell, HelpCircle } from 'lucide-react';
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
      {/* TopNavBar */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-2xl font-headline font-extrabold text-primary tracking-tight">
                <div className="bg-primary text-white p-1.5 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span>Noor & Nurture</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-all hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-outline-variant/30">
                <button 
                  onClick={toggleLanguage}
                  className="p-2 rounded-full hover:bg-surface-low transition-colors text-on-surface-variant"
                  aria-label="Toggle Language"
                >
                  <Globe className="h-5 w-5" />
                </button>
                
                <Link 
                  to="/cart"
                  className="p-2 rounded-full hover:bg-surface-low transition-colors text-on-surface-variant relative"
                  aria-label="View Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-accent text-secondary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {user ? (
                  <div className="flex items-center gap-3">
                    <Link 
                      to="/dashboard"
                      className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-surface-low hover:bg-outline-variant/20 transition-all border border-outline-variant/20"
                    >
                      <img 
                        src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold font-headline">{user.displayName?.split(' ')[0] || 'Parent'}</span>
                    </Link>
                    <button 
                      onClick={signOut}
                      className="p-2 rounded-full hover:bg-surface-low transition-colors text-on-surface-variant"
                      title="Sign Out"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={signInWithGoogle}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/10"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <Link to="/cart" className="relative p-2 text-on-surface-variant">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-secondary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-on-surface-variant p-2"
              >
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-t border-outline-variant/30 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold ${
                    location.pathname === link.path
                      ? 'bg-surface-low text-primary'
                      : 'text-on-surface-variant hover:bg-surface-low'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-outline-variant/30 flex flex-col gap-3">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-3 px-4 py-3 text-on-surface-variant font-bold"
                >
                  <Globe className="h-5 w-5" />
                  <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
                </button>
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
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface-low border-t border-outline-variant/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-2xl font-headline font-extrabold text-primary mb-6">
                <div className="bg-primary text-white p-1.5 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span>Noor & Nurture</span>
              </Link>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-md font-medium">
                The Nurturing Sanctuary: A premium Islamic learning platform combining physical books with a digital academy. Nurturing the next generation of the Ummah with faith, character, and knowledge.
              </p>
              <div className="mt-8 flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-outline-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-xl">share</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-primary font-bold mb-6 uppercase tracking-widest text-xs">Explore</h3>
              <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
                <li><Link to="/shop" className="hover:text-primary transition-colors">Book Shop</Link></li>
                <li><Link to="/academy" className="hover:text-primary transition-colors">Academy Landing</Link></li>
                <li><Link to="/quran-stories-for-kids" className="hover:text-primary transition-colors">Quran Stories</Link></li>
                <li><Link to="/stories-of-the-prophets-for-kids" className="hover:text-primary transition-colors">Prophet Stories</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-primary font-bold mb-6 uppercase tracking-widest text-xs">Support</h3>
              <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog & Resources</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Parent Dashboard</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-outline-variant/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-on-surface-variant/60">
            <p>© {new Date().getFullYear()} Noor & Nurture. All rights reserved.</p>
            <p>Designed with love for the Ummah.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
