# 🍔 Burgerville - Quick Start Guide (5 Minutes)

## ⚡ TL;DR - Get Running in 5 Steps

### Step 1: Install & Start MongoDB (1 min)
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community
```

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud, no install needed)

### Step 2: Setup Backend (2 min)
```bash
cd backend
npm install
npm run seed
npm run dev
```

You'll see:
```
✓ Burgerville API Server running on http://localhost:5000
```

### Step 3: Setup Frontend (1 min)
In a new terminal:
```bash
npm install
npm run dev
```

You'll see:
```
  ➜  Local:   http://localhost:5173
```

### Step 4: Open Your Browser
```
http://localhost:5173
```

### Step 5: Test It!
1. Go to "Menu" → Menu items load from database ✅
2. Add items to cart
3. Click "Checkout" → Fill in customer info
4. Click "Place Order" → Get order confirmation ✅

**Done! 🎉 Your full-stack app is running!**

---

## 📋 What Each Part Does

| Part | Purpose | Port |
|------|---------|------|
| Frontend (React) | Displays menu, shopping cart, checkout form | 5173 |
| Backend (Express) | Handles API requests, validates data | 5000 |
| Database (MongoDB) | Stores menu items and orders | 27017 |

---

## 🔄 Data Flow

```
User Browser (React App)
    ↓
GET /api/menu → Get menu items from database
    ↓
Add items to cart (stored in browser)
    ↓
Checkout form → Collect customer info
    ↓
POST /api/orders → Save order to database
    ↓
Order confirmation with order number
```

---

## 🆘 Common Issues

### "Can't connect to MongoDB"
```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Or use MongoDB Atlas (free cloud option)
```

### "Port 5000 in use"
Change in `backend/.env`:
```env
PORT=5001
```

### "Menu items not loading"
1. Check backend is running: `npm run dev` in backend folder
2. Run seeding: `npm run seed`
3. Check network tab in browser (F12 → Network)

---

## 📚 Full Documentation

- **Setup Guide**: [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **API Reference**: [backend/README.md](./backend/README.md)
- **API Testing**: [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)

---

## 🎯 Next Steps

### Test the API
```bash
# In another terminal, test the API
curl http://localhost:5000/api/menu
```

### Create Admin Features
Add routes to view all orders (already in backend):
```
http://localhost:5000/api/orders
```

### Customize
- Add more menu items to `backend/seed.js`
- Change styling in `src/styles.css`
- Add payment processing
- Send order confirmation emails

---

## 🚀 Deploy to Production

1. **Deploy Backend**: [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com)
2. **Deploy Frontend**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. **Database**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📞 Quick Commands Reference

### Backend
```bash
cd backend

npm install              # Install dependencies
npm run dev            # Start dev server (port 5000)
npm run seed           # Add sample menu items to database
npm start              # Start production server
```

### Frontend
```bash
npm install            # Install dependencies
npm run dev           # Start dev server (port 5173)
npm run build         # Build for production
```

### Database
```bash
# macOS
brew services start mongodb-community      # Start MongoDB
brew services stop mongodb-community       # Stop MongoDB
brew services list                         # Check status
```

---

## ✨ You're Ready!

Your Burgerville app is now a full-stack application with:
- ✅ React frontend with shopping cart
- ✅ Express backend with REST API
- ✅ MongoDB database for persistence
- ✅ Complete order processing workflow

**Happy coding! 🎉**
