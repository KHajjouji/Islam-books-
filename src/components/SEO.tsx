import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  lang?: string;
}

export default function SEO({ title, description, keywords, lang }: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';
  
  const defaultTitle = "The Illuminated Path | Islamic Children's Books & Learning";
  const defaultDescription = "Discover beautiful Islamic children's books, Quran stories, and online academy courses.";

  return (
    <Helmet htmlAttributes={{ lang: currentLang }}>
      <title>{title ? `${title} | The Illuminated Path` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
}
