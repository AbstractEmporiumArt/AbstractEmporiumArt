# Abstract Emporium Art Website

A modern, responsive website for Abstract Emporium Art featuring an art gallery, links to multiple shop platforms, and contact functionality.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Gallery Section**: Showcase your artwork with an attractive grid layout
- **Multi-Platform Shop Links**: Direct links to ArtPal, Fine Art America, and The HUG
- **Contact Form**: Allow visitors to get in touch
- **SEO Optimized**: Meta tags and structured HTML for search engine visibility
- **Smooth Navigation**: Sticky navigation with smooth scrolling

## File Structure

```
.
├── index.html       # Main HTML file
├── styles.css       # Styling and responsive design
├── script.js        # Interactive functionality
└── README.md        # This file
```

## Setup Instructions

### 1. Local Development

1. Clone or download the repository
2. Copy your `abstract-emporium-logo.png` to the same directory as these files
3. Open `index.html` in a web browser

### 2. Deploy to Cloudflare Pages

1. Push code to GitHub: https://github.com/AbstractEmporiumArt/AbstractEmporiumArt
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push
   ```

2. Go to Cloudflare Dashboard: https://dash.cloudflare.com/0a2b8d39c57ff362616d548756bffa45/home/domains

3. Connect your GitHub repository to Cloudflare Pages:
   - Go to "Pages" section
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose your GitHub repository
   - Set build command (leave blank if no build needed)
   - Set publish directory to root (`.` or `/`)

4. Set custom domain in Cloudflare

### 3. Customize the Website

- **Edit Gallery**: Modify the gallery items in `index.html` (lines ~99-130)
- **Update Colors**: Change CSS variables in `styles.css` (lines 14-20)
- **Add Real Images**: Replace placeholder images with actual artwork
- **Contact Form**: The form currently logs to console; integrate with a backend service for real email functionality

## Adding Real Images

1. Replace placeholder divs with actual image tags:
```html
<img src="path/to/artwork.jpg" alt="Artwork Title">
```

2. Add the logo file to the root directory:
```
abstract-emporium-logo.png
```

## SEO Tips

- Update meta descriptions in `index.html`
- Add structured data (JSON-LD) for better search visibility
- Create a sitemap.xml file
- Submit to Google Search Console and Bing Webmaster Tools
- Add schema markup for organization and image data

## Contact Form Integration

To make the contact form functional, integrate with a backend service:
- Formspree (https://formspree.io/)
- EmailJS (https://www.emailjs.com/)
- Netlify Forms (if deploying to Netlify)

## Traffic and Sales Strategy

1. **SEO Optimization**: Add Google Analytics and Search Console
2. **Social Media**: Link to social profiles on the website
3. **Platform Integration**: Prominently link to your three shop platforms
4. **Regular Updates**: Keep gallery fresh with new artwork
5. **Content Marketing**: Create blog posts about your art process
6. **Email Marketing**: Collect emails and create newsletters

## Shop Links

- **ArtPal**: https://www.artpal.com/Abstractemporium/
- **Fine Art America**: https://fineartamerica.com/profiles/lissa-beaulieu/shop
- **The HUG**: https://thehug.xyz/artists/AbstractEmporiumArt/shop

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2025 Abstract Emporium Art. All rights reserved.
