# 🍔 Burgerville Restaurant - Full-Stack Application

## 📚 Complete Documentation Index

Welcome! Your Burgerville application now has a complete backend with Node.js, Express, and MongoDB. Use the guides below based on your needs.

---

## 🚀 Getting Started

### **New to the project?** → Start here
👉 **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- Quick installation steps
- All commands you need
- Simple verification that everything works

### **Ready for detailed setup?** → Read this
👉 **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Comprehensive setup guide
- Prerequisites and installation
- MongoDB setup (local or cloud)
- Backend configuration
- Troubleshooting common issues

---

## 📖 Understanding the System

### **Want to understand the architecture?** → See this
👉 **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design documentation
- Visual diagrams of data flow
- Component relationships
- Database schema design
- Technology stack explanation
- Scalability path

### **Implemented what?** → Check this
👉 **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built
- List of all files created/modified
- Features implemented
- How to test the application
- Next steps and enhancements

---

## 🔧 API Reference & Testing

### **How do I test the API?** → Use this
👉 **[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)** - Complete API documentation
- Test endpoints with cURL, Postman, REST Client
- Request/response examples
- Error handling examples
- Complete test workflow

### **Need backend technical details?** → Read this
👉 **[backend/README.md](./backend/README.md)** - Backend API documentation
- Endpoint reference
- Project structure explanation
- Error handling
- Deployment guide

---

## 🆘 Problems?

### **Something isn't working?** → Troubleshoot here
👉 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues & solutions
- MongoDB connection errors
- Port already in use
- Missing dependencies
- Menu items not loading
- Order submission fails
- Database persistence issues
- Diagnostic checklist

---

## 📂 Project Structure at a Glance

```
Burgerville/
│
├── 📄 QUICK_START.md              ← Start here (5 min)
├── 📄 BACKEND_SETUP.md            ← Full setup guide
├── 📄 ARCHITECTURE.md             ← System design
├── 📄 IMPLEMENTATION_SUMMARY.md   ← What was built
├── 📄 API_TESTING_GUIDE.md        ← API reference
├── 📄 TROUBLESHOOTING.md          ← Problem solving
│
├── backend/                       ← Express API Server
│   ├── server.js                  ← Main server
│   ├── seed.js                    ← Database seeding
│   ├── models/                    ← MongoDB schemas
│   ├── controllers/               ← Business logic
│   ├── routes/                    ← API endpoints
│   ├── package.json
│   ├── .env
│   └── README.md                  ← Backend docs
│
├── src/                           ← React Frontend
│   ├── api/
│   │   └── apiService.js          ← API client (NEW)
│   ├── pages/
│   │   ├── Menu.jsx               ← Updated: fetches from API
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Gallery.jsx
│   ├── components/
│   │   ├── CartModal.jsx          ← Updated: checkout form
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── CartContext.jsx        ← Updated: checkout logic
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css                 ← Updated: form styles
│   └── index.css
│
├── .env                           ← Frontend config (NEW)
├── package.json
├── vite.config.js
└── index.html
```

---

## ✨ Key Features

| Feature | Status | Details |
|---------|--------|---------|
| Menu Management | ✅ Complete | Items stored in MongoDB |
| Order Processing | ✅ Complete | Full checkout workflow |
| Data Persistence | ✅ Complete | All data saved to database |
| REST API | ✅ Complete | 10+ endpoints available |
| Frontend Integration | ✅ Complete | React fetches from API |
| Database Seeding | ✅ Complete | 6 sample items pre-loaded |
| Error Handling | ✅ Complete | Validation & error messages |
| CORS Support | ✅ Complete | Frontend-backend communication |

---

## 🎯 Common Tasks

### Task: Start Everything
```bash
# Terminal 1: Start MongoDB
brew services start mongodb-community

# Terminal 2: Start Backend
cd backend
npm install
npm run seed
npm run dev

# Terminal 3: Start Frontend
npm install
npm run dev

# Open: http://localhost:5173
```

### Task: Seed Database with Menu Items
```bash
cd backend
npm run seed
```

### Task: Test API Endpoints
See **[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)** for examples

### Task: View All Orders
```bash
curl http://localhost:5000/api/orders
```

### Task: Create a Test Order
See **[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)** → "Create Order"

---

## 📱 API Endpoints Overview

### Menu (Public)
```
GET    /api/menu           Get all menu items
GET    /api/menu/:id       Get single menu item
POST   /api/menu           Create menu item (admin)
PUT    /api/menu/:id       Update menu item (admin)
DELETE /api/menu/:id       Delete menu item (admin)
```

### Orders
```
POST   /api/orders                    Create new order
GET    /api/orders                    Get all orders (admin)
GET    /api/orders/:id                Get single order
GET    /api/orders/number/:orderNumber Track order by number
PATCH  /api/orders/:id/status         Update status (admin)
PATCH  /api/orders/:id/cancel         Cancel order
DELETE /api/orders/:id                Delete order (admin)
```

### Health
```
GET    /api/health         Check server status
```

Full reference: [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)

---

## 🔄 Data Flow

```
1. User opens app
   ↓
2. Frontend requests: GET /api/menu
   ↓
3. Backend queries: MongoDB menuitems collection
   ↓
4. Frontend displays menu items
   ↓
5. User adds items → Cart stored locally
   ↓
6. User clicks checkout → Form appears
   ↓
7. User fills form & clicks "Place Order"
   ↓
8. Frontend sends: POST /api/orders with order data
   ↓
9. Backend validates & saves to MongoDB
   ↓
10. Frontend displays: Order confirmation with number
```

---

## 🔌 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, React Router, Context API |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB |
| **API** | REST, JSON |
| **Communication** | HTTP, CORS |

---

## 📊 Database Models

### MenuItem
- `name` - Menu item name (unique)
- `price` - Price in USD
- `description` - Item description
- `image` - Image URL
- `category` - burger/sides/pizza/sandwich/drink/other
- `available` - Available for order (true/false)

### Order
- `orderNumber` - Auto-generated unique identifier (ORD-...)
- `items` - Array of ordered items with quantity
- `total` - Order total
- `customerInfo` - Name, email, phone, address
- `status` - Order status (pending/confirmed/ready/delivered)
- `timestamps` - Created and updated dates

---

## 🚀 Deployment Ready

### Frontend Deployment
- Ready for [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- Just connect your GitHub repo

### Backend Deployment
- Ready for [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com)
- Configure environment variables on hosting platform

### Database Deployment
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- Update `MONGODB_URI` in backend `.env`

See **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** → Deployment section

---

## 📞 Quick Reference Card

### Ports
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`

### Key Commands
```bash
npm run dev       # Frontend dev server
npm start         # Backend production
npm run dev       # Backend dev server (with nodemon)
npm run seed      # Seed database with menu items
npm run build     # Build frontend for production
```

### Essential Files
- `backend/.env` - Backend configuration
- `.env` - Frontend API configuration
- `backend/seed.js` - Database seed script
- `src/api/apiService.js` - Frontend API client

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Menu page loads with items from database
- [ ] Can add items to cart
- [ ] Checkout form appears when clicking checkout
- [ ] Can submit order with customer info
- [ ] Get order confirmation with order number
- [ ] Cart clears after successful order

---

## 🎓 Learning Resources

### Understanding the Architecture
→ Read **[ARCHITECTURE.md](./ARCHITECTURE.md)** for detailed diagrams and explanations

### Frontend Integration Details
→ Check `src/api/apiService.js` to see how frontend calls API

### Backend Implementation
→ Explore `backend/controllers/` to see business logic

### Database Design
→ Check `backend/models/` to see MongoDB schemas

---

## 🔐 Security Notes

### Development
- ✅ CORS configured
- ✅ Input validation implemented
- ✅ Error handling in place

### Production (To-Do)
- Add user authentication (JWT)
- Add rate limiting
- Use HTTPS
- Validate/sanitize all inputs
- Secure environment variables
- Add logging & monitoring

---

## 🆘 Need Help?

1. **Quick question?** → Check **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
2. **How do I...?** → Search in **[BACKEND_SETUP.md](./BACKEND_SETUP.md)**
3. **API not working?** → Read **[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)**
4. **Something broken?** → Follow diagnostic steps in **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
5. **System overview?** → See **[ARCHITECTURE.md](./ARCHITECTURE.md)**

---

## 📋 Setup Summary

✅ **Backend** - Express server with REST API  
✅ **Database** - MongoDB with menu & order models  
✅ **Frontend** - React integration with API service  
✅ **Checkout** - Complete order processing workflow  
✅ **Documentation** - Comprehensive guides and references  

---

## 🎉 You're All Set!

Your Burgerville application is now a **complete full-stack restaurant ordering system**.

### Start Here:
1. Follow **[QUICK_START.md](./QUICK_START.md)** (5 minutes)
2. Test the complete flow in your browser
3. Refer back to documentation as needed

**Happy coding!** 🚀

---

## 📞 Quick Links

| Need | Link |
|------|------|
| 5-minute setup | [QUICK_START.md](./QUICK_START.md) |
| Full setup | [BACKEND_SETUP.md](./BACKEND_SETUP.md) |
| Understand it | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Test the API | [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md) |
| Troubleshoot | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| What's new | [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) |
| Backend docs | [backend/README.md](./backend/README.md) |

---

**Last Updated:** May 16, 2026  
**Version:** 1.0 - Full Stack Complete
