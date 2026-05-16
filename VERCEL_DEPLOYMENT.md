# Vercel Deployment Guide for Burgerville

## What's Changed

Your application has been restructured for Vercel deployment:

### New Files Created:
- **`api/index.js`** - Express app handler for Vercel serverless functions
- **`vercel.json`** - Vercel configuration with routing rules
- **`.env.example`** - Template for environment variables

### Modified Files:
- **`package.json`** - Added backend dependencies (express, mongoose, cors, dotenv)
- **`.env`** - Changed API URL to use relative paths (`/api`) for both local and production

## Deployment Steps

### Step 1: Push to GitHub
Commit and push all changes to your GitHub repository:
```bash
git add .
git commit -m "Configure for Vercel deployment with serverless functions"
git push origin main
```

### Step 2: Configure Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Burgerville project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

```
MONGODB_URI = mongodb+srv://[YOUR_USERNAME]:[YOUR_PASSWORD]@[YOUR_CLUSTER].mongodb.net/burgerville?retryWrites=true&w=majority
NODE_ENV = production
CORS_ORIGIN = https://your-project-name.vercel.app
```

**Important:** Replace `your-project-name` with your actual Vercel project name.

### Step 3: Verify Configuration
- Make sure **Framework** is set to **Vite**
- **Build Command** should be: `npm run build`
- **Output Directory** should be: `dist`
- **Install Command** should be: `npm install && cd backend && npm install && cd ..`

### Step 4: Redeploy
After adding environment variables, trigger a new deployment:
1. Go to **Deployments** tab
2. Click the **⋮** menu on the latest deployment
3. Select **Redeploy**

Or simply push a new commit to trigger automatic deployment.

## Testing Your Deployment

Once deployed, test the endpoints:

```bash
# Test API health
curl https://your-project-name.vercel.app/api/health

# Get menu items
curl https://your-project-name.vercel.app/api/menu

# Create test order
curl -X POST https://your-project-name.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"name": "Classic Burger", "price": 8.99, "quantity": 1}],
    "total": 8.99,
    "customerInfo": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "555-0000",
      "address": "123 Test St"
    }
  }'
```

## How It Works

- **Frontend (React)** is deployed as static files to Vercel CDN
- **Backend (Express)** runs as serverless functions in `/api` folder
- **API calls** use relative paths (`/api/*`) which Vercel automatically routes to the serverless handler
- **Database** is MongoDB Atlas (cloud-hosted, no changes needed)

## Local Development

Your local setup doesn't change! Continue using:
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

The frontend will use relative paths `/api` and proxy to `http://localhost:5001` during development.

## Troubleshooting

### Menu items not loading in production
- Check Vercel environment variables are set correctly
- Verify MONGODB_URI in Vercel dashboard
- Check browser console for error messages
- Test `/api/menu` endpoint directly via curl

### CORS errors
- Ensure CORS_ORIGIN in Vercel matches your actual domain
- Both `http://localhost:5173` (development) and production URLs are allowed

### Database connection timeout
- Verify MongoDB Atlas connection string is correct
- Check MongoDB Atlas IP whitelist allows Vercel IPs (usually allow 0.0.0.0/0)
- Test connection from Vercel CLI: `vercel env pull`

## MongoDB Atlas Whitelist (Important!)

If you see connection timeouts, update your MongoDB Atlas IP whitelist:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Go to **Network Access**
4. Add IP: `0.0.0.0/0` (allows all IPs)
5. Or use Vercel's IP range if more secure

## Next Steps

After successful deployment:
1. Monitor error logs in Vercel dashboard
2. Test the full checkout flow in production
3. Consider adding order tracking page for customers
4. Set up automated backups for MongoDB
