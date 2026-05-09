import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, path = '', schema }: SEOProps) {
  const primaryUrl = `https://sterlingmangoes.in${path}`;
  const alternateUrl = `https://sterlingmangoes.xo.je${path}`;
  const fullTitle = `${title} | Sterling Mangoes`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={primaryUrl} />
      <link rel="alternate" href={alternateUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={primaryUrl} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
