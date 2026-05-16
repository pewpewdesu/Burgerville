import MenuItem from '../models/MenuItem.js';

// Get all menu items
export const getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items',
            error: error.message
        });
    }
};

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }
        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching menu item',
            error: error.message
        });
    }
};

// Create a new menu item (admin)
export const createMenuItem = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;

        if (!name || !price || !description || !image) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newItem = new MenuItem({
            name,
            price,
            description,
            image,
            category: category || 'other'
        });

        await newItem.save();
        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: newItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating menu item',
            error: error.message
        });
    }
};

// Update a menu item (admin)
export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await MenuItem.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating menu item',
            error: error.message
        });
    }
};

// Delete a menu item (admin)
export const deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting menu item',
            error: error.message
        });
    }
};
