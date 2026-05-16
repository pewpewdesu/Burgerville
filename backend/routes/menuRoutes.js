import express from 'express';
import {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuController.js';

const router = express.Router();

// Public routes
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Admin routes (in production, these would require authentication)
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
