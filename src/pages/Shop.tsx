import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Loader2, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
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
        // Mock popularity sorting
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Newest (default)
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [products, searchQuery, categoryFilter, themeFilter, sortBy]);

  return (
    <>
      <SEO 
        title="Shop All Islamic Books & Academy Courses | NoorKids"
        description="Explore our full collection of Islamic children's books, Quran stories, Prophet stories, and interactive Academy courses."
      />

      <div className="bg-noor-cream min-h-screen pb-20">
        {/* Hero Section */}
        <div className="bg-white py-16 border-b border-noor-light-green/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-noor-dark mb-6">
              Shop Our Collection
            </h1>
            <p className="text-lg text-noor-dark/60 max-w-2xl mx-auto">
              Find the perfect resources to help your children grow in faith, character, and knowledge through beautiful storytelling.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                {/* Search */}
                <div>
                  <h3 className="text-sm font-bold text-noor-dark uppercase tracking-wider mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-noor-dark/40" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-noor-light-green focus:ring-2 focus:ring-noor-green focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-bold text-noor-dark uppercase tracking-wider mb-4 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'all', label: 'All Products', icon: Sparkles },
                      { id: 'book', label: 'Books', icon: BookOpen },
                      { id: 'academy', label: 'Academy', icon: GraduationCap },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id as CategoryFilter)}
                        className={`w-full flex items-center px-4 py-2 rounded-xl text-sm transition-all ${
                          categoryFilter === cat.id 
                            ? 'bg-noor-green text-white font-bold shadow-md' 
                            : 'bg-white text-noor-dark/70 hover:bg-noor-light-green'
                        }`}
                      >
                        <cat.icon className={`h-4 w-4 mr-3 ${categoryFilter === cat.id ? 'text-white' : 'text-noor-green'}`} />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Themes */}
                <div>
                  <h3 className="text-sm font-bold text-noor-dark uppercase tracking-wider mb-4">Themes</h3>
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          themeFilter === theme.id
                            ? 'bg-noor-light-green border-noor-green text-noor-green'
                            : 'bg-white border-noor-light-green text-noor-dark/60 hover:border-noor-green/50'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <p className="text-noor-dark/60 font-medium">
                  Showing <span className="text-noor-dark font-bold">{filteredProducts.length}</span> products
                </p>
                
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-4 w-4 text-noor-dark/40" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-white border border-noor-light-green rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-noor-green transition-all"
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
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-noor-green mb-4" />
                  <p className="text-noor-dark/60 font-medium">Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-noor-light-green">
                  <div className="bg-noor-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-noor-dark/20" />
                  </div>
                  <h3 className="text-xl font-bold text-noor-dark mb-2">No products found</h3>
                  <p className="text-noor-dark/60 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                      setThemeFilter('all');
                    }}
                    className="text-noor-green font-bold hover:underline"
                  >
                    Clear all filters
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
