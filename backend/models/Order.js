import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        items: [
            {
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        total: {
            type: Number,
            required: true,
            min: 0
        },
        customerInfo: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
            default: 'pending'
        },
        orderNumber: {
            type: String,
            unique: true,
            required: true
        }
    },
    { timestamps: true }
);

// Auto-generate order number before saving
orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
    }
    next();
});

export default mongoose.model('Order', orderSchema);
