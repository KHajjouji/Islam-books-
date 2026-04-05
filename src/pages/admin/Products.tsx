import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Edit2, Trash2, X, Database, Code, Globe, Sparkles, Package, Users, Search, Filter, Eye, Layout, Settings, ChevronRight, ChevronLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { GoogleGenAI } from '@google/genai';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  author?: string;
  ageRange?: string;
  stock: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  customHtml?: string;
  translations?: Record<string, any>;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'design'>('basic');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'book',
    author: '',
    ageRange: '',
    stock: '10',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    customHtml: '',
    translations: {} as Record<string, any>
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const prods: Product[] = [];
      querySnapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(prods);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSeedDatabase = async () => {
    if (!window.confirm("This will add the initial sample products to the database. Continue?")) return;
    
    setIsSeeding(true);
    try {
      for (const product of initialProducts) {
        const { id, ...productData } = product;
        await addDoc(collection(db, 'products'), {
          ...productData,
          stock: 100,
          createdAt: serverTimestamp()
        });
      }
      
      // Add a few extra demo products for specific categories to test sliders
      const demoProducts = [
        {
          title: "The Prophet's Kindness",
          description: "A beautiful story about the Prophet's kindness to animals.",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop",
          category: "prophet-stories",
          theme: "prophets",
          stock: 50,
          createdAt: serverTimestamp()
        },
        {
          title: "My First Quran Words",
          description: "Learn simple words from the Quran with beautiful illustrations.",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=500&fit=crop",
          category: "quran-stories",
          theme: "quran",
          stock: 50,
          createdAt: serverTimestamp()
        },
        {
          title: "Bedtime Sunnahs",
          description: "A soothing bedtime story teaching the sunnahs of sleep.",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          category: "bedtime",
          theme: "bedtime",
          stock: 50,
          createdAt: serverTimestamp()
        },
        {
          title: "Interactive HTML Demo Book",
          description: "This product demonstrates the custom HTML feature for rich product descriptions.",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop",
          category: "book",
          theme: "educational",
          stock: 50,
          customHtml: `<div style="padding: 2rem; background-color: #f8f9fa; border-radius: 1rem; border: 2px dashed #006B5F;">
  <h2 style="color: #006B5F; font-size: 2rem; margin-bottom: 1rem;">Welcome to the Custom HTML Experience!</h2>
  <p style="font-size: 1.2rem; line-height: 1.6; color: #333;">This section is entirely built using the <strong>Custom HTML Code</strong> field in the admin panel. You can use this to create highly customized landing pages for specific products.</p>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
    <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <h3 style="color: #D4AF37; margin-bottom: 0.5rem;">Feature 1</h3>
      <p>Embed videos, custom interactive elements, or unique layouts that go beyond the standard description text.</p>
    </div>
    <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <h3 style="color: #D4AF37; margin-bottom: 0.5rem;">Feature 2</h3>
      <p>Perfect for special edition books, digital courses, or products that need a bit more storytelling.</p>
    </div>
  </div>
  
  <div style="margin-top: 2rem; text-align: center;">
    <button style="background-color: #006B5F; color: white; padding: 1rem 2rem; border: none; border-radius: 2rem; font-weight: bold; cursor: pointer;" onclick="alert('Custom HTML buttons work too!')">Click Me (Interactive HTML)</button>
  </div>
</div>`,
          createdAt: serverTimestamp()
        }
      ];

      for (const demo of demoProducts) {
        await addDoc(collection(db, 'products'), demo);
      }

      alert("Database seeded successfully with demo products!");
      fetchProducts();
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Failed to seed database.");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    setActiveTab('basic');
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category,
        author: product.author || '',
        ageRange: product.ageRange || '',
        stock: product.stock.toString(),
        seoTitle: product.seoTitle || '',
        seoDescription: product.seoDescription || '',
        seoKeywords: product.seoKeywords || '',
        customHtml: product.customHtml || '',
        translations: product.translations || {}
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        category: 'book',
        author: '',
        ageRange: '',
        stock: '10',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        customHtml: '',
        translations: {}
      });
    }
    setIsModalOpen(true);
  };

  const handleAutoTranslate = async () => {
    if (!formData.title || !formData.description) {
      alert("Please fill in the English title and description first.");
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      alert("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment.");
      return;
    }

    setIsTranslating(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        Translate the following product information into Arabic (ar), French (fr), German (de), Dutch (nl), and Spanish (es).
        Return ONLY a valid JSON object with the language codes as keys, and the translated fields as values.
        
        Fields to translate:
        - title: "${formData.title}"
        - description: "${formData.description}"
        - seoTitle: "${formData.seoTitle || formData.title}"
        - seoDescription: "${formData.seoDescription || formData.description}"
        
        Expected JSON format:
        {
          "ar": { "title": "...", "description": "...", "seoTitle": "...", "seoDescription": "..." },
          "fr": { ... },
          "de": { ... },
          "nl": { ... },
          "es": { ... }
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const jsonStr = response.text?.trim() || "{}";
      const translations = JSON.parse(jsonStr);
      
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          ...translations
        }
      }));
      
      alert("Translations generated successfully!");
    } catch (error) {
      console.error("Translation error:", error);
      alert("Failed to generate translations.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        author: formData.author,
        ageRange: formData.ageRange,
        stock: parseInt(formData.stock, 10),
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        seoKeywords: formData.seoKeywords,
        customHtml: formData.customHtml,
        translations: formData.translations
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">Product Catalog</h1>
            <p className="text-lg text-primary/60 font-medium max-w-xl">Manage your physical and digital educational resources for the next generation.</p>
          </div>
          <div className="flex gap-4">
            {products.length === 0 && (
              <button 
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                className="flex items-center px-8 py-4 bg-white text-primary border-2 border-primary/10 font-black rounded-full hover:bg-primary/5 transition-all disabled:opacity-70"
              >
                <Database className="h-5 w-5 mr-2" />
                {isSeeding ? 'Seeding...' : 'Seed Database'}
              </button>
            )}
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center px-10 py-4 bg-secondary text-primary font-black rounded-full hover:scale-105 transition-transform shadow-xl shadow-secondary/20"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white h-96 rounded-[3rem] border border-outline-variant/10 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-outline-variant/10">
              <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 mx-auto mb-6">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-headline font-black text-primary mb-2">No products found</h3>
              <p className="text-primary/40 font-medium mb-8">Start by adding your first educational resource.</p>
              <button 
                onClick={() => handleOpenModal()}
                className="px-10 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary/10"
              >
                Create Product
              </button>
            </div>
          ) : (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-outline-variant/10 group hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                      product.stock > 10 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {product.stock > 10 ? 'In Stock' : `Low Stock: ${product.stock}`}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="flex-1 py-3 bg-white text-primary rounded-xl font-black text-xs hover:bg-secondary transition-colors"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">{product.category}</p>
                      <h3 className="text-xl font-headline font-black text-primary leading-tight">{product.title}</h3>
                    </div>
                    <p className="text-2xl font-headline font-black text-primary">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-primary/60 font-medium line-clamp-2 mb-6">{product.description}</p>
                  
                  <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">SKU: {product.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary/40 uppercase tracking-widest">
                      <Users className="h-3 w-3" />
                      <span>{Math.floor(Math.random() * 100)} Sales</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-white rounded-t-[3rem] shrink-0">
              <div>
                <h2 className="text-2xl font-headline font-black text-primary tracking-tight">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <p className="text-xs text-primary/40 font-bold uppercase tracking-widest mt-1">Product Authoring</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={handleAutoTranslate}
                  disabled={isTranslating}
                  className="flex items-center px-6 py-2.5 bg-primary/5 text-primary font-black rounded-full hover:bg-primary/10 transition-colors disabled:opacity-50 text-sm"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isTranslating ? 'Translating...' : 'Auto-Translate'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors text-primary">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="flex border-b border-outline-variant/10 px-8 shrink-0 bg-surface-container-low">
              <button 
                className={`px-6 py-4 font-black text-sm uppercase tracking-widest border-b-4 transition-all ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-primary/30 hover:text-primary'}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </button>
              <button 
                className={`px-6 py-4 font-black text-sm uppercase tracking-widest border-b-4 transition-all flex items-center gap-2 ${activeTab === 'seo' ? 'border-primary text-primary' : 'border-transparent text-primary/30 hover:text-primary'}`}
                onClick={() => setActiveTab('seo')}
              >
                <Globe className="h-4 w-4" /> SEO & Lang
              </button>
              <button 
                className={`px-6 py-4 font-black text-sm uppercase tracking-widest border-b-4 transition-all flex items-center gap-2 ${activeTab === 'design' ? 'border-primary text-primary' : 'border-transparent text-primary/30 hover:text-primary'}`}
                onClick={() => setActiveTab('design')}
              >
                <Code className="h-4 w-4" /> Custom Design
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-grow bg-white">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info Tab */}
                <div className={activeTab === 'basic' ? 'block animate-in fade-in slide-in-from-bottom-2 duration-300' : 'hidden'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Title (English) *</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Price *</label>
                      <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Category *</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all appearance-none bg-white">
                        <option value="book">Book</option>
                        <option value="academy">Academy</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Stock *</label>
                      <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Image URL *</label>
                      <input type="url" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Description (English) *</label>
                      <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all resize-none"></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Author (Optional)</label>
                      <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Age Range (Optional)</label>
                      <input type="text" value={formData.ageRange} onChange={e => setFormData({...formData, ageRange: e.target.value})} placeholder="e.g. 4-8 years" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                  </div>
                </div>

                {/* SEO Tab */}
                <div className={activeTab === 'seo' ? 'block animate-in fade-in slide-in-from-bottom-2 duration-300' : 'hidden'}>
                  <div className="space-y-6">
                    <div className="bg-primary/5 p-6 rounded-[2rem] text-sm text-primary font-medium mb-6 border border-primary/10">
                      Configure SEO metadata for the English version. Use the Auto-Translate button to generate SEO fields for other languages.
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">SEO Title</label>
                      <input type="text" value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} placeholder="Optimized title for search engines" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">SEO Description</label>
                      <textarea rows={3} value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} placeholder="Brief description for search results" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all resize-none"></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">SEO Keywords (comma separated)</label>
                      <input type="text" value={formData.seoKeywords} onChange={e => setFormData({...formData, seoKeywords: e.target.value})} placeholder="islamic books, kids, quran" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                    </div>
                    
                    {Object.keys(formData.translations || {}).length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-headline font-black text-primary mb-4">Generated Translations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Object.entries(formData.translations).map(([lang, data]: [string, any]) => (
                            <div key={lang} className="p-5 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                              <div className="font-black uppercase text-[10px] text-primary/40 mb-2 tracking-widest">{lang}</div>
                              <div className="text-sm font-bold text-primary line-clamp-1">{data.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Design Tab */}
                <div className={activeTab === 'design' ? 'block animate-in fade-in slide-in-from-bottom-2 duration-300' : 'hidden'}>
                  <div className="bg-secondary/10 p-6 rounded-[2rem] text-sm text-primary font-medium mb-6 border border-secondary/20">
                    <strong>Warning:</strong> You can write custom HTML and Tailwind CSS here to completely override the default product detail layout. Ensure your code is responsive and safe.
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Custom HTML/CSS Code</label>
                    <textarea 
                      rows={15} 
                      value={formData.customHtml} 
                      onChange={e => setFormData({...formData, customHtml: e.target.value})} 
                      placeholder="<div className='p-8 bg-white'>...</div>" 
                      className="w-full px-5 py-4 rounded-3xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-mono text-sm bg-surface-container-low resize-none"
                    ></textarea>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="p-8 border-t border-outline-variant/10 flex justify-end gap-4 bg-white rounded-b-[3rem] shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 rounded-full font-black text-sm text-primary/60 hover:bg-primary/5 transition-colors">Cancel</button>
              <button type="submit" form="product-form" className="px-10 py-4 rounded-full font-black text-sm text-white bg-primary hover:scale-105 transition-transform shadow-xl shadow-primary/10">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
