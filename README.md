# Ludovic Bostral - Strategic Technology Consulting Website

A professional one-page website showcasing consulting services for streaming/OTT technology platforms.

## 🎯 Overview

This website presents Ludovic Bostral's expertise in streaming technology consulting, featuring:
- 25+ years of experience in OTT platforms
- Y Combinator Alumni (Summer 2015)
- Creator of M6 Replay, Co-founder of Afrostream, CTO at Majelan
- Author of "Streaming Radar" newsletter
- Co-host of "On va taper dedans" podcast

## 📋 Features

- ✅ **Multilingual Support**: English, French, and Chinese (stored in localStorage)
- ✅ **Responsive Design**: Mobile-first approach, works on all devices
- ✅ **Modern Design**: Clean, professional aesthetic inspired by Streaming Radar branding
- ✅ **Smooth Animations**: Scroll-triggered fade-in effects
- ✅ **SEO Optimized**: Proper meta tags and structured data
- ✅ **Performance Optimized**: Lazy loading images, clean code
- ✅ **No Dependencies**: Pure HTML/CSS/JavaScript (no frameworks required)

## 🎨 Design System

### Color Palette
- **Primary**: `#1a3d5c` (Dark blue)
- **Secondary**: `#f5f0e8` (Cream/beige)
- **Accent**: `#d4825c` (Orange/copper)
- **Text Dark**: `#1a1a1a`
- **Text Light**: `#666666`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 📁 Project Structure

```
ludovicbostral/
├── index.html          # Main HTML file with semantic structure
├── style.css           # All styles with responsive breakpoints
├── script.js           # JavaScript for interactivity and translations
├── assets/
│   └── big.jpeg        # Streaming Radar logo (PLACE YOUR IMAGE HERE)
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- A web server (for local development)

### Installation

1. **Clone the repository** (if using Git):
   ```bash
   git clone <repository-url>
   cd ludovicbostral
   ```

2. **Add your logo**:
   - Place the `big.jpeg` file in the `assets/` folder
   - The logo should be high-quality (recommended: at least 800x800px)

3. **Local Development**:

   **Option 1: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000

   # Then open: http://localhost:8000
   ```

   **Option 2: Using Node.js**
   ```bash
   npx http-server -p 8000

   # Then open: http://localhost:8000
   ```

   **Option 3: Using VS Code**
   - Install "Live Server" extension
   - Right-click on `index.html` → "Open with Live Server"

## 🌐 Deployment

### Option 1: Netlify (Recommended)

1. **Via Netlify Drop**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the entire folder
   - Done! Your site is live

2. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Via Git**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository in Netlify
   - Deploy automatically on every push

### Option 2: Vercel

```bash
npm i -g vercel
vercel --prod
```

### Option 3: GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source: main branch / root
4. Your site will be live at: `https://yourusername.github.io/repository-name`

### Option 4: Traditional Web Hosting

Upload all files via FTP to your web hosting provider:
- `index.html`
- `style.css`
- `script.js`
- `assets/` folder with images

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --color-primary: #1a3d5c;      /* Your brand color */
    --color-secondary: #f5f0e8;    /* Background accent */
    --color-accent: #d4825c;       /* CTA buttons */
}
```

### Updating Content

1. **English Content**: Edit `translations.en` object in `script.js`
2. **French Content**: Edit `translations.fr` object in `script.js`
3. **Chinese Content**: Edit `translations.zh` object in `script.js`

### Changing Contact Email

Replace `lbostral@gmail.com` in:
- `index.html` (all mailto links)
- Update footer if needed

### Adding Analytics

Add your analytics code at the bottom of `script.js`:

```javascript
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 SEO Optimization

The website includes:
- Semantic HTML5 markup
- Open Graph meta tags
- Structured Data (JSON-LD)
- Proper heading hierarchy
- Alt text for images
- Mobile-responsive meta viewport

### Adding Custom Domain

After deployment, configure your custom domain in your hosting provider:
1. Add DNS records (A or CNAME)
2. Enable HTTPS/SSL certificate
3. Update canonical URLs in meta tags

## 📊 Performance

- ⚡ Lighthouse Score Target: 90+
- 🖼️ Image optimization: Use WebP format for better compression
- 🚀 Lazy loading: Implemented for all images
- 📦 Minification: Consider minifying CSS/JS for production

### Optimizing for Production

```bash
# Minify HTML
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# Minify CSS
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# Minify JavaScript
npm install -g terser
terser script.js -o script.min.js -c -m
```

## 🔒 Security Headers

Add these headers in your hosting configuration for better security:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 🐛 Troubleshooting

### Images not loading
- Verify `big.jpeg` is in the `assets/` folder
- Check file name spelling (case-sensitive on Linux/Mac)
- Ensure image permissions are correct

### Language switching not working
- Check browser console for JavaScript errors
- Verify translations object in `script.js`
- Clear browser localStorage and try again

### Animations not triggering
- Ensure JavaScript is enabled
- Check that IntersectionObserver is supported (use polyfill if needed)

## 📝 License

© 2026 Ludovic Bostral. All rights reserved.

## 📧 Contact

**Ludovic Bostral**
- 📧 Email: lbostral@gmail.com
- 💼 LinkedIn: [linkedin.com/in/ludovicbostral](https://linkedin.com/in/ludovicbostral)
- 📰 Newsletter: [streamingradar.substack.com](https://streamingradar.substack.com)
- 🎙️ Podcast: [On va taper dedans](https://streamingradar.substack.com/podcast)

---

**Made with ❤️ in Nantes, France**
