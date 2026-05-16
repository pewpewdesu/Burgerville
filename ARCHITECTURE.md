# 🏗️ Burgerville Architecture & System Design

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           React Frontend (Port 5173)                 │   │
│  │  ┌────────┬──────────┬─────────┬──────────────┐     │   │
│  │  │ Header │   Menu   │ Gallery │ Cart Modal   │     │   │
│  │  └────────┴──────────┴─────────┴──────────────┘     │   │
│  │           ↓           ↓            ↓                 │   │
│  │       API Service (apiService.js)                    │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────┬───────────────────────────────────────────┘
                 │ HTTP/REST (JSON)
                 │
┌────────────────▼───────────────────────────────────────────┐
│              Express Backend (Port 5000)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Routes                                    │  │
│  │  GET  /api/menu              POST /api/orders       │  │
│  │  POST /api/menu              GET  /api/orders       │  │
│  │  PUT  /api/menu/:id          GET  /api/orders/:id   │  │
│  │  DELETE /api/menu/:id        PATCH /api/orders/:id  │  │
│  └──────────────────────────────────────────────────────┘  │
│                        ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Controllers                               │  │
│  │  menuController.js     orderController.js           │  │
│  │  - getMenuItems()      - createOrder()              │  │
│  │  - createMenuItem()    - getOrderByNumber()         │  │
│  │  - updateMenuItem()    - updateOrderStatus()        │  │
│  │  - deleteMenuItem()    - cancelOrder()              │  │
│  └──────────────────────────────────────────────────────┘  │
│                        ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Models (Mongoose Schemas)                │  │
│  │  MenuItem.js              Order.js                  │  │
│  │  - name                   - items[]                 │  │
│  │  - price                  - total                   │  │
│  │  - description            - customerInfo           │  │
│  │  - image                  - status                  │  │
│  │  - category               - orderNumber            │  │
│  │  - available              - timestamps              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬───────────────────────────────────────────┘
                 │ Mongoose ODM
                 │
┌────────────────▼───────────────────────────────────────────┐
│           MongoDB Database (Port 27017)                    │
│                                                             │
│  Database: burgerville                                     │
│  ┌──────────────────┐    ┌──────────────────┐            │
│  │  menuitems       │    │     orders       │            │
│  │  ┌────────────┐  │    │  ┌────────────┐  │            │
│  │  │ _id        │  │    │  │ _id        │  │            │
│  │  │ name       │  │    │  │ orderNum   │  │            │
│  │  │ price      │  │    │  │ items      │  │            │
│  │  │ image      │  │    │  │ total      │  │            │
│  │  │ category   │  │    │  │ customer   │  │            │
│  │  │ available  │  │    │  │ status     │  │            │
│  │  │ createdAt  │  │    │  │ createdAt  │  │            │
│  │  └────────────┘  │    │  └────────────┘  │            │
│  └──────────────────┘    └──────────────────┘            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔀 Data Flow Diagram

### 1. **Browse Menu**
```
User Opens App
    ↓
Menu Component Mounts
    ↓
useEffect() triggers getMenuItems()
    ↓
API Request: GET /api/menu
    ↓
Backend queries MongoDB
    ↓
Returns menu items array
    ↓
React renders menu cards
```

### 2. **Add to Cart**
```
User clicks "Add to Cart"
    ↓
addToCart() called from CartContext
    ↓
Item added to cart state
    ↓
useEffect in CartContext updates localStorage
    ↓
Cart count updates in header
(No API call - stored locally in browser)
```

### 3. **Checkout Process**
```
User clicks "Checkout"
    ↓
Checkout form displays
    ↓
User fills: name, email, phone, address
    ↓
User clicks "Place Order"
    ↓
Form validation checks
    ↓
checkout() function in CartContext prepares order data
    ↓
API Request: POST /api/orders
    ↓
Backend validates:
  - Cart not empty
  - Total > 0
  - Customer info complete
    ↓
Generates unique orderNumber (ORD-timestamp-count)
    ↓
Saves to MongoDB
    ↓
Returns order with orderNumber
    ↓
Frontend displays order confirmation
    ↓
Cart cleared
```

### 4. **Track Order** (Future Feature)
```
User gets order number from confirmation
    ↓
User enters order number on tracking page
    ↓
API Request: GET /api/orders/number/:orderNumber
    ↓
Backend queries MongoDB for order
    ↓
Returns order details with current status
    ↓
Display order status to user
```

---

## 📁 Project Structure

```
Burgerville/
│
├── QUICK_START.md                 ← Start here!
├── BACKEND_SETUP.md               ← Setup instructions
├── API_TESTING_GUIDE.md           ← Test the API
│
├── backend/
│   ├── models/
│   │   ├── MenuItem.js            ← Menu item schema
│   │   └── Order.js               ← Order schema
│   ├── controllers/
│   │   ├── menuController.js      ← Menu business logic
│   │   └── orderController.js     ← Order business logic
│   ├── routes/
│   │   ├── menuRoutes.js          ← Menu endpoints
│   │   └── orderRoutes.js         ← Order endpoints
│   ├── server.js                  ← Main server entry
│   ├── seed.js                    ← Database seeding
│   ├── package.json               ← Backend dependencies
│   ├── .env                       ← Backend config
│   └── README.md                  ← Backend documentation
│
├── src/
│   ├── api/
│   │   └── apiService.js          ← API client (NEW)
│   ├── components/
│   │   ├── CartModal.jsx          ← Updated with checkout form
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── context/
│   │   └── CartContext.jsx        ← Updated with checkout
│   ├── pages/
│   │   ├── Menu.jsx               ← Updated with API
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Gallery.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css                 ← Updated with checkout styles
│   └── index.css
│
├── .env                           ← Frontend config (NEW)
├── package.json                   ← Frontend dependencies
├── vite.config.js
└── index.html
```

---

## 🔄 Component Relationships

```
App.jsx
├── Header.jsx
│   └── Cart Icon → CartModal
├── Main Routes
│   ├── Home.jsx
│   ├── Menu.jsx                  ← Calls apiService.getMenuItems()
│   │   └── CartContext (addToCart)
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Gallery.jsx
├── CartModal.jsx                 ← NEW: Checkout form
│   └── CartContext (checkout)    ← NEW: Calls apiService.createOrder()
└── Footer.jsx

CartContext (Context API)
├── State: cart[], formData
├── Methods: addToCart, removeFromCart, updateQuantity, checkout
└── Persistence: localStorage sync
```

---

## 🗄️ Database Schema

### MenuItem Collection
```javascript
{
  _id: ObjectId,
  name: String,                    // Unique
  price: Number,
  description: String,
  image: String,                   // URL
  category: String,                // burger|sides|pizza|sandwich|drink|other
  available: Boolean,              // Default: true
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  status: String,                  // pending|confirmed|preparing|ready|delivered|cancelled
  orderNumber: String,             // Unique, auto-generated (ORD-timestamp-count)
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Request/Response Flow

### Example: POST /api/orders

**1. Frontend sends:**
```json
{
  "items": [
    {"name": "Classic Burger", "price": 8.99, "quantity": 2}
  ],
  "total": 8.99,
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": "123 Main St"
  }
}
```

**2. Backend validates:**
- Items array not empty ✓
- Total > 0 ✓
- All customer fields present ✓

**3. Backend processes:**
- Generates orderNumber: "ORD-1715852400000-1"
- Validates email format
- Prepares MongoDB document

**4. Backend saves to MongoDB:**
```javascript
const newOrder = new Order({
  items, total, customerInfo,
  status: 'pending',
  orderNumber: 'ORD-...'
});
await newOrder.save();
```

**5. Frontend receives:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "orderNumber": "ORD-1715852400000-1",
    "status": "pending",
    "items": [...],
    "total": 8.99,
    "customerInfo": {...},
    "createdAt": "2024-05-16T10:30:00.000Z",
    "updatedAt": "2024-05-16T10:30:00.000Z"
  }
}
```

**6. Frontend displays order confirmation:**
- Shows order number
- Shows total
- Clears cart

---

## 🌐 API Endpoints Map

```
/api
├── /health                           GET
├── /menu
│   ├── GET                          (Get all)
│   ├── POST                         (Create)
│   ├── /:id
│   │   ├── GET                      (Get one)
│   │   ├── PUT                      (Update)
│   │   └── DELETE                   (Delete)
│
└── /orders
    ├── GET                          (Get all)
    ├── POST                         (Create new order)
    ├── /number/:orderNumber
    │   └── GET                      (Track order)
    ├── /:id
    │   ├── GET                      (Get one)
    │   ├── /status
    │   │   └── PATCH                (Update status)
    │   ├── /cancel
    │   │   └── PATCH                (Cancel order)
    │   └── DELETE                   (Delete)
```

---

## 📊 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 | UI framework |
| | Vite | Build tool & dev server |
| | React Router | Page navigation |
| | Context API | State management |
| **Backend** | Node.js | Runtime environment |
| | Express | Web framework |
| | Mongoose | MongoDB ODM |
| **Database** | MongoDB | NoSQL database |
| **Communication** | REST API | HTTP endpoints |
| | JSON | Data format |
| | CORS | Cross-origin requests |

---

## 🔒 Security Considerations

### Current Implementation
- Input validation on backend
- CORS configured for development
- Environment variables for sensitive data

### For Production
- Add user authentication (JWT tokens)
- Add rate limiting
- Validate/sanitize all inputs
- Use HTTPS
- Add request logging
- Add error tracking (Sentry)
- Secure environment variables on host

---

## ⚡ Performance Optimization

### Current
- Menu items cached after first fetch
- Cart stored in localStorage (no network calls)
- Async/await for non-blocking operations

### Potential Improvements
- Add database indexes on frequently queried fields
- Implement pagination for orders list
- Add caching layer (Redis)
- Compress images
- Lazy load menu items
- Implement infinite scroll

---

## 🧪 Testing Strategy

### Manual Testing
- Use Postman or cURL to test API endpoints
- Test checkout flow in browser
- Test with various order sizes and data

### Automated Testing
- Unit tests for controllers
- Integration tests for API
- End-to-end tests with Cypress/Playwright

---

## 📈 Scalability Path

```
Current (Development)
├── Single MongoDB instance
├── Single Express server
└── Frontend on localhost

Small Scale (10-100 orders/day)
├── MongoDB Atlas (cloud)
├── Deploy backend to Heroku/Railway
└── Deploy frontend to Vercel/Netlify

Medium Scale (1000+ orders/day)
├── MongoDB Atlas with replica set
├── Multiple backend instances with load balancer
├── CDN for static assets
└── Separate auth service

Large Scale (10000+ orders/day)
├── Dedicated MongoDB cluster
├── Kubernetes for backend
├── Separate microservices
├── Message queue (RabbitMQ/Kafka)
└── Advanced caching
```

---

## 📝 Development Workflow

1. **Make changes** to code files
2. **Backend auto-reloads** with nodemon
3. **Frontend auto-refreshes** with Vite HMR
4. **Test in browser** at localhost:5173
5. **Check browser console** for errors
6. **Check backend terminal** for request logs
7. **Commit changes** to git

---

## 🚀 Next Steps

1. ✅ Current: Full CRUD API + basic checkout
2. ⏭️ Next: User authentication
3. ⏭️ Next: Order history per user
4. ⏭️ Next: Payment processing
5. ⏭️ Next: Admin dashboard
6. ⏭️ Next: Real-time order status updates (WebSocket)
7. ⏭️ Next: Email notifications
8. ⏭️ Next: Multi-location support

---

This architecture provides a solid foundation for a production-grade restaurant ordering system. Each layer is independent and can be scaled or modified without affecting others.
