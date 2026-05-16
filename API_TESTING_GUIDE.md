# Burgerville API Testing Guide

This guide provides comprehensive examples for testing all Burgerville API endpoints.

## 🔧 Setup

### Using cURL (Command Line)
Available on macOS and Linux by default. Windows users can use WSL or install [curl](https://curl.se/download.html).

### Using Postman (GUI)
1. Download [Postman](https://www.postman.com/downloads/)
2. Create requests using the examples below

### Using VS Code REST Client
1. Install [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Create a `.rest` file with the requests below
3. Click "Send Request" above each request

## 📌 Base URL
```
http://localhost:5000/api
```

## ✅ Health Check

### cURL
```bash
curl http://localhost:5000/api/health
```

### Expected Response
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-05-16T10:30:00.000Z"
}
```

## 🍔 Menu Endpoints

### 1. Get All Menu Items

#### cURL
```bash
curl http://localhost:5000/api/menu
```

#### Postman
- Method: `GET`
- URL: `http://localhost:5000/api/menu`

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Classic Burger",
      "price": 8.99,
      "description": "Juicy flame-grilled beef patty with lettuce, tomato, and our signature sauce.",
      "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
      "category": "burger",
      "available": true,
      "createdAt": "2024-05-16T10:00:00.000Z",
      "updatedAt": "2024-05-16T10:00:00.000Z"
    },
    ...
  ]
}
```

### 2. Get Single Menu Item

#### cURL
```bash
curl http://localhost:5000/api/menu/507f1f77bcf86cd799439011
```

Replace `507f1f77bcf86cd799439011` with an actual menu item ID from the list above.

### 3. Create Menu Item (Admin)

#### cURL
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deluxe Burger",
    "price": 12.99,
    "description": "Premium beef patty with bacon and premium toppings",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    "category": "burger"
  }'
```

#### Postman
- Method: `POST`
- URL: `http://localhost:5000/api/menu`
- Body (JSON):
```json
{
  "name": "Deluxe Burger",
  "price": 12.99,
  "description": "Premium beef patty with bacon and premium toppings",
  "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  "category": "burger"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Menu item created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Deluxe Burger",
    "price": 12.99,
    "description": "Premium beef patty with bacon and premium toppings",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    "category": "burger",
    "available": true,
    "createdAt": "2024-05-16T10:30:00.000Z",
    "updatedAt": "2024-05-16T10:30:00.000Z"
  }
}
```

### 4. Update Menu Item (Admin)

#### cURL
```bash
curl -X PUT http://localhost:5000/api/menu/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 9.99,
    "available": true
  }'
```

#### Postman
- Method: `PUT`
- URL: `http://localhost:5000/api/menu/507f1f77bcf86cd799439011`
- Body (JSON):
```json
{
  "price": 9.99,
  "available": true
}
```

### 5. Delete Menu Item (Admin)

#### cURL
```bash
curl -X DELETE http://localhost:5000/api/menu/507f1f77bcf86cd799439011
```

#### Postman
- Method: `DELETE`
- URL: `http://localhost:5000/api/menu/507f1f77bcf86cd799439011`

## 🛒 Order Endpoints

### 1. Create Order (Customer)

#### cURL
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "Classic Burger",
        "price": 8.99,
        "quantity": 2
      },
      {
        "name": "Loaded Fries",
        "price": 4.99,
        "quantity": 1
      }
    ],
    "total": 22.97,
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "address": "123 Main St, Springfield, IL 62701"
    }
  }'
```

#### Postman
- Method: `POST`
- URL: `http://localhost:5000/api/orders`
- Body (JSON):
```json
{
  "items": [
    {
      "name": "Classic Burger",
      "price": 8.99,
      "quantity": 2
    },
    {
      "name": "Loaded Fries",
      "price": 4.99,
      "quantity": 1
    }
  ],
  "total": 22.97,
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": "123 Main St, Springfield, IL 62701"
  }
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [
      {
        "name": "Classic Burger",
        "price": 8.99,
        "quantity": 2
      },
      {
        "name": "Loaded Fries",
        "price": 4.99,
        "quantity": 1
      }
    ],
    "total": 22.97,
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "address": "123 Main St, Springfield, IL 62701"
    },
    "status": "pending",
    "orderNumber": "ORD-1715852400000-1",
    "createdAt": "2024-05-16T10:30:00.000Z",
    "updatedAt": "2024-05-16T10:30:00.000Z"
  }
}
```

### 2. Get All Orders (Admin)

#### cURL
```bash
curl http://localhost:5000/api/orders
```

#### Postman
- Method: `GET`
- URL: `http://localhost:5000/api/orders`

### 3. Get Order by ID (Admin)

#### cURL
```bash
curl http://localhost:5000/api/orders/507f1f77bcf86cd799439013
```

Replace `507f1f77bcf86cd799439013` with an actual order ID.

### 4. Get Order by Order Number (Customer)

#### cURL
```bash
curl http://localhost:5000/api/orders/number/ORD-1715852400000-1
```

Replace `ORD-1715852400000-1` with an actual order number.

### 5. Update Order Status (Admin)

#### cURL
```bash
curl -X PATCH http://localhost:5000/api/orders/507f1f77bcf86cd799439013/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

#### Postman
- Method: `PATCH`
- URL: `http://localhost:5000/api/orders/507f1f77bcf86cd799439013/status`
- Body (JSON):
```json
{
  "status": "confirmed"
}
```

#### Valid Status Values
- `pending` - Order received
- `confirmed` - Order confirmed by restaurant
- `preparing` - Kitchen is preparing the order
- `ready` - Order ready for pickup/delivery
- `delivered` - Order delivered to customer
- `cancelled` - Order cancelled

### 6. Cancel Order

#### cURL
```bash
curl -X PATCH http://localhost:5000/api/orders/507f1f77bcf86cd799439013/cancel
```

#### Postman
- Method: `PATCH`
- URL: `http://localhost:5000/api/orders/507f1f77bcf86cd799439013/cancel`

### 7. Delete Order (Admin)

#### cURL
```bash
curl -X DELETE http://localhost:5000/api/orders/507f1f77bcf86cd799439013
```

#### Postman
- Method: `DELETE`
- URL: `http://localhost:5000/api/orders/507f1f77bcf86cd799439013`

## ❌ Error Responses

### Missing Required Fields
Request:
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [],
    "total": 0,
    "customerInfo": {}
  }'
```

Response (400 Bad Request):
```json
{
  "success": false,
  "message": "Order must contain at least one item"
}
```

### Resource Not Found
Request:
```bash
curl http://localhost:5000/api/menu/invalid-id
```

Response (404 Not Found):
```json
{
  "success": false,
  "message": "Menu item not found"
}
```

### Invalid Status
Request:
```bash
curl -X PATCH http://localhost:5000/api/orders/507f1f77bcf86cd799439013/status \
  -H "Content-Type: application/json" \
  -d '{"status": "invalid"}'
```

Response (400 Bad Request):
```json
{
  "success": false,
  "message": "Invalid order status"
}
```

## 🧪 Complete Test Workflow

### 1. Get menu items
```bash
curl http://localhost:5000/api/menu
```

### 2. Create an order with items from the menu
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name": "Classic Burger", "price": 8.99, "quantity": 1},
      {"name": "Classic Cola", "price": 2.49, "quantity": 1}
    ],
    "total": 11.48,
    "customerInfo": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "555-9999",
      "address": "456 Oak Ave, Test City, TC 12345"
    }
  }'
```

### 3. Copy the orderNumber from the response

### 4. Track the order
```bash
curl http://localhost:5000/api/orders/number/[paste-order-number-here]
```

### 5. Update order status (admin)
```bash
curl -X PATCH http://localhost:5000/api/orders/[order-id]/status \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

### 6. View all orders (admin)
```bash
curl http://localhost:5000/api/orders
```

## 💾 Postman Collection Import

Save this as `burgerville.postman_collection.json` and import into Postman:

```json
{
  "info": {
    "name": "Burgerville API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Menu",
      "item": [
        {
          "name": "Get All Menu Items",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/menu"
          }
        },
        {
          "name": "Create Menu Item",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/menu",
            "body": {
              "raw": "{\"name\": \"New Item\", \"price\": 10.99, \"description\": \"...\", \"image\": \"...\", \"category\": \"burger\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Orders",
      "item": [
        {
          "name": "Create Order",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/orders",
            "body": {
              "raw": "{\"items\": [{\"name\": \"Classic Burger\", \"price\": 8.99, \"quantity\": 1}], \"total\": 8.99, \"customerInfo\": {\"name\": \"John\", \"email\": \"john@example.com\", \"phone\": \"555-1234\", \"address\": \"123 Main\"}}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    }
  ]
}
```

## 🚀 Tips

1. **Save Order Numbers**: When you create an order, save the `orderNumber` to track it later
2. **Use Postman Variables**: Set `{{base_url}}` to avoid typing the full URL
3. **Test Validations**: Try sending invalid data to understand error messages
4. **Monitor Backend Logs**: Watch terminal output to see request logs
5. **Use Browser DevTools**: Check the Network tab when using the frontend app

## 📊 Common Queries

### Get all pending orders
```bash
curl http://localhost:5000/api/orders | grep -i pending
```

### Create multiple test orders
Loop script in bash:
```bash
for i in {1..5}; do
  curl -X POST http://localhost:5000/api/orders \
    -H "Content-Type: application/json" \
    -d "{
      \"items\": [{\"name\": \"Classic Burger\", \"price\": 8.99, \"quantity\": $i}],
      \"total\": $((8.99 * i)),
      \"customerInfo\": {\"name\": \"Test $i\", \"email\": \"test$i@example.com\", \"phone\": \"555-000$i\", \"address\": \"Address $i\"}
    }"
  sleep 1
done
```

## 🔗 Integration with Frontend

The frontend automatically integrates with these endpoints through `src/api/apiService.js`.

When you:
1. Open the menu page → Calls `GET /api/menu`
2. Add items to cart → Stores locally, no API call
3. Click checkout → Opens customer form
4. Submit order → Calls `POST /api/orders`
5. Success → Shows order confirmation with order number

See the frontend code for implementation details.
