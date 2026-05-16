import express from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    getOrderByNumber,
    updateOrderStatus,
    cancelOrder,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// Customer routes
router.post('/', createOrder);
router.get('/number/:orderNumber', getOrderByNumber);

// Admin routes (in production, these would require authentication)
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);
router.delete('/:id', deleteOrder);

export default router;
