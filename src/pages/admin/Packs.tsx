import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, Package as PackageIcon, Code, Globe, Sparkles, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Pack {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: 'books' | 'academy' | 'mixed';
  features: string[];
  productIds: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  customHtml?: string;
  translations?: Record<string, any>;
  createdAt: any;
}

interface Product {
  id: string;
  title: string;
}

export default function AdminPacks() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'design'>('basic');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const [currentPack, setCurrentPack] = useState<Partial<Pack>>({
    title: '',
    description: '',
    price: 0,
    image: '',
    type: 'books',
    features: [],
    productIds: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    customHtml: '',
    translations: {}
  });
  const [featureInput, setFeatureInput] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [packsSnap, productsSnap] = await Promise.all([
        getDocs(collection(db, 'packs')),
        getDocs(collection(db, 'products'))
      ]);
      
      const fetchedPacks: Pack[] = [];
      packsSnap.forEach((doc) => {
        fetchedPacks.push({ id: doc.id, ...doc.data() } as Pack);
      });
      setPacks(fetchedPacks);

      const fetchedProducts: Product[] = [];
      productsSnap.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, title: doc.data().title } as Product);
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAutoTranslate = async () => {
    if (!currentPack.title || !currentPack.description) {
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
        Translate the following pack information into Arabic (ar), French (fr), German (de), Dutch (nl), and Spanish (es).
        Return ONLY a valid JSON object with the language codes as keys, and the translated fields as values.
        
        Fields to translate:
        - title: "${currentPack.title}"
        - description: "${currentPack.description}"
        - seoTitle: "${currentPack.seoTitle || currentPack.title}"
        - seoDescription: "${currentPack.seoDescription || currentPack.description}"
        
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
      
      setCurrentPack(prev => ({
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const packId = currentPack.id || doc(collection(db, 'packs')).id;
      const packData = {
        ...currentPack,
        price: Number(currentPack.price),
        createdAt: currentPack.createdAt || serverTimestamp()
      };
      
      await setDoc(doc(db, 'packs', packId), packData);
      setIsEditing(false);
      setCurrentPack({ title: '', description: '', price: 0, image: '', type: 'books', features: [], productIds: [], seoTitle: '', seoDescription: '', seoKeywords: '', customHtml: '', translations: {} });
      fetchData();
    } catch (error) {
      console.error("Error saving pack:", error);
      alert("Failed to save pack.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this pack?")) {
      try {
        await deleteDoc(doc(db, 'packs', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting pack:", error);
      }
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !currentPack.features?.includes(featureInput.trim())) {
      setCurrentPack({
        ...currentPack,
        features: [...(currentPack.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setCurrentPack({
      ...currentPack,
      features: currentPack.features?.filter(f => f !== feature)
    });
  };

  const toggleProduct = (productId: string) => {
    const currentIds = currentPack.productIds || [];
    if (currentIds.includes(productId)) {
      setCurrentPack({
        ...currentPack,
        productIds: currentIds.filter(id => id !== productId)
      });
    } else {
      setCurrentPack({
        ...currentPack,
        productIds: [...currentIds, productId]
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-noor-dark">Packs Management</h1>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentPack({ title: '', description: '', price: 0, image: '', type: 'books', features: [], productIds: [], seoTitle: '', seoDescription: '', seoKeywords: '', customHtml: '', translations: {} });
              setActiveTab('basic');
              setIsEditing(true);
            }}
            className="flex items-center px-6 py-3 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Pack
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 flex flex-col mb-8">
          <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white rounded-t-3xl shrink-0">
            <h2 className="text-2xl font-bold text-noor-dark">
              {currentPack.id ? 'Edit Pack' : 'Create New Pack'}
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
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
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
            <form id="pack-form" onSubmit={handleSave} className="space-y-6">
              
              {/* Basic Info Tab */}
              <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-noor-dark mb-2">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={currentPack.title}
                      onChange={(e) => setCurrentPack({ ...currentPack, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-noor-dark mb-2">Price ($) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={currentPack.price}
                      onChange={(e) => setCurrentPack({ ...currentPack, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-bold text-noor-dark mb-2">Description (English) *</label>
                  <textarea
                    required
                    rows={3}
                    value={currentPack.description}
                    onChange={(e) => setCurrentPack({ ...currentPack, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-bold text-noor-dark mb-2">Image URL *</label>
                    <input
                      type="url"
                      required
                      value={currentPack.image}
                      onChange={(e) => setCurrentPack({ ...currentPack, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-noor-dark mb-2">Type *</label>
                    <select
                      value={currentPack.type}
                      onChange={(e) => setCurrentPack({ ...currentPack, type: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                    >
                      <option value="books">Books</option>
                      <option value="academy">Academy</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-bold text-noor-dark mb-2">Features</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-grow px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                      placeholder="Add a feature (e.g., 5 Physical Books)"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-stone-200 text-noor-dark font-bold rounded-xl hover:bg-stone-300 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentPack.features?.map((feature, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-noor-light-green text-noor-green rounded-full text-sm font-medium">
                        {feature}
                        <button type="button" onClick={() => removeFeature(feature)} className="text-noor-green hover:text-rose-500">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {currentPack.type !== 'academy' && (
                  <div className="mt-6">
                    <label className="block text-sm font-bold text-noor-dark mb-2">Included Products</label>
                    <div className="max-h-48 overflow-y-auto border border-stone-200 rounded-xl p-4 space-y-2">
                      {products.map(product => (
                        <label key={product.id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPack.productIds?.includes(product.id)}
                            onChange={() => toggleProduct(product.id)}
                            className="w-5 h-5 text-noor-green rounded focus:ring-noor-green"
                          />
                          <span className="text-noor-dark">{product.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SEO Tab */}
              <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4">
                    Configure SEO metadata for the English version. Use the Auto-Translate button to generate SEO fields for other languages.
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noor-dark/80 mb-1">SEO Title</label>
                    <input type="text" value={currentPack.seoTitle} onChange={e => setCurrentPack({...currentPack, seoTitle: e.target.value})} placeholder="Optimized title for search engines" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noor-dark/80 mb-1">SEO Description</label>
                    <textarea rows={2} value={currentPack.seoDescription} onChange={e => setCurrentPack({...currentPack, seoDescription: e.target.value})} placeholder="Brief description for search results" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noor-dark/80 mb-1">SEO Keywords (comma separated)</label>
                    <input type="text" value={currentPack.seoKeywords} onChange={e => setCurrentPack({...currentPack, seoKeywords: e.target.value})} placeholder="islamic books, kids, quran" className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none" />
                  </div>
                  
                  {Object.keys(currentPack.translations || {}).length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-bold text-noor-dark mb-2">Generated Translations</h3>
                      <div className="space-y-2">
                        {Object.entries(currentPack.translations || {}).map(([lang, data]: [string, any]) => (
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
                  <strong>Warning:</strong> You can write custom HTML and Tailwind CSS here to completely override the default pack detail layout. Ensure your code is responsive and safe.
                </div>
                <div>
                  <label className="block text-sm font-medium text-noor-dark/80 mb-1">Custom HTML/CSS Code</label>
                  <textarea 
                    rows={15} 
                    value={currentPack.customHtml} 
                    onChange={e => setCurrentPack({...currentPack, customHtml: e.target.value})} 
                    placeholder="<div className='p-8 bg-white'>...</div>" 
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none font-mono text-sm bg-stone-50"
                  ></textarea>
                </div>
              </div>

            </form>
          </div>
          
          <div className="p-6 border-t border-stone-200 flex justify-end gap-3 bg-white rounded-b-3xl shrink-0">
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-xl font-medium text-noor-dark hover:bg-stone-100 transition-colors">Cancel</button>
            <button type="submit" form="pack-form" className="px-6 py-2 rounded-xl font-bold text-white bg-noor-green hover:bg-noor-green/90 transition-colors">Save Pack</button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 text-noor-green animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div key={pack.id} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
              <div className="h-48 relative">
                <img src={pack.image} alt={pack.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-noor-dark">
                  ${pack.price.toFixed(2)}
                </div>
                <div className="absolute top-4 left-4 bg-noor-green text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {pack.type}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-noor-dark mb-2">{pack.title}</h3>
                <p className="text-noor-dark/70 text-sm mb-4 line-clamp-2">{pack.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-noor-dark uppercase tracking-wider mb-2">Features</h4>
                  <ul className="space-y-1">
                    {pack.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-noor-dark/80 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-noor-green"></div>
                        {feature}
                      </li>
                    ))}
                    {pack.features.length > 3 && (
                      <li className="text-sm text-noor-dark/50 italic">+ {pack.features.length - 3} more</li>
                    )}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setCurrentPack(pack);
                      setActiveTab('basic');
                      setIsEditing(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Pack"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(pack.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Pack"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {packs.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-stone-200">
              <PackageIcon className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-noor-dark mb-2">No packs found</h3>
              <p className="text-noor-dark/60">Create your first pack to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
