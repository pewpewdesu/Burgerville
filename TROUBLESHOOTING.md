# 🆘 Troubleshooting Guide

## Common Issues & Solutions

---

## 🔴 Backend Issues

### Issue: "MongoDB connection error"

**Error Message:**
```
✗ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Check if MongoDB is running**
   ```bash
   # macOS with Homebrew
   brew services list
   # Look for: mongodb-community started
   
   # If not running, start it
   brew services start mongodb-community
   ```

2. **Verify MongoDB is installed**
   ```bash
   brew install mongodb-community
   ```

3. **Check MongoDB port**
   ```bash
   # MongoDB should be on port 27017
   lsof -i :27017
   ```

4. **Use MongoDB Atlas instead** (cloud option)
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create cluster and get connection string
   - Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/burgerville
   ```

---

### Issue: "Port 5000 already in use"

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

1. **Change the port in `.env`**
   ```env
   PORT=5001
   ```

2. **Kill the process using port 5000**
   ```bash
   lsof -i :5000
   # Find the PID, then:
   kill -9 <PID>
   ```

3. **Or find what's using the port**
   ```bash
   # macOS/Linux
   sudo lsof -i :5000
   
   # Windows (in PowerShell as admin)
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
   ```

---

### Issue: "Cannot find module 'express' or 'mongoose'"

**Error Message:**
```
Cannot find module 'express'
```

**Solution:**

Install backend dependencies:
```bash
cd backend
npm install
```

If still failing:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### Issue: "seeddb.js or seed script fails"

**Error Message:**
```
Cannot find module './models/MenuItem.js'
```

**Solutions:**

1. **Run from backend directory**
   ```bash
   cd backend
   npm run seed
   ```

2. **Ensure MongoDB is running**
   ```bash
   brew services start mongodb-community
   ```

3. **Check file paths are correct**
   ```bash
   ls models/
   # Should show: MenuItem.js Order.js
   ```

---

### Issue: "CORS error - blocked by CORS policy"

**Error in Browser Console:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/menu' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**

Verify `CORS_ORIGIN` in `backend/.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

If frontend is on different port (e.g., 3000):
```env
CORS_ORIGIN=http://localhost:3000
```

Then restart backend server.

---

### Issue: "Environment variables not loading"

**Error:**
```
Cannot connect to undefined (MONGODB_URI is undefined)
```

**Solutions:**

1. **Check `.env` file exists**
   ```bash
   ls backend/.env
   # Should show: backend/.env
   ```

2. **Restart the server** after changing `.env`:
   ```bash
   npm run dev
   # Stop (Ctrl+C) and restart
   ```

3. **Check `.env` format**
   ```env
   MONGODB_URI=mongodb://localhost:27017/burgerville
   PORT=5000
   # No quotes needed around values
   ```

4. **For Windows, make sure file encoding is UTF-8**

---

## 🔴 Frontend Issues

### Issue: "Menu items not loading"

**Symptoms:** Menu page shows "Loading..." or blank

**Debug Steps:**

1. **Check browser console** (F12)
   - Look for red error messages
   - Note any API error messages

2. **Verify backend is running**
   ```bash
   curl http://localhost:5000/api/menu
   # Should return JSON array of menu items
   ```

3. **Check API URL in frontend `.env`**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Check network tab** (F12 → Network)
   - Look for request to `/api/menu`
   - Check response status (200 = success, 500 = server error)
   - Check response body for error message

5. **Verify MongoDB has data**
   ```bash
   npm run seed  # in backend folder
   ```

---

### Issue: "Checkout form doesn't appear"

**Symptoms:** Click checkout button but nothing happens

**Debug Steps:**

1. **Check browser console** for JavaScript errors

2. **Verify cart has items**
   - Add items to cart first
   - Check cart count in header

3. **Check if CartModal is working**
   - Try opening cart modal normally
   - Try clicking items in cart

4. **Clear browser cache**
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Clear all cache
   - Refresh page

---

### Issue: "Order submission fails"

**Symptoms:** Click "Place Order" but get error

**Debug Steps:**

1. **Check browser console** (F12) for error details

2. **Fill all form fields**
   - Name, Email, Phone, Address all required
   - Make sure email format is valid

3. **Verify backend is running**
   ```bash
   curl http://localhost:5000/api/health
   # Should return success
   ```

4. **Check network tab** for API response
   - Status should be 201 (created)
   - Check response body for error details

5. **Common validation errors:**
   ```json
   {
     "success": false,
     "message": "Order must contain at least one item"
   }
   ```
   → Add items to cart first

   ```json
   {
     "success": false,
     "message": "Please provide all customer information"
   }
   ```
   → Fill all form fields

---

### Issue: "Cart clears unexpectedly"

**Symptoms:** Items disappear from cart

**Causes:**
- Page refresh (normal - stored in localStorage)
- localStorage disabled in browser
- Browser private/incognito mode

**Solution:**

Check localStorage is enabled:
1. Open DevTools (F12)
2. Go to Application → Storage → Local Storage
3. Verify it's not empty

---

### Issue: "Port 5173 already in use"

**Error Message:**
```
Port 5173 is in use, trying port 5174
```

**Solution:**

1. **Use different port**
   ```bash
   npm run dev -- --port 5174
   ```

2. **Or kill process using 5173**
   ```bash
   lsof -i :5173
   kill -9 <PID>
   ```

---

### Issue: "Vite dev server not starting"

**Error:**
```
Error: Cannot find module 'vite'
```

**Solution:**

```bash
# Make sure you're in the root (not backend)
npm install
npm run dev
```

---

## 🔴 Database Issues

### Issue: "Database not persisting data"

**Symptoms:** 
- Menu items appear but disappear after refresh
- Orders created but can't retrieve them

**Solutions:**

1. **Verify MongoDB is running**
   ```bash
   brew services list | grep mongodb
   ```

2. **Check you seeded the database**
   ```bash
   npm run seed  # in backend folder
   ```

3. **Verify connection string**
   ```bash
   # In backend/.env
   MONGODB_URI=mongodb://localhost:27017/burgerville
   ```

4. **Check MongoDB has data**
   ```bash
   # Using MongoDB compass or command line
   db.menuitems.find()
   db.orders.find()
   ```

---

### Issue: "Duplicate key error"

**Error Message:**
```
E11000 duplicate key error
```

**Cause:** Trying to insert duplicate menu item names

**Solution:**

1. **Seed clears old data first**, so just re-run:
   ```bash
   npm run seed
   ```

2. **Or manually clear the collection:**
   ```bash
   # Using MongoDB Compass
   # Select menuitems collection → Delete all documents
   ```

---

### Issue: "MongoDB Atlas connection string not working"

**Error:**
```
MongooseServerSelectionError: connect ENOTFOUND
```

**Solutions:**

1. **Check connection string format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/burgerville
   ```

2. **Verify credentials are correct**
   - Username and password must match exactly
   - Special characters in password? URL encode them

3. **Check IP whitelist**
   - MongoDB Atlas → Network Access
   - Add your IP (or 0.0.0.0 for development)

4. **Test connection in MongoDB Compass**
   - Copy exact connection string
   - Try connecting to verify it works

5. **Update `.env` with correct string**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/burgerville
   ```

---

## 📋 Diagnostic Checklist

If something isn't working, go through this checklist:

### Backend
- [ ] MongoDB running? (`brew services list`)
- [ ] Backend running? (`npm run dev` in backend folder)
- [ ] Port 5000 available? (`lsof -i :5000`)
- [ ] Dependencies installed? (`npm install` in backend)
- [ ] `.env` file exists? (`ls backend/.env`)
- [ ] Database seeded? (`npm run seed`)
- [ ] CORS configured? (Frontend URL in `.env`)

### Frontend
- [ ] Frontend running? (`npm run dev` in root)
- [ ] Port 5173 available? (or different port)
- [ ] Dependencies installed? (`npm install` in root)
- [ ] `.env` file exists? (`ls .env`)
- [ ] API URL correct? (`VITE_API_URL=http://localhost:5000/api`)
- [ ] Cache cleared? (Ctrl+Shift+Delete)

### Network
- [ ] Can reach backend? (`curl http://localhost:5000/api/health`)
- [ ] Menu endpoint works? (`curl http://localhost:5000/api/menu`)
- [ ] No CORS errors? (Check browser console)

### Database
- [ ] MongoDB running? (`brew services list`)
- [ ] Can connect? (Check backend logs)
- [ ] Has data? (`npm run seed`)
- [ ] Using correct database? (burgerville)

---

## 🔧 Reset Everything

If things are completely broken:

```bash
# 1. Stop all servers (Ctrl+C in terminal)

# 2. Clear backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed
npm run dev

# 3. Clear frontend (new terminal)
cd ..
rm -rf node_modules package-lock.json
npm install
npm run dev

# 4. Restart MongoDB
brew services restart mongodb-community
```

---

## 📞 Getting More Help

### Check Logs
- **Backend logs:** Terminal where `npm run dev` runs
- **Frontend logs:** Browser Console (F12)
- **Browser Network tab:** F12 → Network → See API requests

### Test Endpoints
```bash
# Test health
curl http://localhost:5000/api/health

# Test menu
curl http://localhost:5000/api/menu

# Test with verbose output
curl -v http://localhost:5000/api/menu
```

### Common Error Patterns

| Error | Cause | Fix |
|-------|-------|-----|
| `ECONNREFUSED` | Service not running | Start MongoDB/Backend |
| `EADDRINUSE` | Port in use | Kill process or change port |
| `Cannot find module` | Dependency missing | `npm install` |
| `CORS error` | Frontend/Backend mismatch | Check `.env` URLs |
| `404 Not Found` | Endpoint doesn't exist | Check API routes |
| `E11000 duplicate key` | Duplicate data | Run `npm run seed` |
| `Cannot resolve module` | Path error | Check file paths |
| `undefined` value | Missing env variable | Check `.env` file |

---

## 🎯 Still Not Working?

1. **Read error message carefully** - It usually tells you exactly what's wrong
2. **Check browser console** - Most issues show there
3. **Look at backend logs** - Errors in terminal running server
4. **Use curl to test endpoints** - Isolate frontend vs backend issue
5. **Review documentation** - Check BACKEND_SETUP.md and README.md

---

**Remember:** Most issues are related to services not running or misconfigured environment variables. Start there! 🚀
