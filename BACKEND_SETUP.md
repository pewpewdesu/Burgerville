# Burgerville Full-Stack Application - Backend Setup

## 🎯 Overview

Your Burgerville restaurant application now has a complete backend infrastructure with Node.js, Express, and MongoDB. This guide will walk you through setting up and running both the backend and frontend.

## 📋 What's New

### Backend Features
✅ **Menu Management** - Store menu items in MongoDB  
✅ **Order Processing** - Save customer orders to database  
✅ **Data Persistence** - All changes are persisted to MongoDB  
✅ **REST API** - Full-featured REST API for menu and orders  
✅ **Error Handling** - Comprehensive error handling and validation  
✅ **CORS Support** - Configured for frontend integration  

### Frontend Updates
✅ **API Integration** - Menu.jsx fetches from API  
✅ **Order Checkout** - CartModal now includes customer info form  
✅ **Order Submission** - Orders sent to backend via API  
✅ **Order Confirmation** - Display order number after successful checkout  

## 🚀 Quick Start

### Prerequisites
Make sure you have installed:
- **Node.js** v14+ - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- **npm** (included with Node.js)

### Step 1: Setup MongoDB

**Option A: Local MongoDB (Recommended for development)**

```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Verify MongoDB is running
mongo

# Type: exit (to quit)
```

**Option B: MongoDB Atlas (Cloud - Easiest)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Create a database user (username & password)
5. Get your connection string
6. Copy it to `backend/.env` as `MONGODB_URI`

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/burgerville
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/burgerville
```

### Step 4: Seed the Database

```bash
npm run seed
```

You should see:
```
✓ Connected to MongoDB
✓ Cleared existing menu items
✓ Seeded 6 menu items successfully

=== Seeded Menu Items ===
- Classic Burger ($8.99) - burger
- Loaded Fries ($4.99) - sides
- Cheese Pizza ($12.99) - pizza
- Crispy Chicken Sandwich ($9.49) - sandwich
- Classic Cola ($2.49) - drink
- Strawberry Smoothie ($4.99) - drink

✓ Database seeding completed successfully
```

### Step 5: Start the Backend Server

```bash
npm run dev
```

You should see:
```
✓ Connected to MongoDB
✓ Burgerville API Server running on http://localhost:5000
✓ MongoDB: mongodb://localhost:27017/burgerville
✓ CORS Origin: http://localhost:5173
```

### Step 6: In Another Terminal, Start the Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📝 Project Structure

```
Burgerville/
├── backend/
│   ├── models/
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── seed.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── src/
│   ├── api/
│   │   └── apiService.js (NEW)
│   ├── components/
│   │   └── CartModal.jsx (UPDATED)
│   ├── context/
│   │   └── CartContext.jsx (UPDATED)
│   ├── pages/
│   │   └── Menu.jsx (UPDATED)
│   ├── styles.css (UPDATED with checkout styles)
│   └── ...
├── .env (NEW - Frontend API URL config)
├── package.json
└── vite.config.js
```

## 🔄 How It Works

### User Journey

1. **Browse Menu**
   - User visits `/menu`
   - Frontend calls `GET /api/menu`
   - Backend queries MongoDB and returns menu items
   - Items display on page

2. **Add to Cart**
   - User clicks "Add to Cart"
   - Item added to React Context state
   - Cart count updates in header

3. **Checkout**
   - User clicks "Checkout" button
   - Form appears for customer info
   - User enters: name, email, phone, address
   - User clicks "Place Order"

4. **Order Submitted**
   - Frontend calls `POST /api/orders`
   - Backend validates order data
   - Order saved to MongoDB with unique order number
   - Order confirmation displayed with order number
   - Cart clears automatically

5. **Track Order**
   - Order number can be used to track status
   - Admin can view all orders at `/api/orders`
   - Order status can be updated: pending → confirmed → preparing → ready → delivered

## 📡 API Endpoints

### Menu (Public)
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item

### Orders (Public & Admin)
- `POST /api/orders` - Create new order (Customer)
- `GET /api/orders/number/:orderNumber` - Track order
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order (Admin)
- `PATCH /api/orders/:id/status` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

Full API documentation: See `backend/README.md`

## 🛠️ Useful Commands

### Backend
```bash
npm run dev              # Start development server with auto-reload
npm start               # Start production server
npm run seed            # Populate database with sample menu items
```

### Frontend
```bash
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check for linting errors
```

## 🔍 Testing the API

### Using cURL

```bash
# Get all menu items
curl http://localhost:5000/api/menu

# Get health status
curl http://localhost:5000/api/health

# Create an order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name": "Classic Burger", "price": 8.99, "quantity": 1}
    ],
    "total": 8.99,
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "address": "123 Main St"
    }
  }'
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the collection or manually create requests
3. Test endpoints at `http://localhost:5000/api/*`

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
```

### MongoDB connection error
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community

# Or if using mongod directly
mongod
```

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:5000`
- Check `.env` file has `VITE_API_URL=http://localhost:5000/api`
- Check browser console for CORS errors
- Verify `CORS_ORIGIN` in backend `.env` matches frontend URL

### Menu items not showing
- Make sure you ran `npm run seed`
- Check MongoDB is running and has data
- Check browser network tab for API errors

## 📚 Next Steps

### Add Features
- User authentication
- Order history per user
- Payment integration
- Admin dashboard
- Email notifications
- Real-time order status updates

### Deploy
- Deploy backend to Heroku, Railway, or Render
- Deploy frontend to Vercel or Netlify
- Set up production MongoDB Atlas cluster
- Configure environment variables on hosting platform

### Improve
- Add input validation/sanitization
- Add logging
- Add rate limiting
- Add API documentation (Swagger/OpenAPI)
- Add unit tests
- Add CI/CD pipeline

## 📞 Support

For issues or questions:
1. Check the backend `README.md` for detailed API documentation
2. Review error messages in browser console and terminal
3. Check MongoDB connection and status
4. Verify all environment variables are set correctly

## 🎉 You're All Set!

Your Burgerville application now has:
- ✅ Full backend API
- ✅ MongoDB database integration
- ✅ Order processing system
- ✅ Menu management
- ✅ Frontend-backend integration

Start both servers and test the complete workflow!
