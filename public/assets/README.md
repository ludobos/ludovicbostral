# Assets Folder

## 📁 Place Your Images Here

### Required Image

**big.jpeg** - Streaming Radar Logo
- This is the main logo/illustration for the website
- **Required dimensions**: Minimum 800x800px (recommended: 1200x1200px)
- **Format**: JPEG or PNG
- **File name**: Must be exactly `big.jpeg` (or you can update references in `index.html`)

### Where the logo appears:
1. **Hero Section**: Large display next to the main title
2. **Content Section**: Smaller version next to "Streaming Radar" newsletter

## 📝 Image Optimization Tips

For best performance:
- Use **WebP format** if possible (better compression)
- Compress images before uploading (use tools like TinyPNG, Squoosh, or ImageOptim)
- Keep file size under 500KB for optimal loading speed

## 🖼️ Example Structure

```
assets/
├── big.jpeg          ← Your Streaming Radar logo (REQUIRED)
├── favicon.ico       ← Optional: Browser tab icon
└── og-image.jpg      ← Optional: Social media preview image
```

## 🔄 If You Need to Use a Different Image Name

If your image file has a different name, update these references:

1. In `index.html`:
   - Search for `./assets/big.jpeg`
   - Replace with your image filename

2. Consider using image optimization:
   ```bash
   # Example with ImageMagick
   convert your-image.png -resize 1200x1200 -quality 85 big.jpeg
   ```

---

**Need help?** Contact: ludovic@bostral.com
