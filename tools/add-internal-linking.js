import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Define related articles for each blog
const relatedArticles = {
  'SustainableAviationComponentTrading.jsx': {
    articles: [
      {
        to: '/blog/technology-trends-aircraft-component-management',
        title: 'Technology Trends in Component Management',
        description: 'Learn how digital tracking, blockchain, and IoT sensors enable carbon footprint measurement and ESG reporting.'
      },
      {
        to: '/blog/future-of-legacy-aircraft-component-supply',
        title: 'Future of Legacy Aircraft Components',
        description: 'Discover the $45B USM market delivering 40-70% carbon reduction through circular economy practices.'
      },
      {
        to: '/blog/global-aircraft-parts-supply-chains',
        title: 'Global Supply Chain Resilience',
        description: 'Explore how nearshoring and sustainable sourcing strategies reduce emissions while improving reliability.'
      }
    ]
  },
  'AogResponseStrategies.jsx': {
    articles: [
      {
        to: '/blog/miami-aviation-logistics-hub',
        title: 'Miami: Strategic AOG Response Hub',
        description: 'Understand how Miami\'s 74% Latin America coverage and FTZ advantages accelerate emergency part delivery.'
      },
      {
        to: '/blog/top-10-aircraft-parts-suppliers-2025',
        title: 'Top Aircraft Parts Suppliers 2025',
        description: 'Identify which global distributors offer 24/7 AOG support and exchange programs for critical situations.'
      },
      {
        to: '/blog/technology-trends-aircraft-component-management',
        title: 'AI-Powered Inventory Systems',
        description: 'See how predictive analytics and real-time tracking reduce AOG response times from hours to minutes.'
      }
    ]
  },
  'MiamiAviationLogisticsHub.jsx': {
    articles: [
      {
        to: '/blog/global-aircraft-parts-supply-chains',
        title: 'Global Supply Chain Strategies',
        description: 'Learn how multi-region distribution centers complement Miami\'s Latin America dominance for worldwide coverage.'
      },
      {
        to: '/blog/aog-response-strategies',
        title: 'AOG Response Excellence',
        description: 'Explore emergency logistics modes leveraging Miami\'s connectivity for sub-24-hour global delivery.'
      },
      {
        to: '/blog/sustainable-aviation-component-trading',
        title: 'Sustainable Aviation & Carbon Reduction',
        description: 'Discover how strategic hub locations minimize air freight emissions while maintaining service levels.'
      }
    ]
  },
  'FutureOfLegacyAircraft.jsx': {
    articles: [
      {
        to: '/blog/sustainable-aviation-component-trading',
        title: 'Sustainable Aviation & Circular Economy',
        description: 'See how USM parts deliver 40-70% carbon reduction vs new manufacturing—ICAO CORSIA compliant.'
      },
      {
        to: '/blog/top-10-aircraft-parts-suppliers-2025',
        title: 'Top Legacy Aircraft Suppliers',
        description: 'Identify specialized distributors with deep USM inventories for B727, DC-10, MD-80, and B747 classic fleets.'
      },
      {
        to: '/blog/technology-trends-aircraft-component-management',
        title: 'Technology for Legacy Fleets',
        description: 'Discover how digital twins and predictive maintenance extend TBO for aging components and aircraft.'
      }
    ]
  },
  'Top10AircraftPartsSuppliers2025.jsx': {
    articles: [
      {
        to: '/blog/global-aircraft-parts-supply-chains',
        title: 'Global Supply Chain Resilience',
        description: 'Learn how top suppliers navigate post-COVID disruptions, semiconductor shortages, and geopolitical tensions.'
      },
      {
        to: '/blog/technology-trends-aircraft-component-management',
        title: 'Technology Differentiation Strategies',
        description: 'Explore how AI-driven platforms, blockchain traceability, and digital documentation separate market leaders.'
      },
      {
        to: '/blog/aog-response-strategies',
        title: 'AOG Support Capabilities Comparison',
        description: 'Compare 24/7 response times, exchange programs, and emergency logistics across major distributors.'
      }
    ]
  }
};

const relatedArticlesTemplate = (articles) => `
          {/* Related Articles */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
${articles.map(article => `              <Link to="${article.to}" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">${article.title}</h3>
                <p className="text-sm text-gray-600">${article.description}</p>
              </Link>`).join('\n')}
            </div>
          </section>
`;

async function addInternalLinking() {
  const blogDir = join(rootDir, 'src', 'pages', 'blog');
  let totalAdded = 0;

  for (const [filename, { articles }] of Object.entries(relatedArticles)) {
    const filePath = join(blogDir, filename);
    
    try {
      let content = await readFile(filePath, 'utf-8');
      
      // Check if already has Related Articles section
      if (content.includes('Related Articles')) {
        console.log(`⏭️  Skipping ${filename} - already has Related Articles section`);
        continue;
      }

      // Find the last section before closing tags
      // Look for pattern: </section>\n        </div>\n      </article>
      const insertPattern = /(\s*)<\/section>(\s*)<\/div>(\s*)<\/article>/;
      
      if (!insertPattern.test(content)) {
        console.log(`⚠️  Warning: Could not find insertion point in ${filename}`);
        continue;
      }

      const relatedSection = relatedArticlesTemplate(articles);
      
      // Insert Related Articles section before the final section closing tag
      content = content.replace(
        insertPattern,
        `${relatedSection}$1</section>$2</div>$3</article>`
      );

      await writeFile(filePath, content, 'utf-8');
      console.log(`✅ Added Related Articles to ${filename}`);
      totalAdded++;
      
    } catch (error) {
      console.error(`❌ Error processing ${filename}:`, error.message);
    }
  }

  console.log(`\n📊 Summary: Added internal linking to ${totalAdded} blog posts`);
}

addInternalLinking().catch(console.error);
