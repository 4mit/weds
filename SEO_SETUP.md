# SEO Setup Guide

This wedding website has been optimized for search engines with comprehensive SEO features.

## SEO Features Implemented

### 1. Enhanced Metadata (`src/app/layout.tsx`)
- **Title Tags**: Optimized with wedding date and couple names
- **Meta Description**: Comprehensive description with keywords
- **Keywords**: Relevant wedding-related keywords
- **Open Graph Tags**: For social media sharing (Facebook, LinkedIn)
- **Twitter Card Tags**: For Twitter sharing
- **Canonical URLs**: Prevents duplicate content issues
- **Robots Meta**: Proper indexing instructions for search engines

### 2. Sitemap (`src/app/sitemap.ts`)
- Automatically generates XML sitemap for search engines
- Accessible at `/sitemap.xml`
- Helps search engines discover and index all pages

### 3. Robots.txt (`public/robots.txt`)
- Guides search engine crawlers
- Points to sitemap location
- Allows all search engines to crawl the site

### 4. Structured Data (JSON-LD)
- Event schema markup in `src/app/page.tsx`
- Helps Google understand the wedding event details
- Enables rich snippets in search results
- Includes:
  - Event name, description, dates
  - Location information
  - Organizer details
  - Performer (couple) information

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://your-wedding-domain.com
```

Replace `https://your-wedding-domain.com` with your actual domain name.

**Important**: Update the `siteUrl` variable in `src/app/layout.tsx` if you don't use environment variables.

## SEO Best Practices Implemented

✅ **Title Optimization**: Includes primary keywords and wedding date
✅ **Meta Descriptions**: Compelling descriptions with call-to-action
✅ **Keywords**: Relevant wedding and event-related keywords
✅ **Open Graph**: Social media optimization
✅ **Structured Data**: Schema.org Event markup
✅ **Mobile-Friendly**: Responsive design (already implemented)
✅ **Fast Loading**: Optimized assets and code
✅ **Sitemap**: XML sitemap for search engines
✅ **Robots.txt**: Proper crawler instructions

## Additional SEO Recommendations

1. **Add Images**: 
   - Create an `og-image.jpg` (1200x630px) for social sharing
   - Place it in the `public` folder
   - Add alt text to all images

2. **Google Search Console**:
   - Submit your sitemap: `https://your-domain.com/sitemap.xml`
   - Verify ownership
   - Monitor search performance

3. **Google Analytics**:
   - Already implemented via Analytics component
   - Track user behavior and engagement

4. **Page Speed**:
   - Optimize images (use WebP format)
   - Minimize JavaScript bundles
   - Enable compression

5. **Content**:
   - Add more descriptive text content
   - Include location details
   - Add venue information

6. **Backlinks**:
   - Share on social media
   - Submit to wedding directories
   - Get featured on wedding blogs

## Testing Your SEO

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
3. **PageSpeed Insights**: https://pagespeed.web.dev/
4. **Schema Markup Validator**: https://validator.schema.org/

## Keywords Targeted

- Soni Family Wedding
- Wedding Invitation
- Indian Wedding
- Wedding Journey
- Amit Ranjana Wedding
- Laxminarayan Pratima Wedding
- Mehendi Ceremony
- Haldi Ceremony
- Sangeet
- Barat
- Wedding Ceremony
- Reception
- February 2026 Wedding
- Interactive Wedding
- Wedding Website
- Digital Wedding Invitation

## Next Steps

1. Deploy your site
2. Set up Google Search Console
3. Submit sitemap
4. Monitor search rankings
5. Share on social media for backlinks
6. Add more content as needed

---

**Note**: Remember to update the `NEXT_PUBLIC_SITE_URL` environment variable with your actual domain before deploying!
