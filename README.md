# Burgerville Restaurant - React App

A modern React application for a restaurant website featuring menu browsing, shopping cart functionality, and image gallery.

## Features

- **Multi-page Navigation**: Home, Menu, About, Contact, and Gallery pages
- **Shopping Cart**: Add/remove items, update quantities, persistent storage with localStorage
- **Image Gallery**: Auto-rotating slider with manual navigation
- **Responsive Design**: Mobile-friendly interface with hamburger menu
- **State Management**: React Context API for cart management
- **Modern Stack**: Vite + React + React Router

## Project Structure

```
src/
├── components/
│   ├── Header.jsx      # Navigation and cart icon
│   ├── Footer.jsx      # Footer with social links
│   └── CartModal.jsx   # Shopping cart modal
├── context/
│   └── CartContext.jsx # Cart state management
├── pages/
│   ├── Home.jsx        # Hero section
│   ├── Menu.jsx        # Menu items with add to cart
│   ├── About.jsx       # About page
│   ├── Contact.jsx     # Contact form and map
│   └── Gallery.jsx     # Image slider
├── App.jsx            # Main app with routing
├── main.jsx           # Entry point
└── styles.css         # All styling
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/burgerville.git
cd Burgerville
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Vercel will automatically detect it's a Vite app and configure everything for you.

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Deploy"

### Option 3: GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/',
})
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json`:
```json
"deploy": "npm run build && gh-pages -d dist"
```

4. Run:
```bash
npm run deploy
```

## Features Breakdown

### Shopping Cart
- Add items to cart with visual feedback
- Update quantities
- Remove items
- Cart persists using localStorage
- Real-time total calculation

### Gallery
- Auto-rotating image slider (3-second interval)
- Manual navigation with prev/next buttons
- Dot indicators to jump to specific slides
- Responsive image display

### Responsive Design
- Mobile hamburger menu
- Flexible grid layout
- Touch-friendly buttons and inputs
- Adaptive font sizes

## Technology Stack

- **React 19**: Latest React features
- **Vite**: Fast build tool and dev server
- **React Router v7**: Client-side routing
- **Context API**: State management
- **CSS3**: Modern styling with flexbox and grid

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Payment integration (Stripe, PayPal)
- User accounts and order history
- Search and filter functionality
- Admin dashboard
- Email notifications

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.
