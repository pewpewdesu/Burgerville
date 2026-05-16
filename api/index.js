import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables (only in local development)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '.env' });
    dotenv.config({ path: '.env.local' });
}

// Import routes
import menuRoutes from '../backend/routes/menuRoutes.js';
import orderRoutes from '../backend/routes/orderRoutes.js';

const app = express();

// Get configuration from environment
const MONGODB_URI = process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Log configuration (for debugging)
if (process.env.NODE_ENV === 'development') {
    console.log('MongoDB URI:', MONGODB_URI ? 'Configured' : 'NOT CONFIGURED');
    console.log('CORS Origin:', CORS_ORIGIN);
}

// Middleware
app.use(cors({
    origin: CORS_ORIGIN === '*' ? '*' : [CORS_ORIGIN, 'http://localhost:3000', 'http://localhost:5173'],
    credentials: CORS_ORIGIN !== '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    if (!MONGODB_URI) {
        const err = new Error('MONGODB_URI environment variable is not set');
        console.error('✗ MongoDB configuration error:', err.message);
        throw err;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        isConnected = true;
        console.log('✓ Connected to MongoDB');
    } catch (err) {
        console.error('✗ MongoDB connection error:', err.message);
        isConnected = false;
        throw err;
    }
};

// Initialize database connection on first request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('Database connection failed for request:', req.path, err.message);
        res.status(503).json({
            success: false,
            message: 'Database connection error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Database unavailable'
        });
    }
});

// Routes
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.path
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
    });
});

export default app;
