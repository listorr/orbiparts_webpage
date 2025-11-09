import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// FAQ schemas for key blogs
const blogFAQs = {
  'AogResponseStrategies.jsx': [
    {
      q: 'What is AOG (Aircraft On Ground) and why is it critical?',
      a: 'AOG refers to an aircraft unable to fly due to mechanical or regulatory issues. Each hour of downtime costs airlines $150,000-$500,000 in lost revenue, passenger compensation, and crew expenses. Rapid AOG response with 24/7 parts availability and emergency logistics is essential to minimize financial losses.'
    },
    {
      q: 'How quickly can ORBIPARTS respond to AOG emergencies?',
      a: 'ORBIPARTS delivers sub-2-hour quote responses and can dispatch parts within 4-6 hours for domestic AOG situations. Our Miami hub enables 12-24 hour delivery to Latin America, and we maintain 24/7 operations with NFO charter, hot-shot trucking, and dedicated courier options for critical situations.'
    },
    {
      q: 'What are the key AOG response time KPIs operators should track?',
      a: 'Critical KPIs include: <2 hour quote response time, <4 hour availability confirmation, 6-12 hour domestic dispatch, 75%+ first-call resolution rate, and 99.5%+ documentation accuracy. These metrics directly impact downtime duration and recovery costs.'
    },
    {
      q: 'What emergency logistics modes are available for AOG parts delivery?',
      a: 'AOG logistics includes: NFO (Next Flight Out) using commercial cargo/passenger flights, dedicated charter aircraft for high-value/bulky items, hot-shot trucking for ground distances <500 miles, and motorcycle couriers for urban congestion. Each mode offers speed vs cost tradeoffs based on urgency and part characteristics.'
    },
    {
      q: 'How do exchange programs reduce AOG downtime?',
      a: 'Exchange programs provide serviceable rotable components immediately while the failed unit undergoes shop visit repair. This eliminates 30-90 day repair TAT from the critical path, enabling aircraft return to service within hours. ORBIPARTS maintains exchange pools for landing gear, APUs, avionics, and other high-value rotables.'
    }
  ],
  'TechnologyTrendsComponentManagement.jsx': [
    {
      q: 'How does AI/ML predictive maintenance reduce unscheduled removals?',
      a: 'Machine learning algorithms analyze ACARS data, maintenance records, and environmental conditions to predict component failures 3-6 months in advance. Delta TechOps achieved 30-40% reduction in unscheduled removals using AI models, while Air France-KLM reduced landing gear/APU failures by 35% with Airbus Skywise predictive analytics.'
    },
    {
      q: 'What are digital twins and how do they optimize aircraft component lifecycles?',
      a: 'Digital twins create virtual replicas of physical aircraft and components, enabling operators to simulate maintenance scenarios and test operational changes without disrupting flights. GE Digital achieved 12-18% TBO extension on APUs through digital twin optimization, while Lufthansa Technik\'s AVIATAR platform delivers ±3% demand forecast accuracy enabling 25-30% inventory reduction.'
    },
    {
      q: 'What role does blockchain play in aircraft parts traceability?',
      a: 'Blockchain creates immutable, tamper-proof records of component history from OEM manufacturing through teardown. Honeywell\'s GoDirect Trade platform enables instant 8130-3 verification vs 2-5 day manual processes, while Moog\'s VeriPart blockchain eliminates 95% of paperwork reconciliation issues. The technology prevents counterfeiting by making history forgery economically impossible.'
    },
    {
      q: 'How do IoT sensors enable real-time condition monitoring?',
      a: 'IoT sensors embedded in components transmit vibration, temperature, pressure, and acoustic data to ground systems continuously. Rolls-Royce monitors 13,000 engines with 25+ sensors per engine achieving 99.9% dispatch reliability, while Collins Aerospace HUMS systems predict gear failures 100+ flight hours in advance with 95% accuracy.'
    },
    {
      q: 'What cybersecurity requirements apply to digital parts management systems?',
      a: 'Aviation parts systems must comply with CMMC Level 2 (110 security practices) for DoD contractors, NIST 800-171 for ITAR-controlled data, and implement zero-trust architecture with MFA, AES-256 encryption, and regular penetration testing. The FAA reported 300% increase in cyber incidents 2020-2024, making security non-negotiable for digital supply chains.'
    }
  ],
  'SustainableAviationComponentTrading.jsx': [
    {
      q: 'What is ICAO CORSIA and how does it impact aviation parts sourcing?',
      a: 'ICAO CORSIA (Carbon Offsetting and Reduction Scheme for International Aviation) becomes mandatory in 2027 for 88+ countries, requiring airlines to offset emissions above 2019-2020 baseline levels at $5-$40 per tonne CO2. Sustainable component sourcing through USM parts delivers 40-70% carbon reduction vs new manufacturing, providing compliance pathway and cost savings.'
    },
    {
      q: 'How much carbon reduction do refurbished aircraft parts deliver vs new manufacturing?',
      a: 'MIT Laboratory for Aviation and Environment studies show refurbished components deliver 40-70% carbon reduction compared to new manufacturing. Example: Boeing 737 landing gear refurbishment generates 650 kg CO2e vs 3,200 kg for new production—a 79.7% reduction (2,550 kg CO2e avoided per unit).'
    },
    {
      q: 'What is the USM (Used Serviceable Material) market size and growth trajectory?',
      a: 'The global USM market is valued at $45+ billion annually with 18,930 aircraft retirements expected by 2044 (Airbus GMF). Aircraft teardown operations recover 85-90% of aircraft weight as serviceable parts, refurbished components, or recyclable materials, creating circular economy infrastructure critical for net-zero 2050 compliance.'
    },
    {
      q: 'How do operators measure and report ESG metrics for component sourcing?',
      a: 'ESG measurement requires digital tracking of: component provenance (new vs USM), refurbishment activities and energy use, logistics carbon footprint, and third-party verification. Carbon accounting follows lifecycle assessment methodology comparing production, transport, and end-of-life impacts. ORBIPARTS 2024 metrics: 12,400 tonnes CO2e avoided, 58% circular sourcing, ISO 14001 certified operations.'
    },
    {
      q: 'Does sustainable aviation parts sourcing compromise safety or quality?',
      a: 'No. USM parts undergo rigorous 8130-3/EASA Form 1 certification, traceability verification, and service bulletin compliance checks identical to new parts. Part 145 repair station oversight and OEM/PMA designation requirements ensure airworthiness. Sustainability and safety coexist through proper quality control—both are mandatory, not tradeoffs.'
    }
  ]
};

async function addFAQSchemas() {
  const blogDir = join(rootDir, 'src', 'pages', 'blog');
  let totalAdded = 0;

  for (const [filename, faqs] of Object.entries(blogFAQs)) {
    const filePath = join(blogDir, filename);
    
    try {
      let content = await readFile(filePath, 'utf-8');
      
      // Check if already has FAQ schema
      if (content.includes('buildFAQSchema')) {
        console.log(`⏭️  Skipping ${filename} - already has FAQ schema`);
        continue;
      }

      // Import buildFAQSchema if not already imported
      if (!content.includes('buildFAQSchema')) {
        content = content.replace(
          /import \{ SEO, buildArticleSchema \} from/,
          'import { SEO, buildArticleSchema, buildFAQSchema } from'
        );
      }

      // Find schemas array and add FAQ schema
      // Pattern: schemas={[buildArticleSchema({...})]}
      const schemaPattern = /(schemas=\{\[buildArticleSchema\(\{[^}]+\}\))/;
      
      if (!schemaPattern.test(content)) {
        console.log(`⚠️  Warning: Could not find schema pattern in ${filename}`);
        continue;
      }

      // Generate FAQ schema data
      const faqData = faqs.map(({ q, a }) => `{ q: '${q.replace(/'/g, "\\'")}', a: '${a.replace(/'/g, "\\'")}' }`).join(', ');

      // Replace schemas array to include FAQ schema
      content = content.replace(
        schemaPattern,
        `$1, buildFAQSchema([${faqData}])`
      );

      await writeFile(filePath, content, 'utf-8');
      console.log(`✅ Added FAQ schema to ${filename} (${faqs.length} Q&A pairs)`);
      totalAdded++;
      
    } catch (error) {
      console.error(`❌ Error processing ${filename}:`, error.message);
    }
  }

  console.log(`\n📊 Summary: Added FAQ schemas to ${totalAdded} blog posts`);
}

addFAQSchemas().catch(console.error);
