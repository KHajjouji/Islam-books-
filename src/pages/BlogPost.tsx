import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Loader2, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: any;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'blog_posts'), where('slug', '==', slug), where('status', '==', 'published'));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setPost({ id: doc.id, ...doc.data() } as BlogPost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
        <h1 className="text-4xl font-headline font-black text-primary mb-4">Article Not Found</h1>
        <p className="text-on-surface-variant mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = post.createdAt?.toDate ? new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(post.createdAt.toDate()) : '';

  return (
    <div className="pt-24 pb-32 bg-[#faf9f6] min-h-screen">
      <SEO 
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        type="article"
        image={post.image}
        canonical={`/blog/${post.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.image,
          "datePublished": post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : undefined,
          "description": post.seoDescription || post.excerpt,
          "author": {
            "@type": "Organization",
            "name": "The Illuminated Path"
          }
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>

        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-primary leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-on-surface-variant font-medium">
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>The Illuminated Path Team</span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-16 border-8 border-white">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg prose-headings:font-headline prose-headings:font-black prose-headings:text-primary prose-p:text-on-surface-variant prose-a:text-secondary prose-a:font-bold hover:prose-a:text-primary prose-img:rounded-[2rem] max-w-none bg-white p-8 md:p-16 rounded-[3rem] shadow-sm border border-primary/5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
