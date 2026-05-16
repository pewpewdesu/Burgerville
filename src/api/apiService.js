const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Menu API calls
export const getMenuItems = async () => {
    try {
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};

export const getMenuItemById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/menu/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch menu item');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
    }
};

// Order API calls
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create order');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getOrderByNumber = async (orderNumber) => {
    try {
        const response = await fetch(`${API_URL}/orders/number/${orderNumber}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/orders/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await fetch(`${API_URL}/orders`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
