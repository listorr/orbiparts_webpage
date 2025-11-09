#!/usr/bin/env node

/**
 * Fix Broken Links Script
 * Automatically corrects broken and inconsistent links across the application
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Link corrections map
const LINK_CORRECTIONS = {
  // Product search normalization
  '"/product-search"': '"/stock"',
  "'/product-search'": "'/stock'",
  
  // Blog URL fixes (remove nonexistent ones)
  '"/blog/miami-aviation-logistics-hub"': '"/blog/miami-aviation-logistics"',
  "'/blog/miami-aviation-logistics-hub'": "'/blog/miami-aviation-logistics'",
  '"/blog/future-of-legacy-aircraft-component-supply"': '"/blog/future-of-legacy-aircraft"',
  "'/blog/future-of-legacy-aircraft-component-supply'": "'/blog/future-of-legacy-aircraft'",
  
  // Fix generic blog links in Related Articles sections
  // These need more specific replacements per file
};

// Specific replacements for Top10 blog Related Articles
const TOP10_BLOG_FIX = {
  oldPattern: /<Link to="\/blog" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"><div className="text-blue-600 font-bold mb-2">Engine Trading Guide<\/div><p className="text-gray-700 text-sm">Complete guide to aircraft engine trading and leasing programs<\/p><\/Link><Link to="\/blog" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"><div className="text-blue-600 font-bold mb-2">Helicopter Parts Sourcing<\/div><p className="text-gray-700 text-sm">Expert strategies for sourcing rotorcraft components worldwide<\/p><\/Link><Link to="\/blog" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"><div className="text-blue-600 font-bold mb-2">Procurement Software Guide<\/div><p className="text-gray-700 text-sm">How AI procurement platforms reduce costs and improve efficiency<\/p><\/Link>/g,
  newPattern: `<Link to="/blog/global-aircraft-parts-supply-chains" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"><div className="text-blue-600 font-bold mb-2">Global Supply Chain Strategies</div><p className="text-gray-700 text-sm">How multi-region distribution and blockchain technology overcome post-COVID disruptions and semiconductor shortages</p></Link><Link to="/blog/sustainable-aviation-component-trading" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"><div className="text-blue-600 font-bold mb-2">Sustainable Aviation & USM Parts</div><p className="text-gray-700 text-sm">40-70% carbon reduction through circular economy practices and ICAO CORSIA compliance</p></Link><Link to="/blog/technology-trends-aircraft-component-management" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"><div className="text-blue-600 font-bold mb-2">Technology Trends in Aviation</div><p className="text-gray-700 text-sm">AI, blockchain, and digital twins transforming component management and predictive maintenance</p></Link>`
};

function getAllFilesToFix(dir, files = []) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!item.startsWith('.') && item !== 'node_modules') {
        getAllFilesToFix(fullPath, files);
      }
    } else if (extname(item) === '.jsx' || extname(item) === '.js') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function fixLinksInFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;
  const changes = [];
  
  // Apply general corrections
  for (const [oldLink, newLink] of Object.entries(LINK_CORRECTIONS)) {
    const oldContent = content;
    content = content.replaceAll(oldLink, newLink);
    if (content !== oldContent) {
      modified = true;
      changes.push(`${oldLink} → ${newLink}`);
    }
  }
  
  // Apply specific fix for Top10 blog
  if (filePath.includes('Top10AircraftPartsSuppliers2025.jsx')) {
    const oldContent = content;
    content = content.replace(TOP10_BLOG_FIX.oldPattern, TOP10_BLOG_FIX.newPattern);
    if (content !== oldContent) {
      modified = true;
      changes.push('Fixed Related Articles section with specific blog links');
    }
  }
  
  return { modified, content, changes };
}

function main() {
  console.log('\n🔧 Fixing Broken Links...\n');
  console.log('='.repeat(60));
  
  const srcDir = 'src';
  const files = getAllFilesToFix(srcDir);
  
  let totalFixed = 0;
  const fixedFiles = [];
  
  for (const file of files) {
    const { modified, content, changes } = fixLinksInFile(file);
    
    if (modified) {
      writeFileSync(file, content, 'utf-8');
      totalFixed++;
      fixedFiles.push({
        file: file.replace(process.cwd() + '/', ''),
        changes
      });
    }
  }
  
  if (totalFixed === 0) {
    console.log('✅ No broken links found - all links are valid!\n');
    return;
  }
  
  console.log(`\n✅ Fixed links in ${totalFixed} file(s):\n`);
  
  for (const { file, changes } of fixedFiles) {
    console.log(`📄 ${file}`);
    for (const change of changes) {
      console.log(`   ✓ ${change}`);
    }
    console.log('');
  }
  
  console.log('='.repeat(60));
  console.log(`\n✨ Successfully fixed ${totalFixed} file(s)\n`);
}

main();
