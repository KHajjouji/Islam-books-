import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, Package as PackageIcon } from 'lucide-react';

interface Pack {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: 'books' | 'academy' | 'mixed';
  features: string[];
  productIds: string[];
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
  const [currentPack, setCurrentPack] = useState<Partial<Pack>>({
    title: '',
    description: '',
    price: 0,
    image: '',
    type: 'books',
    features: [],
    productIds: []
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
      setCurrentPack({ title: '', description: '', price: 0, image: '', type: 'books', features: [], productIds: [] });
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
              setCurrentPack({ title: '', description: '', price: 0, image: '', type: 'books', features: [], productIds: [] });
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
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-noor-dark mb-6">{currentPack.id ? 'Edit Pack' : 'Create New Pack'}</h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={currentPack.title}
                  onChange={(e) => setCurrentPack({ ...currentPack, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Price ($)</label>
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

            <div>
              <label className="block text-sm font-bold text-noor-dark mb-2">Description</label>
              <textarea
                required
                rows={3}
                value={currentPack.description}
                onChange={(e) => setCurrentPack({ ...currentPack, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Image URL</label>
                <input
                  type="url"
                  required
                  value={currentPack.image}
                  onChange={(e) => setCurrentPack({ ...currentPack, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Type</label>
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

            <div>
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
              <div>
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

            <div className="flex justify-end gap-4 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-stone-100 text-noor-dark font-bold rounded-full hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
              >
                Save Pack
              </button>
            </div>
          </form>
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
