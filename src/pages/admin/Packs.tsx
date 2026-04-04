import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, Package as PackageIcon, Code, Globe, Sparkles, X, Layout, Settings, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">Packs Management</h1>
            <p className="text-lg text-primary/60 font-medium max-w-xl">Create and manage premium educational bundles for your subscribers.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => {
                setCurrentPack({ title: '', description: '', price: 0, image: '', type: 'books', features: [], productIds: [], seoTitle: '', seoDescription: '', seoKeywords: '', customHtml: '', translations: {} });
                setActiveTab('basic');
                setIsEditing(true);
              }}
              className="flex items-center px-10 py-4 bg-secondary text-primary font-black rounded-full hover:scale-105 transition-transform shadow-xl shadow-secondary/20"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Pack
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-[3rem] shadow-2xl border border-outline-variant/10 flex flex-col mb-12 overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-white shrink-0">
            <div>
              <h2 className="text-2xl font-headline font-black text-primary tracking-tight">
                {currentPack.id ? 'Edit Pack' : 'Create New Pack'}
              </h2>
              <p className="text-xs text-primary/40 font-bold uppercase tracking-widest mt-1">Pack Configuration</p>
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
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors text-primary">
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
            <form id="pack-form" onSubmit={handleSave} className="space-y-8">
              
              {/* Basic Info Tab */}
              <div className={activeTab === 'basic' ? 'block animate-in fade-in slide-in-from-bottom-2 duration-300' : 'hidden'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={currentPack.title}
                      onChange={(e) => setCurrentPack({ ...currentPack, title: e.target.value })}
                      className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Price ($) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={currentPack.price}
                      onChange={(e) => setCurrentPack({ ...currentPack, price: parseFloat(e.target.value) })}
                      className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Description (English) *</label>
                  <textarea
                    required
                    rows={4}
                    value={currentPack.description}
                    onChange={(e) => setCurrentPack({ ...currentPack, description: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Image URL *</label>
                    <input
                      type="url"
                      required
                      value={currentPack.image}
                      onChange={(e) => setCurrentPack({ ...currentPack, image: e.target.value })}
                      className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Type *</label>
                    <select
                      value={currentPack.type}
                      onChange={(e) => setCurrentPack({ ...currentPack, type: e.target.value as any })}
                      className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all appearance-none bg-white"
                    >
                      <option value="books">Books</option>
                      <option value="academy">Academy</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Features</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-grow px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                      placeholder="Add a feature (e.g., 5 Physical Books)"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-8 py-3 bg-primary/5 text-primary font-black rounded-2xl hover:bg-primary/10 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {currentPack.features?.map((feature, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-primary rounded-full text-sm font-bold border border-secondary/20">
                        {feature}
                        <button type="button" onClick={() => removeFeature(feature)} className="text-primary/40 hover:text-rose-500 transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {currentPack.type !== 'academy' && (
                  <div className="mt-8 space-y-4">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Included Products</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-outline-variant/10 rounded-[2rem] p-6 bg-surface-container-low">
                      {products.map(product => (
                        <label key={product.id} className="flex items-center gap-4 cursor-pointer p-3 rounded-2xl hover:bg-white transition-colors group">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={currentPack.productIds?.includes(product.id)}
                              onChange={() => toggleProduct(product.id)}
                              className="w-6 h-6 text-primary rounded-lg border-outline-variant/30 focus:ring-primary transition-all cursor-pointer"
                            />
                          </div>
                          <span className="text-sm font-bold text-primary/80 group-hover:text-primary transition-colors">{product.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SEO Tab */}
              <div className={activeTab === 'seo' ? 'block animate-in fade-in slide-in-from-bottom-2 duration-300' : 'hidden'}>
                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-[2rem] text-sm text-primary font-medium mb-6 border border-primary/10">
                    Configure SEO metadata for the English version. Use the Auto-Translate button to generate SEO fields for other languages.
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">SEO Title</label>
                    <input type="text" value={currentPack.seoTitle} onChange={e => setCurrentPack({...currentPack, seoTitle: e.target.value})} placeholder="Optimized title for search engines" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">SEO Description</label>
                    <textarea rows={3} value={currentPack.seoDescription} onChange={e => setCurrentPack({...currentPack, seoDescription: e.target.value})} placeholder="Brief description for search results" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all resize-none"></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">SEO Keywords (comma separated)</label>
                    <input type="text" value={currentPack.seoKeywords} onChange={e => setCurrentPack({...currentPack, seoKeywords: e.target.value})} placeholder="islamic books, kids, quran" className="w-full px-5 py-3 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all" />
                  </div>
                  
                  {Object.keys(currentPack.translations || {}).length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-headline font-black text-primary mb-4">Generated Translations</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(currentPack.translations || {}).map(([lang, data]: [string, any]) => (
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
                  <strong>Warning:</strong> You can write custom HTML and Tailwind CSS here to completely override the default pack detail layout. Ensure your code is responsive and safe.
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Custom HTML/CSS Code</label>
                  <textarea 
                    rows={15} 
                    value={currentPack.customHtml} 
                    onChange={e => setCurrentPack({...currentPack, customHtml: e.target.value})} 
                    placeholder="<div className='p-8 bg-white'>...</div>" 
                    className="w-full px-5 py-4 rounded-3xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-mono text-sm bg-surface-container-low resize-none"
                  ></textarea>
                </div>
              </div>

            </form>
          </div>
          
          <div className="p-8 border-t border-outline-variant/10 flex justify-end gap-4 bg-white rounded-b-[3rem] shrink-0">
            <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 rounded-full font-black text-sm text-primary/60 hover:bg-primary/5 transition-colors">Cancel</button>
            <button type="submit" form="pack-form" className="px-10 py-4 rounded-full font-black text-sm text-white bg-primary hover:scale-105 transition-transform shadow-xl shadow-primary/10">Save Pack</button>
          </div>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-96 rounded-[3rem] border border-outline-variant/10 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packs.map((pack) => (
            <div key={pack.id} className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500">
              <div className="h-64 relative overflow-hidden">
                <img src={pack.image} alt={pack.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-lg font-black text-primary shadow-xl">
                  ${pack.price.toFixed(2)}
                </div>
                <div className="absolute top-6 left-6 bg-primary text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {pack.type}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-headline font-black text-primary mb-4 tracking-tight leading-tight">{pack.title}</h3>
                <p className="text-primary/60 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">{pack.description}</p>
                
                <div className="mb-8">
                  <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-6">Included Features</h4>
                  <ul className="space-y-4">
                    {pack.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-primary/80 flex items-center gap-4 font-bold">
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm shadow-secondary/50"></div>
                        {feature}
                      </li>
                    ))}
                    {pack.features.length > 3 && (
                      <li className="text-xs text-primary/40 font-black uppercase tracking-widest mt-4 pl-6">+ {pack.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>

                <div className="mt-auto pt-8 border-t border-outline-variant/5 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setCurrentPack(pack);
                      setActiveTab('basic');
                      setIsEditing(true);
                    }}
                    className="p-4 text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-2xl transition-all"
                    title="Edit Pack"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(pack.id)}
                    className="p-4 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-2xl transition-all"
                    title="Delete Pack"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {packs.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm">
              <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageIcon className="h-10 w-10 text-primary/20" />
              </div>
              <h3 className="text-2xl font-headline font-black text-primary mb-2 tracking-tight">No packs found</h3>
              <p className="text-primary/40 font-medium max-w-xs mx-auto">Create your first premium bundle pack to get started with authoring.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
