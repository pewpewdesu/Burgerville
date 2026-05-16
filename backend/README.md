# Burgerville Backend - Setup Guide

## Overview

This is the backend API server for the Burgerville restaurant web application. It's built with Node.js, Express, and MongoDB, and provides RESTful endpoints for menu management and order processing.

## Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download Community Edition](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting
- **npm** (comes with Node.js)

## Installation

### 1. Navigate to the backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB ODM (Object Data Modeling)
- **cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **nodemon** - Auto-restart development server

## Configuration

### 1. Set up environment variables

Create or update the `.env` file in the `backend` directory with your configuration:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/burgerville

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Settings (match your frontend URL)
CORS_ORIGIN=http://localhost:5173
```

**Environment Variable Explanations:**
- `MONGODB_URI`: Connection string for MongoDB. Use `mongodb://localhost:27017/burgerville` for local MongoDB, or a MongoDB Atlas connection string for cloud hosting
- `PORT`: The port on which the backend server will run
- `NODE_ENV`: Set to `development` for development, `production` for production
- `CORS_ORIGIN`: The URL of your frontend (required to allow cross-origin requests)

### 2. MongoDB Setup

**Option A: Local MongoDB**
1. [Download and install MongoDB Community Edition](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB server:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # or run mongod directly
   mongod
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Get your connection string and add it to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/burgerville
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

The server will start on `http://localhost:5000` and will automatically restart when you make changes.

### Production Mode
```bash
npm start
```

## Seeding the Database

To populate the database with initial menu items:

```bash
npm run seed
```

This will:
1. Connect to MongoDB
2. Clear any existing menu items
3. Insert 6 sample menu items (burgers, sides, pizza, sandwich, drinks)
4. Display a confirmation message

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
- **GET** `/health` - Check if the server is running

### Menu Endpoints

#### Get all menu items
- **GET** `/menu`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "name": "Classic Burger",
        "price": 8.99,
        "description": "...",
        "image": "...",
        "category": "burger",
        "available": true,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```

#### Get single menu item
- **GET** `/menu/:id`
- **Parameters:** `id` - MongoDB item ID
- **Response:** Single menu item object

#### Create menu item (Admin)
- **POST** `/menu`
- **Body:**
  ```json
  {
    "name": "New Burger",
    "price": 10.99,
    "description": "A delicious burger",
    "image": "https://...",
    "category": "burger"
  }
  ```

#### Update menu item (Admin)
- **PUT** `/menu/:id`
- **Parameters:** `id` - MongoDB item ID
- **Body:** Any fields to update

#### Delete menu item (Admin)
- **DELETE** `/menu/:id`
- **Parameters:** `id` - MongoDB item ID

### Order Endpoints

#### Create an order
- **POST** `/orders`
- **Body:**
  ```json
  {
    "items": [
      {
        "name": "Classic Burger",
        "price": 8.99,
        "quantity": 2
      }
    ],
    "total": 17.98,
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "address": "123 Main St, City, State"
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Order created successfully",
    "data": {
      "_id": "...",
      "orderNumber": "ORD-...",
      "status": "pending",
      "total": 17.98,
      "items": [...],
      "customerInfo": {...},
      "createdAt": "..."
    }
  }
  ```

#### Get all orders (Admin)
- **GET** `/orders`
- **Response:** Array of order objects

#### Get order by ID
- **GET** `/orders/:id`
- **Parameters:** `id` - MongoDB order ID

#### Get order by order number
- **GET** `/orders/number/:orderNumber`
- **Parameters:** `orderNumber` - Order number (e.g., "ORD-1234567890-1")

#### Update order status (Admin)
- **PATCH** `/orders/:id/status`
- **Parameters:** `id` - MongoDB order ID
- **Body:**
  ```json
  {
    "status": "confirmed"
  }
  ```
- **Valid statuses:** `pending`, `confirmed`, `preparing`, `ready`, `delivered`, `cancelled`

#### Cancel order
- **PATCH** `/orders/:id/cancel`
- **Parameters:** `id` - MongoDB order ID

#### Delete order (Admin)
- **DELETE** `/orders/:id`
- **Parameters:** `id` - MongoDB order ID

## Project Structure

```
backend/
├── controllers/
│   ├── menuController.js      # Menu item logic
│   └── orderController.js     # Order processing logic
├── models/
│   ├── MenuItem.js            # MongoDB menu item schema
│   └── Order.js               # MongoDB order schema
├── routes/
│   ├── menuRoutes.js          # Menu endpoints
│   └── orderRoutes.js         # Order endpoints
├── server.js                  # Main server file
├── seed.js                    # Database seeding script
├── .env                       # Environment variables
├── package.json               # Node.js dependencies
└── README.md                  # This file
```

## Error Handling

All API responses include a `success` field indicating whether the request succeeded:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod` or `brew services start mongodb-community`)
- Check your `MONGODB_URI` in `.env`
- Verify MongoDB is listening on the correct port (default: 27017)

### Port Already in Use
- Change the `PORT` in `.env` to an available port
- Or kill the process using the port: `lsof -ti:5000 | xargs kill -9`

### CORS Errors
- Verify `CORS_ORIGIN` in `.env` matches your frontend URL
- For development, you can use `http://localhost:5173` (Vite default) or `http://localhost:3000` (React default)

### Seeding Issues
- Ensure MongoDB is running before running the seed script
- Clear existing data manually if needed

## Frontend Integration

The frontend (React app) should:
1. Set `VITE_API_URL=http://localhost:5000/api` in its `.env` file
2. Use the API service to fetch menu items and submit orders
3. Handle CORS requests (automatically configured on backend)

See the frontend `.env` file and `src/api/apiService.js` for integration details.

## Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible (use MongoDB Atlas for cloud)
3. Set `NODE_ENV=production`
4. Update `CORS_ORIGIN` to your production frontend URL
5. Deploy using platforms like:
   - Heroku
   - Railway
   - Render
   - Vercel (backend support)
   - AWS (Lambda, EC2, etc.)

## License

This project is part of the Burgerville Restaurant Web Application.
