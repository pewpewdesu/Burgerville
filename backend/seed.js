import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/burgerville';

const menuItems = [
    {
        name: 'Classic Burger',
        price: 8.99,
        description: 'Juicy flame-grilled beef patty with lettuce, tomato, and our signature sauce.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
        category: 'burger',
        available: true
    },
    {
        name: 'Loaded Fries',
        price: 4.99,
        description: 'Crunchy fries topped with cheese, bacon, and our signature sauce.',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
        category: 'sides',
        available: true
    },
    {
        name: 'Cheese Pizza',
        price: 12.99,
        description: 'Classic pizza with a crispy crust, tangy tomato sauce, and melted mozzarella.',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
        category: 'pizza',
        available: true
    },
    {
        name: 'Crispy Chicken Sandwich',
        price: 9.49,
        description: 'Golden fried chicken with lettuce, tomato, and house sauce.',
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400',
        category: 'sandwich',
        available: true
    },
    {
        name: 'Classic Cola',
        price: 2.49,
        description: 'Refreshing chilled cola served over ice.',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
        category: 'drink',
        available: true
    },
    {
        name: 'Strawberry Smoothie',
        price: 4.99,
        description: 'Creamy smoothie blended with fresh strawberries.',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
        category: 'drink',
        available: true
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✓ Connected to MongoDB');

        // Clear existing menu items
        await MenuItem.deleteMany({});
        console.log('✓ Cleared existing menu items');

        // Insert new menu items
        const result = await MenuItem.insertMany(menuItems);
        console.log(`✓ Seeded ${result.length} menu items successfully`);

        // Display seeded items
        console.log('\n=== Seeded Menu Items ===');
        result.forEach(item => {
            console.log(`- ${item.name} ($${item.price}) - ${item.category}`);
        });

        await mongoose.connection.close();
        console.log('\n✓ Database seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('✗ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
