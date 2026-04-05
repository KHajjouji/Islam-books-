import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, Sparkles, Image as ImageIcon, CheckCircle2, AlertCircle, X, Search, FileText, Send, Copy, Languages, Key } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { analyzeSEO, SEOAnalysisResult } from '../../lib/seoAnalyzer';
import slugify from 'slugify';

// Helper to clean JSON response from AI
const cleanJsonResponse = (text: string) => {
  // Remove markdown code blocks if present
  const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
  return cleaned;
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  status: 'draft' | 'published';
  createdAt?: any;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSuggestingKeywords, setIsSuggestingKeywords] = useState(false);
  const [seoResult, setSeoResult] = useState<SEOAnalysisResult | null>(null);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    focusKeyword: '',
    seoTitle: '',
    seoDescription: '',
    status: 'draft'
  });

  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (formData.content && formData.focusKeyword && formData.seoTitle && formData.seoDescription) {
      const result = analyzeSEO(
        formData.content,
        formData.focusKeyword,
        formData.seoTitle,
        formData.seoDescription
      );
      setSeoResult(result);
    } else {
      setSeoResult(null);
    }
  }, [formData.content, formData.focusKeyword, formData.seoTitle, formData.seoDescription]);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blog_posts'));
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postId = editingPost?.id || doc(collection(db, 'blog_posts')).id;
      const postRef = doc(db, 'blog_posts', postId);
      
      const saveContent = {
        ...formData,
        updatedAt: serverTimestamp(),
        ...(editingPost ? {} : { createdAt: serverTimestamp() })
      };

      await setDoc(postRef, saveContent, { merge: true });

      await fetchPosts();
      setIsModalOpen(false);
      resetForm();
      alert('Article saved successfully!');
    } catch (error: any) {
      console.error('Error saving post:', error);
      
      // Error handling spec for Firestore operations
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
          userId: auth.currentUser?.uid,
          email: auth.currentUser?.email,
          emailVerified: auth.currentUser?.emailVerified,
          isAnonymous: auth.currentUser?.isAnonymous,
          tenantId: auth.currentUser?.tenantId,
          providerInfo: auth.currentUser?.providerData.map(provider => ({
            providerId: provider.providerId,
            displayName: provider.displayName,
            email: provider.email,
            photoUrl: provider.photoURL
          })) || []
        },
        operationType: 'write',
        path: 'blog_posts'
      };
      console.error('Firestore Error: ', JSON.stringify(errInfo));
      alert('Failed to save article: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
      await fetchPosts();
      alert('Article deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      alert('Failed to delete article: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      image: '',
      focusKeyword: '',
      seoTitle: '',
      seoDescription: '',
      status: 'draft'
    });
    setAiPrompt('');
    setSeoResult(null);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setIsModalOpen(true);
  };

  const handleDuplicate = (post: BlogPost) => {
    const { id, ...postData } = post;
    setEditingPost(null);
    setFormData({
      ...postData,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy`,
      status: 'draft'
    });
    setIsModalOpen(true);
  };

  const translateArticle = async () => {
    if (!formData.content) return;
    const targetLang = prompt("Enter target language code (e.g., ar, fr, es):", "ar");
    if (!targetLang) return;

    setIsTranslating(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API key not found');

      const ai = new GoogleGenAI({ apiKey });
      const promptText = `
        Translate the following blog post content to ${targetLang}. 
        Translate the title, content (keep HTML tags), excerpt, seoTitle, and seoDescription.
        Return ONLY a JSON object with these fields.

        Article Data:
        ${JSON.stringify({ 
          title: formData.title, 
          content: formData.content, 
          excerpt: formData.excerpt,
          seoTitle: formData.seoTitle,
          seoDescription: formData.seoDescription
        })}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: promptText,
        config: { responseMimeType: 'application/json' }
      });

      const result = JSON.parse(cleanJsonResponse(response.text));
      setFormData(prev => ({
        ...prev,
        ...result
      }));
      alert(`Article translated to ${targetLang} successfully!`);
    } catch (error) {
      console.error('Error translating article:', error);
      alert('Failed to translate article.');
    } finally {
      setIsTranslating(false);
    }
  };

  const suggestKeywords = async () => {
    if (!formData.title && !aiPrompt) return;
    setIsSuggestingKeywords(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API key not found');

      const ai = new GoogleGenAI({ apiKey });
      const promptText = `
        Based on the topic "${formData.title || aiPrompt}", suggest 5 high-traffic SEO keywords for a blog post.
        Return ONLY a comma-separated list of keywords.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: promptText
      });

      const keywords = response.text.trim();
      setFormData(prev => ({ ...prev, focusKeyword: keywords.split(',')[0].trim() }));
      alert(`Suggested Keywords: ${keywords}`);
    } catch (error) {
      console.error('Error suggesting keywords:', error);
      alert('Failed to suggest keywords.');
    } finally {
      setIsSuggestingKeywords(false);
    }
  };

  const generateArticle = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API key not found');

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        Write a comprehensive, SEO-optimized blog post about: "${aiPrompt}".
        Focus Keyword: "${formData.focusKeyword || aiPrompt}".
        
        Requirements:
        1. Follow E-E-A-T guidelines (Experience, Expertise, Authoritativeness, Trustworthiness).
        2. Use structured HTML headings (<h2>, <h3>).
        3. Include bullet points for readability.
        4. Keep paragraphs short.
        5. Return ONLY a JSON object with the following structure (no markdown formatting around it):
        {
          "title": "A catchy, SEO-friendly title",
          "slug": "url-friendly-slug",
          "content": "The full HTML content of the article",
          "excerpt": "A short 2-sentence summary",
          "seoTitle": "SEO Title (50-60 chars)",
          "seoDescription": "Meta description (150-160 chars)"
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const result = JSON.parse(cleanJsonResponse(response.text));
      setFormData(prev => ({
        ...prev,
        title: result.title,
        slug: result.slug,
        content: result.content,
        excerpt: result.excerpt,
        seoTitle: result.seoTitle,
        seoDescription: result.seoDescription,
        focusKeyword: formData.focusKeyword || aiPrompt
      }));
    } catch (error) {
      console.error('Error generating article:', error);
      alert('Failed to generate article. Check API key and console.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndPublish = async (e: React.FormEvent) => {
    setFormData(prev => ({ ...prev, status: 'published' }));
    // We need to pass the updated status directly because setFormData is async
    const updatedFormData = { ...formData, status: 'published' as const };
    
    e.preventDefault();
    setLoading(true);
    try {
      const postId = editingPost?.id || doc(collection(db, 'blog_posts')).id;
      const postRef = doc(db, 'blog_posts', postId);
      
      const saveContent = {
        ...updatedFormData,
        updatedAt: serverTimestamp(),
        ...(editingPost ? {} : { createdAt: serverTimestamp() })
      };

      await setDoc(postRef, saveContent, { merge: true });

      await fetchPosts();
      setIsModalOpen(false);
      resetForm();
      alert('Article published successfully!');
    } catch (error: any) {
      console.error('Error publishing post:', error);
      alert('Failed to publish article: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!formData.title) return;
    setIsGeneratingImage(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API key not found');

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `A high-quality, professional blog header image for an article titled: "${formData.title}". Style: Modern, clean, suitable for an Islamic children's education website. No text in the image.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
          setFormData(prev => ({ ...prev, image: imageUrl }));
          break;
        }
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary font-headline tracking-tight mb-2">Blog & SEO</h1>
          <p className="text-on-surface-variant font-medium">Manage articles and monitor SEO performance.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-primary text-on-primary px-6 py-3 rounded-full font-headline font-black hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Article
        </button>
      </div>

      {loading && !isModalOpen ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-primary/5 flex items-center gap-6">
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-32 h-24 object-cover rounded-xl" />
              ) : (
                <div className="w-32 h-24 bg-primary/5 rounded-xl flex items-center justify-center text-primary/40">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-black text-primary font-headline">{post.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    post.status === 'published' ? 'bg-secondary/10 text-secondary' : 'bg-surface-variant text-on-surface-variant'
                  }`}>
                    {post.status}
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs font-bold text-primary/60">
                  <span className="flex items-center gap-1"><Search className="h-3 w-3" /> {post.focusKeyword || 'No keyword'}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(post)}
                  className="p-3 text-primary hover:bg-primary/5 rounded-xl transition-colors"
                  title="Edit Article"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDuplicate(post)}
                  className="p-3 text-secondary hover:bg-secondary/5 rounded-xl transition-colors"
                  title="Duplicate Article"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-3 text-error hover:bg-error/5 rounded-xl transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-[2rem] border border-primary/5">
              <FileText className="h-12 w-12 text-primary/20 mx-auto mb-4" />
              <p className="text-on-surface-variant font-medium">No articles yet. Create one to boost your SEO!</p>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-5xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-primary/5 flex justify-between items-center bg-[#faf9f6] shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-primary font-headline">
                  {editingPost ? 'Edit Article' : 'New Article'}
                </h2>
                <button
                  onClick={translateArticle}
                  disabled={isTranslating}
                  className="px-4 py-2 bg-white border border-primary/10 rounded-full text-xs font-bold text-primary hover:bg-primary/5 flex items-center gap-2 disabled:opacity-50"
                >
                  {isTranslating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Languages className="h-3 w-3" />}
                  AI Translate
                </button>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                <X className="h-6 w-6 text-primary" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-grow grid md:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="md:col-span-2 space-y-6">
                {/* AI Generator */}
                <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
                  <h3 className="text-lg font-black text-primary mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    AI Article Generator
                  </h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Topic (e.g., Benefits of reading Quran to toddlers)"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="flex-grow px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                    />
                    <button
                      type="button"
                      onClick={generateArticle}
                      disabled={isGenerating || !aiPrompt}
                      className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                      Generate
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setFormData({
                          ...formData, 
                          title: newTitle,
                          slug: formData.slug ? formData.slug : slugify(newTitle, { lower: true, strict: true })
                        });
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Content (HTML)</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none h-64 font-mono text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Excerpt</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none h-24"
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar: SEO & Settings */}
              <div className="space-y-6">
                <div className="bg-[#faf9f6] p-6 rounded-[2rem] border border-primary/5">
                  <h3 className="text-lg font-black text-primary mb-4">Publishing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'draft' | 'published'})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">Slug</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#faf9f6] p-6 rounded-[2rem] border border-primary/5">
                  <h3 className="text-lg font-black text-primary mb-4">Featured Image</h3>
                  {formData.image ? (
                    <div className="relative rounded-xl overflow-hidden mb-4">
                      <img src={formData.image} alt="Featured" className="w-full h-32 object-cover" />
                      <button 
                        onClick={() => setFormData({...formData, image: ''})}
                        className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-error hover:bg-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-primary/5 rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center mb-4">
                      <ImageIcon className="h-8 w-8 text-primary/40" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={generateImage}
                    disabled={isGeneratingImage || !formData.title}
                    className="w-full bg-secondary text-on-secondary px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGeneratingImage ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    Generate Image
                  </button>
                </div>

                <div className="bg-[#faf9f6] p-6 rounded-[2rem] border border-primary/5">
                  <h3 className="text-lg font-black text-primary mb-4">SEO Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2 flex justify-between items-center">
                        Focus Keyword
                        <button 
                          onClick={suggestKeywords}
                          disabled={isSuggestingKeywords}
                          className="text-[10px] text-secondary hover:underline flex items-center gap-1 disabled:opacity-50"
                        >
                          {isSuggestingKeywords ? <Loader2 className="h-3 w-3 animate-spin" /> : <Key className="h-3 w-3" />}
                          AI Suggest
                        </button>
                      </label>
                      <input
                        type="text"
                        value={formData.focusKeyword}
                        onChange={(e) => setFormData({...formData, focusKeyword: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">SEO Title</label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">Meta Description</label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none h-24"
                      />
                    </div>
                  </div>

                  {/* SEO Analysis Results */}
                  {seoResult && (
                    <div className="mt-6 pt-6 border-t border-primary/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-primary">SEO Score</h4>
                        <div className={`px-3 py-1 rounded-full font-black text-sm ${
                          seoResult.score >= 80 ? 'bg-secondary/20 text-secondary' : 
                          seoResult.score >= 50 ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-error/10 text-error'
                        }`}>
                          {seoResult.score}/100
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {Object.entries(seoResult.checks).map(([key, check]: [string, any]) => (
                          <li key={key} className="flex items-start gap-2 text-sm">
                            {check.status === 'good' && <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />}
                            {check.status === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />}
                            {check.status === 'error' && <X className="h-4 w-4 text-error shrink-0 mt-0.5" />}
                            <span className="text-on-surface-variant">{check.message}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-primary/5 bg-[#faf9f6] flex justify-end gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-full font-bold text-primary hover:bg-primary/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-full font-headline font-black hover:bg-primary/5 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                Save as Draft
              </button>
              <button
                onClick={handleSaveAndPublish}
                disabled={loading}
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-headline font-black hover:scale-105 transition-transform shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                <Send className="h-5 w-5" />
                Publish Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
