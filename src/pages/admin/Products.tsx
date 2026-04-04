import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Edit2, Trash2, X, Database, Code, Globe, Sparkles } from 'lucide-react';
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
      alert("Database seeded successfully!");
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
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-noor-dark">Products</h1>
        <div className="flex gap-3">
          {products.length === 0 && (
            <button 
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="flex items-center px-4 py-2 bg-noor-orange text-white font-bold rounded-xl hover:bg-noor-orange/90 transition-colors disabled:opacity-70"
            >
              <Database className="h-5 w-5 mr-2" />
              {isSeeding ? 'Seeding...' : 'Seed Database'}
            </button>
          )}
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-noor-green text-white font-bold rounded-xl hover:bg-noor-green/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-24 rounded-2xl border border-stone-200"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-noor-dark/70">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-noor-dark/60">No products found. Add some!</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4">
                      <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    </td>
                    <td className="p-4 font-medium text-noor-dark">{product.title}</td>
                    <td className="p-4 text-noor-dark/80">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-noor-dark/80 capitalize">{product.category}</td>
                    <td className="p-4 text-noor-dark/80">{product.stock}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleOpenModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-noor-dark/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white rounded-t-3xl shrink-0">
              <h2 className="text-2xl font-bold text-noor-dark">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={handleAutoTranslate}
                  disabled={isTranslating}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-xl hover:bg-purple-200 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isTranslating ? 'Translating...' : 'Auto-Translate'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex border-b border-stone-200 px-6 shrink-0">
              <button 
                className={`px-4 py-3 font-bold border-b-2 ${activeTab === 'basic' ? 'border-noor-green text-noor-green' : 'border-transparent text-noor-dark/60 hover:text-noor-dark'}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </button>
              <button 
                className={`px-4 py-3 font-bold border-b-2 flex items-center gap-2 ${activeTab === 'seo' ? 'border-noor-green text-noor-green' : 'border-transparent text-noor-dark/60 hover:text-noor-dark'}`}
                onClick={() => setActiveTab('seo')}
              >
                <Globe className="h-4 w-4" /> SEO & Lang
              </button>
              <button 
                className={`px-4 py-3 font-bold border-b-2 flex items-center gap-2 ${activeTab === 'design' ? 'border-noor-green text-noor-green' : 'border-transparent text-noor-dark/60 hover:text-noor-dark'}`}
                onClick={() => setActiveTab('design')}
              >
                <Code className="h-4 w-4" /> Custom Design
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                
                {/* Basic Info Tab */}
                <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Title (English) *</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Price *</label>
                      <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Category *</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none">
                        <option value="book">Book</option>
                        <option value="academy">Academy</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Stock *</label>
                      <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Image URL *</label>
                      <input type="url" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Description (English) *</label>
                      <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Author (Optional)</label>
                      <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">Age Range (Optional)</label>
                      <input type="text" value={formData.ageRange} onChange={e => setFormData({...formData, ageRange: e.target.value})} placeholder="e.g. 4-8 years" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                  </div>
                </div>

                {/* SEO Tab */}
                <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4">
                      Configure SEO metadata for the English version. Use the Auto-Translate button to generate SEO fields for other languages.
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">SEO Title</label>
                      <input type="text" value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} placeholder="Optimized title for search engines" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">SEO Description</label>
                      <textarea rows={2} value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} placeholder="Brief description for search results" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-noor-dark/80 mb-1">SEO Keywords (comma separated)</label>
                      <input type="text" value={formData.seoKeywords} onChange={e => setFormData({...formData, seoKeywords: e.target.value})} placeholder="islamic books, kids, quran" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                    </div>
                    
                    {Object.keys(formData.translations || {}).length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-bold text-noor-dark mb-2">Generated Translations</h3>
                        <div className="space-y-2">
                          {Object.entries(formData.translations).map(([lang, data]: [string, any]) => (
                            <div key={lang} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                              <div className="font-bold uppercase text-xs text-noor-dark/60 mb-1">{lang}</div>
                              <div className="text-sm"><strong>Title:</strong> {data.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Design Tab */}
                <div className={activeTab === 'design' ? 'block' : 'hidden'}>
                  <div className="bg-amber-50 p-4 rounded-xl text-sm text-amber-800 mb-4">
                    <strong>Warning:</strong> You can write custom HTML and Tailwind CSS here to completely override the default product detail layout. Ensure your code is responsive and safe.
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noor-dark/80 mb-1">Custom HTML/CSS Code</label>
                    <textarea 
                      rows={15} 
                      value={formData.customHtml} 
                      onChange={e => setFormData({...formData, customHtml: e.target.value})} 
                      placeholder="<div className='p-8 bg-white'>...</div>" 
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none font-mono text-sm bg-stone-50"
                    ></textarea>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="p-6 border-t border-stone-200 flex justify-end gap-3 bg-white rounded-b-3xl shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-xl font-medium text-noor-dark hover:bg-stone-100 transition-colors">Cancel</button>
              <button type="submit" form="product-form" className="px-6 py-2 rounded-xl font-bold text-white bg-noor-green hover:bg-noor-green/90 transition-colors">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
