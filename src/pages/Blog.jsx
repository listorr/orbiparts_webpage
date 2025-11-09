import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SEO } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation();
  const blogPosts = useMemo(() => {
    const card = (key, date, imageKey, link) => {
      const base = `blogLanding.cards.${key}`;
      const fallback = BLOG_FALLBACKS[imageKey];
      return {
        id: key,
        title: t(`${base}.title`),
        excerpt: t(`${base}.excerpt`),
        author: t(`${base}.author`),
        date,
        category: t(`blogLanding.${t(`${base}.categoryKey`)}`),
        image: t(`${base}.title`),
        imageUrl: getMediaSrc(`${imageKey}-hero.jpg`, fallback.hero),
        imageErrorHandler: createOnErrorHandler(fallback.hero),
        link
      };
    };
    return [
      card('top10', '2025-01-15', 'top-10-aircraft-parts-suppliers-2025', '/blog/top-10-aircraft-parts-suppliers-2025'),
      card('legacy', '2024-01-15', 'future-of-legacy-aircraft', '/blog/future-of-legacy-aircraft'),
      card('miami', '2024-01-10', 'miami-aviation-logistics', '/blog/miami-aviation-logistics'),
      card('aog', '2024-01-05', 'aog-response-strategies', '/blog/aog-response-strategies'),
      card('sustainable', '2023-12-28', 'sustainable-aviation-component-trading', '/blog/sustainable-aviation-component-trading'),
      card('supply', '2023-12-20', 'global-aircraft-parts-supply-chains', '/blog/global-aircraft-parts-supply-chains'),
      card('technology', '2023-12-15', 'technology-trends-component-management', '/blog/technology-trends-aircraft-component-management')
    ];
  }, [t]);

  const handleReadMore = (postId) => {
    toast({
      title: "Blog Post",
      description: "Detailed reading view not implemented yet. Let me know if you’d like this feature and we can add it.",
    });
  };

  // Pagination setup
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageSize = 6; // posts per page
  const currentPage = Math.max(1, parseInt(queryParams.get('page') || '1', 10));
  const totalPages = Math.ceil(blogPosts.length / pageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return blogPosts.slice(start, start + pageSize);
  }, [blogPosts, currentPage]);

  const goToPage = (p) => {
    const params = new URLSearchParams(location.search);
    params.set('page', String(p));
    navigate(`/blog?${params.toString()}`);
  };

  return (
    <>
      <SEO
        title={t('blogLanding.seo.title')}
        description={t('blogLanding.seo.description')}
        canonical={`https://www.orbiparts.com/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`}
        ogType="website"
        siteName="ORBIPARTS"
        locale="en_US" /* TODO: dynamic locale mapping */
        prevUrl={currentPage > 1 ? `https://www.orbiparts.com/blog?page=${currentPage - 1}` : undefined}
        nextUrl={currentPage < totalPages ? `https://www.orbiparts.com/blog?page=${currentPage + 1}` : undefined}
        alternates={[
          { hrefLang: 'en', url: 'https://www.orbiparts.com/blog' },
          { hrefLang: 'es', url: 'https://www.orbiparts.com/es/blog' },
          { hrefLang: 'x-default', url: 'https://www.orbiparts.com/blog' }
        ]}
      />
      <Helmet>
        <title>{t('blogLanding.seo.title')} - {t('blogLanding.hero_title')}</title>
        <meta name="description" content={t('blogLanding.seo.description')} />
        <meta name="keywords" content="aviation blog, aircraft parts suppliers, engine trading guide, helicopter parts sourcing, aviation industry trends, OEM distributors comparison, aircraft components insights, aviation procurement software, CFM56 engine parts, Boeing parts suppliers, Airbus parts distributors, aviation supply chain, MRO industry news, aircraft leasing insights, AOG support strategies, aviation logistics trends, aircraft parts trading, rotorcraft components, business aviation parts, general aviation suppliers" />
        <link rel="canonical" href="https://www.orbiparts.com/blog" />
        
  {/* OG/Twitter managed by <SEO /> */}
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "ORBIPARTS Aviation Industry Blog",
            "description": "Expert insights and analysis on aircraft parts supply, engine trading, helicopter components, and global aviation industry trends",
            "url": "https://www.orbiparts.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "ORBIPARTS",
              "url": "https://www.orbiparts.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.orbiparts.com/logo.png"
              }
            },
            "blogPost": [
              {
                "@type": "BlogPosting",
                "headline": "Top 10 Aircraft Parts Suppliers & Distributors in 2025",
                "datePublished": "2025-01-15",
                "url": "https://www.orbiparts.com/blog/top-10-aircraft-parts-suppliers-2025"
              }
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.orbiparts.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.orbiparts.com/blog"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('blogLanding.hero_title')}</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                {t('blogLanding.hero_subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="hover-lift overflow-hidden rounded-lg">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-auto">
                    <img
                      src={blogPosts[0].imageUrl}
                      onError={blogPosts[0].imageErrorHandler}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {t('blogLanding.featured_badge')}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        {blogPosts[0].category}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{blogPosts[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {blogPosts[0].link ? (
                        <Link to={blogPosts[0].link}>
                          <Button>
                            {t('blogLanding.readMore')}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          onClick={() => handleReadMore(blogPosts[0].id)}
                        >
                          {t('blogLanding.readMore')}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('blogLanding.latestArticles_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('blogLanding.latestArticles_subtitle', 'Expert insights and analysis from our aviation industry professionals')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift h-full rounded-lg">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        className="w-full h-full object-cover"
                        alt={post.image || post.title}
                        src={post.imageUrl}
                        onError={post.imageErrorHandler}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{post.category}</span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        {post.link ? (
                          <Link to={post.link}>
                            <Button size="sm" variant="outline">{t('blogLanding.readMore')}</Button>
                          </Link>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleReadMore(post.id)}>{t('blogLanding.readMore')}</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >{t('blogLanding.ui.previous')}</Button>
              <span className="text-sm text-gray-600">
                {t('blogLanding.ui.pageOf', { current: currentPage, total: totalPages })}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >{t('blogLanding.ui.next')}</Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t('blogLanding.ui.stayUpdated')}</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {t('blogLanding.ui.newsletter')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('blogLanding.ui.emailPlaceholder')}
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 placeholder-gray-500"
                />
                <Button className="bg-white text-primary hover:bg-gray-200 px-6 py-3 rounded-md">
                  {t('blogLanding.ui.subscribe')}
                </Button>
              </div>
              <p className="text-blue-200 text-sm">
                {t('blogLanding.ui.noSpam')}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;