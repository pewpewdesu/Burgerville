# Burgerville React - Quick Start Guide

## ✅ Conversion Complete!

Your HTML/CSS/JavaScript website has been fully converted to React with the following improvements:

### What Changed
- ✅ Single Page Application (SPA) with client-side routing
- ✅ Component-based architecture for reusability
- ✅ React Context API for cart state management
- ✅ Automatic localStorage persistence
- ✅ Modern build tool (Vite) for faster development
- ✅ Responsive design maintained

### File Structure
```
Burgerville/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Navigation + cart icon
│   │   ├── Footer.jsx       # Footer with links
│   │   └── CartModal.jsx    # Shopping cart modal
│   ├── context/
│   │   └── CartContext.jsx  # Cart state (Context API)
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Hero section
│   │   ├── Menu.jsx         # Menu with add to cart
│   │   ├── About.jsx        # Restaurant info
│   │   ├── Contact.jsx      # Contact form
│   │   └── Gallery.jsx      # Image slider
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── styles.css           # All styling
├── package.json
├── vite.config.js
├── README.md                # Full documentation
├── DEPLOYMENT.md            # Step-by-step deployment guide
└── index.html               # HTML template
```

---

## 🚀 Running Locally

### Development Mode
```bash
cd Burgerville
npm run dev
```
Then open: `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Creates optimized `dist/` folder

---

## 📤 Deployment (3 Easy Steps)

### Step 1: Push to GitHub
```bash
cd Burgerville
git init
git remote add origin https://github.com/YOUR-USERNAME/burgerville.git
git add .
git commit -m "Initial commit: React conversion"
git push -u origin main
```

### Step 2: Choose a Hosting Provider

**Option A: Vercel** (Recommended)
- Go to vercel.com
- Click "New Project"
- Import your GitHub repo
- Click "Deploy" → Done! 🎉

**Option B: Netlify**
- Go to netlify.com
- Click "Add new site" → "Import an existing project"
- Connect GitHub and deploy

**Option C: GitHub Pages**
```bash
npm install --save-dev gh-pages
npm run deploy
```
Site: `https://YOUR-USERNAME.github.io/burgerville`

---

## 🎯 Key Features Implemented

### 1. Shopping Cart
- Add items with visual feedback
- Update quantities
- Remove items
- Persistent storage (survives page refresh)
- Real-time total calculation

### 2. Navigation
- 5 pages with React Router
- Responsive hamburger menu
- Mobile-friendly design

### 3. Image Gallery
- Auto-rotating slider (3 sec interval)
- Manual prev/next navigation
- Dot indicators for quick jumps
- Responsive sizing

### 4. Responsive Design
- Mobile hamburger menu
- Flexible grid layouts
- Touch-friendly buttons
- Works on all devices

---

## 💡 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Context API** | State management (cart) |
| **CSS3** | Styling with flexbox/grid |

---

## 📝 Customization Tips

### Change Menu Items
Edit `src/pages/Menu.jsx`:
```javascript
const menuItems = [
  {
    name: 'Your Item',
    price: 9.99,
    description: 'Item description',
    image: 'image-url'
  },
  // Add more items...
];
```

### Change Colors
Edit `src/styles.css`:
```css
/* Change orange to your color */
.logo { color: #your-color; }
.btn { background: #your-color; }
```

### Add New Pages
1. Create file: `src/pages/YourPage.jsx`
2. Add to `App.jsx`:
```javascript
<Route path="/your-page" element={<YourPage />} />
```
3. Add link in `Header.jsx` nav menu

---

## 🔧 Environment Variables (Optional)

Create `.env.local` for sensitive data:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📚 Next Steps

1. **Test locally**: `npm run dev`
2. **Push to GitHub** (see deployment guide)
3. **Deploy** to Vercel/Netlify/GitHub Pages
4. **Add features**:
   - Payment processing (Stripe/PayPal)
   - User accounts
   - Search/filters
   - Admin panel
   - Email notifications

---

## 📞 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Need to reinstall?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Images not loading?**
- Check URL is correct and publicly accessible
- Images use external URLs (no local files)

---

## 📖 Documentation

- Full docs: See `README.md`
- Deployment steps: See `DEPLOYMENT.md`
- React docs: https://react.dev
- Vite docs: https://vite.dev
- React Router: https://reactrouter.com

---

## ✨ You're Ready!

Your React app is ready to deploy. Start with Vercel for the fastest, easiest deployment.

Happy coding! 🎉
