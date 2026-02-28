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
import { getBlogMedia } from '@/lib/blogMedia';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation();
  const blogPosts = useMemo(() => {
    const card = (key, date, slug, link) => {
      const base = `blogLanding.cards.${key}`;
      const media = getBlogMedia(slug);
      const heroPath = media?.hero ?? null;
      return {
        id: key,
        title: t(`${base}.title`),
        excerpt: t(`${base}.excerpt`),
        author: t(`${base}.author`),
        date,
        category: t(`blogLanding.${t(`${base}.categoryKey`)}`),
        image: t(`${base}.title`),
        imageUrl: getMediaSrc(heroPath),
        imageErrorHandler: createOnErrorHandler(),
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
        {/* Hero Section - Modern Magazine Style */}
        <section className="relative py-32 gradient-bg overflow-hidden">
          {/* Advanced Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
            <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold tracking-wide">Expert Corner</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  {t('blogLanding.hero_title')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                {t('blogLanding.hero_subtitle')}
              </p>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Featured Post - Hero Card */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link to={blogPosts[0].link} className="group block">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500 z-10"></div>
                  
                  <div className="grid lg:grid-cols-2 gap-0 relative">
                    {/* Image Side */}
                    <div className="relative h-96 lg:h-auto overflow-hidden">
                      <img
                        src={blogPosts[0].imageUrl}
                        onError={blogPosts[0].imageErrorHandler}
                        alt={blogPosts[0].title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent"></div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-6 left-6">
                        <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {t('blogLanding.featured_badge')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
                      {/* Category & Date */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {blogPosts[0].category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(blogPosts[0].date).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                        {blogPosts[0].title}
                      </h2>
                      
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                        {blogPosts[0].excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {blogPosts[0].author.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{blogPosts[0].author}</span>
                        </div>
                        
                        <div className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                          {t('blogLanding.readMore')} →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid - Magazine Layout */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-blue-50 via-transparent to-transparent opacity-60"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-bold text-blue-900 tracking-wide">Latest Insights</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('blogLanding.latestArticles_title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                {t('blogLanding.latestArticles_subtitle', 'Expert insights and analysis from our aviation industry professionals')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link to={post.link || '#'} className="group block h-full">
                    <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          alt={post.image || post.title}
                          src={post.imageUrl}
                          onError={post.imageErrorHandler}
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-8">
                        {/* Date */}
                        <div className="text-sm text-gray-500 mb-3">
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-light">
                          {post.excerpt}
                        </p>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {post.author.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                          </div>
                          
                          <div className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                            {t('blogLanding.readMore')} →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination - Modern Style */}
            <div className="mt-16 flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ← {t('blogLanding.ui.previous')}
              </motion.button>
              
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg">
                {currentPage} / {totalPages}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {t('blogLanding.ui.next')} →
              </motion.button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup - Premium Design */}
        <section className="relative py-32 gradient-bg overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Stay Informed</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {t('blogLanding.ui.stayUpdated')}
              </h2>
              
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-light">
                {t('blogLanding.ui.newsletter')}
              </p>
              
              {/* Newsletter Form */}
              <div className="max-w-lg mx-auto pt-4">
                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <input
                    type="email"
                    placeholder={t('blogLanding.ui.emailPlaceholder')}
                    className="flex-1 px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-white/50 font-medium"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {t('blogLanding.ui.subscribe')}
                  </motion.button>
                </div>
                
                <p className="text-blue-200 text-sm mt-4 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  {t('blogLanding.ui.noSpam')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;