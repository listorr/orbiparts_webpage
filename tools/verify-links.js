#!/usr/bin/env node

/**
 * Link Verification Tool
 * Checks all links in JSX files and reports broken/incorrect routes
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Valid routes based on App.jsx
const VALID_ROUTES = [
  '/',
  '/about',
  '/services',
  '/stock',
  '/industries',
  '/contact',
  '/modern-fleets',
  '/legacy-aircraft',
  '/aog-support',
  '/global-reach',
  '/why-orbiparts',
  '/engine-trading',
  '/aircraft-trading',
  '/blog',
  '/blog/top-10-aircraft-parts-suppliers-2025',
  '/blog/future-of-legacy-aircraft',
  '/blog/miami-aviation-logistics',
  '/blog/aog-response-strategies',
  '/blog/sustainable-aviation-component-trading',
  '/blog/global-aircraft-parts-supply-chains',
  '/blog/technology-trends-aircraft-component-management',
  '/blog/future-of-legacy-aircraft-component-supply',
  '/blog/miami-aviation-logistics-hub'
];

// Route aliases/redirects
const ROUTE_ALIASES = {
  '/search': '/stock',
  '/products': '/stock',
  '/product-search': '/stock',
  '/why-choose-us': '/why-orbiparts',
  '/blog/future-of-legacy-aircraft': '/blog/future-of-legacy-aircraft-component-supply',
  '/blog/miami-aviation-logistics': '/blog/miami-aviation-logistics-hub'
};

// Pattern to match Link to= or href= in JSX
const LINK_PATTERN = /(?:to|href)=["']([^"']+)["']/g;

function getAllJsxFiles(dir, files = []) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!item.startsWith('.') && item !== 'node_modules') {
        getAllJsxFiles(fullPath, files);
      }
    } else if (extName(item) === '.jsx' || extname(item) === '.js') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function verifyLinks() {
  const srcDir = 'src';
  const jsxFiles = getAllJsxFiles(srcDir);
  
  const issues = [];
  
  for (const file of jsxFiles) {
    const content = readFileSync(file, 'utf-8');
    const matches = [...content.matchAll(LINK_PATTERN)];
    
    for (const match of matches) {
      const link = match[1];
      
      // Skip external links, mailto, tel, anchors
      if (link.startsWith('http') || 
          link.startsWith('mailto:') || 
          link.startsWith('tel:') ||
          link.startsWith('#') ||
          link.includes('google.com/maps')) {
        continue;
      }
      
      // Check if link is valid or has an alias
      const resolvedLink = ROUTE_ALIASES[link] || link;
      
      if (!VALID_ROUTES.includes(resolvedLink)) {
        issues.push({
          file: file.replace(process.cwd() + '/', ''),
          link,
          suggestion: ROUTE_ALIASES[link] ? `Use ${ROUTE_ALIASES[link]} instead` : 'Invalid route'
        });
      }
    }
  }
  
  // Report issues
  console.log('\n🔍 Link Verification Report\n');
  console.log('='.repeat(60));
  
  if (issues.length === 0) {
    console.log('✅ All links are valid!\n');
    return;
  }
  
  console.log(`⚠️  Found ${issues.length} problematic link(s):\n`);
  
  const grouped = {};
  for (const issue of issues) {
    if (!grouped[issue.file]) {
      grouped[issue.file] = [];
    }
    grouped[issue.file].push(issue);
  }
  
  for (const [file, fileIssues] of Object.entries(grouped)) {
    console.log(`📄 ${file}`);
    for (const issue of fileIssues) {
      console.log(`   ❌ ${issue.link} → ${issue.suggestion}`);
    }
    console.log('');
  }
  
  console.log('='.repeat(60));
  console.log(`\nTotal issues: ${issues.length}\n`);
}

verifyLinks();
