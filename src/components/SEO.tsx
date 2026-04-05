import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  lang?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  schema?: Record<string, any>;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  lang,
  canonical,
  type = 'website',
  image,
  schema
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';
  
  const defaultTitle = "The Illuminated Path | Islamic Children's Books & Learning";
  const defaultDescription = "Discover beautiful Islamic children's books, Quran stories, and online academy courses.";
  const siteUrl = window.location.origin;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

  return (
    <Helmet htmlAttributes={{ lang: currentLang }}>
      <title>{title ? `${title} | The Illuminated Path` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={fullImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={fullImage} />}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
