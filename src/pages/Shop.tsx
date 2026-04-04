import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Loader2, BookOpen, GraduationCap, Sparkles, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';

type CategoryFilter = 'all' | 'book' | 'academy';
type ThemeFilter = 'all' | 'quran' | 'prophets' | 'ramadan' | 'bedtime' | 'general' | 'bilingual';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';

export default function Shop() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Theme filter
    if (themeFilter !== 'all') {
      result = result.filter(p => p.theme === themeFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [products, searchQuery, categoryFilter, themeFilter, sortBy]);

  return (
    <>
      <SEO 
        title="Shop All Islamic Books & Academy Courses | Noor & Nurture"
        description="Explore our full collection of Islamic children's books, Quran stories, Prophet stories, and interactive Academy courses."
      />

      <div className="bg-background min-h-screen pb-32">
        {/* Hero Section */}
        <div className="bg-surface-low py-20 border-b border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">The Illuminated Path</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Shop Our Collection
            </h1>
            <p className="text-lg text-on-surface-variant font-medium max-w-2xl mx-auto leading-relaxed">
              Find the perfect resources to help your children grow in faith, character, and knowledge through beautiful storytelling and interactive learning.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-28 space-y-10">
                {/* Search */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest px-2">Search</h3>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary group-focus-within:scale-110 transition-transform" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border border-outline-variant/30 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-low text-on-surface-variant"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest px-2 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'all', label: 'All Products', icon: Sparkles },
                      { id: 'book', label: 'Physical Books', icon: BookOpen },
                      { id: 'academy', label: 'Digital Academy', icon: GraduationCap },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id as CategoryFilter)}
                        className={`w-full flex items-center px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                          categoryFilter === cat.id 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                            : 'bg-surface text-on-surface-variant hover:bg-surface-low border border-outline-variant/10'
                        }`}
                      >
                        <cat.icon className={`h-4 w-4 mr-3 ${categoryFilter === cat.id ? 'text-accent' : 'text-primary'}`} />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Themes */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest px-2">Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'quran', label: 'Quran' },
                      { id: 'prophets', label: 'Prophets' },
                      { id: 'ramadan', label: 'Ramadan' },
                      { id: 'bedtime', label: 'Bedtime' },
                      { id: 'bilingual', label: 'Bilingual' },
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setThemeFilter(theme.id as ThemeFilter)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                          themeFilter === theme.id
                            ? 'bg-accent border-accent text-secondary shadow-md'
                            : 'bg-surface border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Support Card */}
                <div className="bg-primary text-white p-6 rounded-[2rem] shadow-xl shadow-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="h-12 w-12" />
                  </div>
                  <h4 className="text-lg font-headline font-extrabold mb-2">Need help?</h4>
                  <p className="text-xs opacity-80 mb-4 font-medium">Our team is here to help you find the perfect learning journey.</p>
                  <button className="w-full py-3 bg-white text-primary rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                    Contact Support
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center text-primary">
                    <SlidersHorizontal className="h-5 w-5" />
                  </div>
                  <p className="text-on-surface-variant font-bold text-sm">
                    Showing <span className="text-primary">{filteredProducts.length}</span> products
                  </p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="flex-grow sm:flex-none bg-surface border border-outline-variant/30 rounded-2xl px-6 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all text-primary"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
                  <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-surface rounded-[3rem] p-16 text-center border-2 border-dashed border-outline-variant/30">
                  <div className="bg-surface-low w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Search className="h-10 w-10 text-primary/20" />
                  </div>
                  <h3 className="text-3xl font-headline font-extrabold text-primary mb-4">No products found</h3>
                  <p className="text-on-surface-variant font-medium mb-10 max-w-md mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                      setThemeFilter('all');
                    }}
                    className="px-8 py-4 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/10 hover:scale-105 transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
