# The Richard White Farm - Website

A beautiful parallax scrolling website showcasing the historic Richard White Farm's journey from 1780 to today.

## Setup Instructions

### 1. Add Your Home Image

Save your home photo as `home-front.jpg` in the same directory as the HTML file (C:\Users\JP\lilly\).

The website is currently configured to use this image in multiple places:
- Hero section background
- Transition parallax sections
- Final call-to-action section

### 2. Opening the Website

Simply open `index.html` in your web browser:
- Double-click the file, or
- Right-click and select "Open with" → Your preferred browser

### 3. Customization Options

#### Update Contact Information
Edit the contact section in `index.html` (line ~318) to add:
- Real estate agent name
- Phone number
- Email address

#### Add More Images
To add additional photos of the property:
1. Save images in the same directory
2. Update the background image URLs in `index.html`:
   - Find `style="background-image: url('home-front.jpg')"`
   - Replace with your image filename

Example section locations:
- Line ~20: Hero section
- Line ~140: First transition
- Line ~220: Second transition
- Line ~280: Final hero

#### Adjust Colors
The color scheme can be modified in `styles.css`:
- Line 10-16: CSS variables for colors
- Primary colors: Browns and golds (heritage theme)
- Accent colors: Greens (farm/nature theme)

## Features

### Parallax Scrolling
- Smooth background movement at different speeds
- Creates depth and engagement as visitors scroll

### Story Journey
The website is organized into chapters:
1. **Beginnings in 1780** - Original construction and 1852 renewal
2. **A Century of Stewardship** - Farm operations and family history
3. **Richard & Ruth White** - September 1928 acquisition
4. **Transformation** - Modern renovation details
5. **Living the Story** - Future owner's journey

### Interactive Elements
- Smooth navigation with active link highlighting
- Fade-in animations as sections come into view
- Hover effects on cards and features
- Scroll progress indicator at top
- Mobile-responsive design

### Responsive Design
The website automatically adapts to:
- Desktop computers
- Tablets
- Mobile phones

## Technical Details

### Files Included
- `index.html` - Main website structure
- `styles.css` - All styling and visual design
- `script.js` - Interactive features and parallax effects
- `README.md` - This documentation

### Browser Compatibility
Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

### Performance Optimizations
- Throttled scroll events for smooth performance
- Lazy loading for images
- Debounced resize events
- CSS transforms for hardware acceleration

## Customization Guide

### Adding Property Features
To showcase additional features, add to the experience grid (line ~240 in index.html):

```html
<div class="experience-card">
    <div class="experience-icon">🏡</div>
    <h3>Your Feature</h3>
    <p>Description of the feature</p>
</div>
```

### Adding Timeline Events
To add more historical milestones, create a new story section following the pattern:

```html
<section class="story-section parallax-section">
    <div class="parallax-bg parallax-slow" style="background: linear-gradient(...)"></div>
    <div class="content-wrapper">
        <div class="story-content fade-in">
            <span class="chapter-number">Your Chapter</span>
            <h2 class="section-title">Your Title</h2>
            <div class="year-badge">Year Range</div>
            <div class="story-text">
                <p>Your content...</p>
            </div>
        </div>
    </div>
</section>
```

### Updating Property Stats
Edit the property highlights section (line ~210 in index.html):
- Number of bedrooms
- Number of bathrooms
- Price
- Square footage (if you want to add it)

## Next Steps

1. Save your home image as `home-front.jpg`
2. Open `index.html` in a browser to preview
3. Customize contact information
4. Add more photos if desired
5. Share the website or deploy online

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Enable GitHub Pages in repository settings
5. Your site will be live at: `https://yourusername.github.io/repository-name/`

### Option 2: Netlify (Free)
1. Create a Netlify account
2. Drag and drop the folder
3. Get an instant URL
4. Optional: Connect a custom domain

### Option 3: Traditional Web Hosting
Upload all files to your web hosting provider via FTP or their file manager.

## Support

For questions or modifications, refer to the code comments in each file. All sections are clearly labeled and organized for easy customization.

---

**Built with care to honor the legacy of the Richard White Farm**
