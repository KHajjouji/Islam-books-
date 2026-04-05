import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Loader2, Plus, Edit2, Trash2, Save, Image as ImageIcon, LayoutTemplate, Settings, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageSection {
  id: string;
  type: 'hero' | 'html' | 'product_slider';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  category?: string;
}

interface PageData {
  id?: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  sections: PageSection[];
}

export default function AdminPages() {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<PageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pages'));
      const pagesData: PageData[] = [];
      querySnapshot.forEach((doc) => {
        pagesData.push({ id: doc.id, ...doc.data() } as PageData);
      });
      
      // Ensure homepage exists in the list (we can store it in site_settings or pages, let's use pages with slug 'home')
      if (!pagesData.find(p => p.slug === 'home')) {
        pagesData.unshift({
          id: 'home',
          slug: 'home',
          title: 'Home Page',
          status: 'published',
          sections: []
        });
      }
      
      setPages(pagesData);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: PageData) => {
    setEditingPage({ ...page });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPage({
      slug: '',
      title: '',
      status: 'draft',
      sections: []
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingPage) return;
    setSaving(true);
    try {
      if (editingPage.id && editingPage.id !== 'home') {
        await updateDoc(doc(db, 'pages', editingPage.id), editingPage as any);
      } else if (editingPage.id === 'home') {
        await setDoc(doc(db, 'site_settings', 'homepage'), editingPage);
      } else {
        await addDoc(collection(db, 'pages'), editingPage);
      }
      setIsModalOpen(false);
      fetchPages();
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (id === 'home') return alert("Cannot delete home page.");
    if (confirm("Are you sure you want to delete this page?")) {
      try {
        await deleteDoc(doc(db, 'pages', id));
        fetchPages();
      } catch (error) {
        console.error("Error deleting page:", error);
      }
    }
  };

  const addSection = (type: PageSection['type']) => {
    if (!editingPage) return;
    const newSection: PageSection = {
      id: Date.now().toString(),
      type,
      title: type === 'hero' ? 'New Hero' : type === 'product_slider' ? 'Featured Products' : '',
      content: type === 'html' ? '<div class="p-8 text-center"><h2>Custom HTML Block</h2></div>' : '',
      overlayColor: '#000000',
      overlayOpacity: 40
    };
    setEditingPage({
      ...editingPage,
      sections: [...editingPage.sections, newSection]
    });
  };

  const updateSection = (id: string, updates: Partial<PageSection>) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      sections: editingPage.sections.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const removeSection = (id: string) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      sections: editingPage.sections.filter(s => s.id !== id)
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary font-headline">Pages & Visual Editor</h1>
          <p className="text-on-surface-variant mt-2">Manage your website pages and visual layout.</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus className="h-5 w-5" />
          Add New Page
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-primary/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-primary/5 text-primary font-bold">
            <tr>
              <th className="p-6">Page Title</th>
              <th className="p-6">Slug / URL</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {pages.map((page) => (
              <tr key={page.id || page.slug} className="hover:bg-primary/5 transition-colors">
                <td className="p-6 font-bold text-primary flex items-center gap-3">
                  <LayoutTemplate className="h-5 w-5 text-primary/40" />
                  {page.title}
                </td>
                <td className="p-6 text-on-surface-variant">/{page.slug === 'home' ? '' : page.slug}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    page.status === 'published' ? 'bg-secondary/10 text-secondary' : 'bg-surface-variant text-on-surface-variant'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={page.slug === 'home' ? '/' : `/pages/${page.slug}`}
                      target="_blank"
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="View Page"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleEdit(page)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit Visual Layout"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    {page.slug !== 'home' && (
                      <button
                        onClick={() => handleDelete(page.id!)}
                        className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Editor Modal */}
      {isModalOpen && editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-primary/5 flex justify-between items-center bg-[#faf9f6]">
              <h2 className="text-2xl font-black text-primary font-headline flex items-center gap-3">
                <Settings className="h-6 w-6" />
                Visual Editor: {editingPage.title || 'New Page'}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-full font-bold text-primary hover:bg-primary/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary text-on-primary px-8 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                  Save Changes
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-8 bg-[#faf9f6]">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Page Title</label>
                  <input
                    type="text"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="e.g. About Us"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">URL Slug</label>
                  <input
                    type="text"
                    value={editingPage.slug}
                    disabled={editingPage.slug === 'home'}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none disabled:bg-primary/5"
                    placeholder="e.g. about-us"
                  />
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-primary">Page Sections</h3>
                  <div className="flex gap-2">
                    <button onClick={() => addSection('hero')} className="px-4 py-2 bg-white border border-primary/10 rounded-lg text-sm font-bold text-primary hover:bg-primary/5 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" /> Add Hero
                    </button>
                    <button onClick={() => addSection('product_slider')} className="px-4 py-2 bg-white border border-primary/10 rounded-lg text-sm font-bold text-primary hover:bg-primary/5 flex items-center gap-2">
                      <LayoutTemplate className="h-4 w-4" /> Add Product Slider
                    </button>
                    <button onClick={() => addSection('html')} className="px-4 py-2 bg-white border border-primary/10 rounded-lg text-sm font-bold text-primary hover:bg-primary/5 flex items-center gap-2">
                      <Edit2 className="h-4 w-4" /> Add Custom HTML
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {editingPage.sections.map((section, index) => (
                    <div key={section.id} className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm relative group">
                      <button 
                        onClick={() => removeSection(section.id)}
                        className="absolute top-4 right-4 p-2 text-error hover:bg-error/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                          {section.type.replace('_', ' ')}
                        </span>
                      </div>

                      {section.type === 'hero' && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="block text-xs font-bold text-primary mb-1">Book Cover Image URL</label>
                            <input type="text" value={section.image || ''} onChange={(e) => updateSection(section.id, { image: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-primary/10" placeholder="https://..." />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-primary mb-1">Headline Text</label>
                            <input type="text" value={section.title || ''} onChange={(e) => updateSection(section.id, { title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-primary/10" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-primary mb-1">Subtitle Text</label>
                            <input type="text" value={section.subtitle || ''} onChange={(e) => updateSection(section.id, { subtitle: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-primary/10" />
                          </div>
                          {/* Overlay settings kept for backward compatibility but hidden from UI to avoid confusion since the new layout doesn't use them */}
                        </div>
                      )}

                      {section.type === 'product_slider' && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-primary mb-1">Slider Title</label>
                            <input type="text" value={section.title || ''} onChange={(e) => updateSection(section.id, { title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-primary/10" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-primary mb-1">Category Filter</label>
                            <select value={section.category || 'all'} onChange={(e) => updateSection(section.id, { category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-primary/10">
                              <option value="all">All Products</option>
                              <option value="book">Books</option>
                              <option value="academy">Academy</option>
                              <option value="quran">Quran Theme</option>
                              <option value="prophets">Prophets Theme</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {section.type === 'html' && (
                        <div>
                          <label className="block text-xs font-bold text-primary mb-1">Custom HTML Code</label>
                          <textarea 
                            value={section.content || ''} 
                            onChange={(e) => updateSection(section.id, { content: e.target.value })} 
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 font-mono text-sm h-32"
                            placeholder="<div>Your custom HTML here</div>"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {editingPage.sections.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-primary/10 border-dashed">
                      <p className="text-on-surface-variant">No sections added yet. Click the buttons above to build your page.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
