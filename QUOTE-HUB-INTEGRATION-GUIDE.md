# Quote Hub Integration Guide

## Overview
This guide explains how to integrate the aero-quote-hub system with orbiparts.com using a hybrid architecture.

## Architecture

```
orbiparts.com (Hostinger)          → Public marketing site
  ├── Main website
  ├── Blog
  └── Landing pages

quote.orbiparts.com (Vercel)       → Internal quote system
  ├── aero-quote-hub app
  ├── Employee-only access
  └── Shared authentication with orbiparts.com
```

## Implementation Steps

### Step 1: Configure Vercel Domain

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `aero-quote-hub` project

2. **Add Custom Domain**
   - Click **Settings** → **Domains**
   - Add domain: `quote.orbiparts.com`
   - Vercel will provide a CNAME record like:
     ```
     cname.vercel-dns.com
     ```
   - Copy this value for the next step

3. **Configure Environment Variables (if needed)**
   - In Vercel project settings → **Environment Variables**
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_key
     ```

### Step 2: Configure DNS in Hostinger

1. **Access Hostinger DNS Management**
   - Login to Hostinger panel
   - Go to: Domains → Manage → DNS / Name Servers → DNS Zone

2. **Add CNAME Record**
   ```
   Type:      CNAME
   Name:      quote
   Points to: cname.vercel-dns.com (from Vercel)
   TTL:       3600 (1 hour)
   ```

3. **Wait for DNS Propagation**
   - Typically takes 5-30 minutes
   - Can take up to 24 hours in rare cases
   - Verify with: `dig quote.orbiparts.com` or `nslookup quote.orbiparts.com`

### Step 3: Enable HTTPS in Vercel

1. **Verify Domain**
   - In Vercel, check that domain shows as "Valid"
   - Vercel automatically provisions SSL certificate

2. **Test HTTPS**
   - Visit: `https://quote.orbiparts.com`
   - Should show valid SSL certificate

### Step 4: Configure Shared Authentication

Both apps share the same Supabase project for seamless authentication.

**In aero-quote-hub `.env`:**
```env
VITE_SUPABASE_URL=https://fjhynjjirvcyeahmlopq.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

**Cookie Domain Configuration:**

To share authentication between `orbiparts.com` and `quote.orbiparts.com`, configure Supabase client with cookie options:

```javascript
// In aero-quote-hub supabase client
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: {
        domain: '.orbiparts.com', // Share cookies across subdomains
        path: '/',
        sameSite: 'lax'
      }
    }
  }
)
```

### Step 5: Access Control

**Navigation Button Added:**
- A "Quote Hub" button has been added to the navbar in orbiparts.com
- Only visible to authenticated users
- Opens in new tab: `https://quote.orbiparts.com`

**Code Implementation:**
```javascript
// In Navbar.jsx
if (user) {
  navItems.push(
    { name: 'Quote Hub', path: 'https://quote.orbiparts.com', external: true },
    { name: 'Components Admin', path: '/admin/components' },
    { name: 'Asset Library', path: '/admin/asset-library' }
  );
}
```

## Verification Checklist

### DNS Configuration
- [ ] CNAME record added in Hostinger DNS
- [ ] `dig quote.orbiparts.com` returns Vercel IP
- [ ] `quote.orbiparts.com` resolves correctly

### Vercel Configuration
- [ ] Domain shows as "Valid" in Vercel
- [ ] SSL certificate provisioned automatically
- [ ] `https://quote.orbiparts.com` loads correctly
- [ ] Environment variables configured

### Authentication
- [ ] Supabase URL and key configured in Vercel
- [ ] Cookie domain set to `.orbiparts.com`
- [ ] Login on orbiparts.com persists to quote.orbiparts.com

### Navigation
- [ ] "Quote Hub" button visible when logged in on orbiparts.com
- [ ] Button opens quote.orbiparts.com in new tab
- [ ] Button hidden when not authenticated

## Benefits of This Architecture

### Performance
- ✅ Vercel Edge Network for quote-hub (300+ locations)
- ✅ Automatic CDN for assets
- ✅ Fast builds (30 seconds)

### Developer Experience
- ✅ Automatic deployments on git push
- ✅ Preview deployments for each PR
- ✅ Instant rollback capability
- ✅ Zero config infrastructure

### Security
- ✅ Automatic SSL certificate renewal
- ✅ DDoS protection included
- ✅ Shared authentication via Supabase
- ✅ Employee-only access

### Costs
- ✅ Vercel Hobby plan: FREE (100GB bandwidth)
- ✅ Only pay for what you use
- ✅ No server maintenance costs

## Troubleshooting

### DNS Not Resolving
```bash
# Check DNS propagation
dig quote.orbiparts.com

# Should return Vercel CNAME
nslookup quote.orbiparts.com
```

### SSL Certificate Issues
- Wait 5-10 minutes after DNS propagates
- Vercel auto-provisions SSL via Let's Encrypt
- Check Vercel dashboard for certificate status

### Authentication Not Working
1. Verify Supabase credentials in Vercel env vars
2. Check cookie domain configuration
3. Ensure both apps use same Supabase project
4. Clear browser cookies and test again

### Quote Hub Not Loading
1. Check Vercel deployment status
2. Verify domain is "Valid" in Vercel
3. Check browser console for errors
4. Verify environment variables are set

## Future Enhancements

### Potential Improvements
1. **Single Sign-On (SSO)**
   - Implement OAuth flow between domains
   - Automatic token refresh

2. **Role-Based Access**
   - Different permissions for employees
   - Admin vs regular user access

3. **Analytics Integration**
   - Track quote hub usage
   - Monitor employee activity

4. **API Gateway**
   - Unified API between both apps
   - Shared data layer

## Support

For issues or questions:
1. Check Vercel dashboard for deployment logs
2. Check Supabase logs for auth issues
3. Review browser console for client errors
4. Contact support if DNS issues persist > 24 hours

---

## Quick Reference

**URLs:**
- Public site: https://orbiparts.com
- Quote Hub: https://quote.orbiparts.com
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com

**DNS Records:**
```
orbiparts.com        → A record → 82.25.113.198 (Hostinger)
quote.orbiparts.com  → CNAME  → cname.vercel-dns.com (Vercel)
```

**Access:**
- Public site: Everyone
- Quote Hub: Authenticated employees only
