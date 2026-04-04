import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, BookOpen, ShoppingCart, User, LogOut } from 'lucide-react';
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
    { path: '/islamic-childrens-books', label: t('nav.books') },
    { path: '/shop', label: t('nav.shop') },
    { path: '/quran-stories-for-kids', label: t('nav.quran') },
    { path: '/stories-of-the-prophets-for-kids', label: t('nav.prophets') },
    { path: '/ramadan-books-for-kids', label: t('nav.ramadan') },
    { path: '/islamic-bedtime-stories', label: t('nav.bedtime') },
    { path: '/academy', label: t('nav.academy') },
    { path: '/bilingual-islamic-books-for-kids', label: t('nav.bilingual') },
    { path: '/blog', label: t('nav.blog') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-noor-cream text-noor-dark font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-noor-green">
                <BookOpen className="h-8 w-8" />
                <span>NoorKids</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-noor-green ${
                    location.pathname === link.path ? 'text-noor-green border-b-2 border-noor-green' : 'text-noor-dark/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-noor-light-green/50">
                {isAdmin && (
                  <Link to="/admin" className="text-sm font-medium text-noor-yellow hover:text-noor-green transition-colors mr-2">
                    Admin
                  </Link>
                )}
                <button 
                  onClick={toggleLanguage}
                  className="p-2 rounded-full hover:bg-noor-light-green transition-colors text-noor-dark/70"
                  aria-label="Toggle Language"
                >
                  <Globe className="h-5 w-5" />
                </button>
                <Link 
                  to="/cart"
                  className="p-2 rounded-full hover:bg-noor-light-green transition-colors text-noor-dark/70 relative"
                  aria-label="View Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-noor-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                      {itemCount}
                    </span>
                  )}
                </Link>
                {user ? (
                  <button 
                    onClick={signOut}
                    className="p-2 rounded-full hover:bg-noor-light-green transition-colors text-noor-dark/70"
                    aria-label="Sign Out"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                ) : (
                  <button 
                    onClick={signInWithGoogle}
                    className="p-2 rounded-full hover:bg-noor-light-green transition-colors text-noor-dark/70"
                    aria-label="Sign In"
                    title="Sign In"
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <Link 
                to="/cart"
                className="p-2 rounded-full hover:bg-noor-light-green transition-colors text-noor-dark/70 relative"
                aria-label="View Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-noor-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-noor-light-green transition-colors text-noor-dark/70"
              >
                <Globe className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-noor-dark/70 hover:text-noor-dark focus:outline-none p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-noor-light-green">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-noor-light-green text-noor-green'
                      : 'text-noor-dark/70 hover:bg-noor-light-green hover:text-noor-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-noor-yellow hover:bg-noor-light-green hover:text-noor-green"
                >
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-noor-dark/70 hover:bg-noor-light-green hover:text-noor-dark"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-noor-dark/70 hover:bg-noor-light-green hover:text-noor-dark"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-noor-dark text-white/80 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-white mb-4">
                <BookOpen className="h-6 w-6" />
                <span>NoorKids</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-md">
                NoorKids creates Islamic children's books, Quran stories for kids, Prophet stories, Ramadan resources, and interactive learning experiences for Muslim families in the West.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/islamic-childrens-books" className="hover:text-white transition-colors">Islamic Books</Link></li>
                <li><Link to="/quran-stories-for-kids" className="hover:text-white transition-colors">Quran Stories</Link></li>
                <li><Link to="/stories-of-the-prophets-for-kids" className="hover:text-white transition-colors">Prophet Stories</Link></li>
                <li><Link to="/ramadan-books-for-kids" className="hover:text-white transition-colors">Ramadan Books</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/academy" className="hover:text-white transition-colors">Academy</Link></li>
                <li><Link to="/bilingual-islamic-books-for-kids" className="hover:text-white transition-colors">Bilingual Books</Link></li>
                <li><Link to="/islamic-bedtime-stories" className="hover:text-white transition-colors">Bedtime Stories</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Resources</Link></li>
                {isAdmin && (
                  <li><Link to="/admin" className="hover:text-white transition-colors text-noor-yellow">Admin Dashboard</Link></li>
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-noor-dark/90 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} NoorKids. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
