"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@chinoss.com' },
        update: {},
        create: {
            email: 'admin@chinoss.com',
            password: adminPassword,
            name: 'Admin User',
            role: client_1.Role.ADMIN,
        },
    });
    console.log('Created admin user:', admin.email);
    const customerPassword = await bcrypt.hash('password123', 10);
    const customers = [];
    const customerData = [
        { email: 'john@example.com', name: 'John Doe' },
        { email: 'jane@example.com', name: 'Jane Smith' },
        { email: 'bob@example.com', name: 'Bob Johnson' },
        { email: 'alice@example.com', name: 'Alice Williams' },
        { email: 'charlie@example.com', name: 'Charlie Brown' },
    ];
    for (const data of customerData) {
        const customer = await prisma.user.upsert({
            where: { email: data.email },
            update: {},
            create: {
                email: data.email,
                password: customerPassword,
                name: data.name,
                role: client_1.Role.CUSTOMER,
            },
        });
        customers.push(customer);
        console.log('Created customer:', customer.email);
    }
    const productsData = [
        { name: 'Espresso', description: 'Rich and bold single shot', price: 30000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a' },
        { name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 45000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d' },
        { name: 'Latte', description: 'Smooth espresso with creamy milk', price: 50000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735' },
        { name: 'Americano', description: 'Espresso with hot water', price: 35000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd' },
        { name: 'Green Tea', description: 'Light and refreshing Japanese green tea', price: 30000, category: 'Tea', imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721' },
        { name: 'Earl Grey', description: 'Classic black tea with bergamot', price: 35000, category: 'Tea', imageUrl: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9' },
        { name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 45000, category: 'Tea', imageUrl: 'https://images.unsplash.com/photo-1578899952107-9c72d1c3f8e1' },
        { name: 'Croissant', description: 'Buttery, flaky French pastry', price: 40000, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a' },
        { name: 'Blueberry Muffin', description: 'Fresh baked with real blueberries', price: 35000, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa' },
        { name: 'Chocolate Brownie', description: 'Rich, fudgy chocolate brownie', price: 40000, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e' },
    ];
    const products = [];
    for (const data of productsData) {
        const product = await prisma.product.create({
            data,
        });
        products.push(product);
        console.log('Created product:', product.name);
    }
    for (let i = 0; i < 5; i++) {
        const customer = customers[i];
        const randomProducts = products.slice(i % 3, (i % 3) + 2);
        let totalAmount = 0;
        const items = randomProducts.map((product, index) => {
            const quantity = index + 1;
            const priceAtPurchase = Number(product.price);
            totalAmount += priceAtPurchase * quantity;
            return {
                productId: product.id,
                quantity,
                priceAtPurchase,
            };
        });
        await prisma.transaction.create({
            data: {
                userId: customer.id,
                totalAmount,
                status: client_1.TransactionStatus.COMPLETED,
                items: {
                    create: items,
                },
            },
        });
        console.log('Created transaction for:', customer.email);
    }
    const locationsData = [
        {
            name: 'Chinoss Downtown',
            latitude: 40.7128,
            longitude: -74.006,
            address: '123 Main Street, New York, NY 10001',
            description: 'Our flagship location in the heart of the city',
        },
        {
            name: 'Chinoss Midtown',
            latitude: 40.7549,
            longitude: -73.984,
            address: '456 Park Avenue, New York, NY 10022',
            description: 'Cozy spot near Central Park',
        },
    ];
    for (const data of locationsData) {
        const location = await prisma.location.create({
            data,
        });
        console.log('Created location:', location.name);
    }
    console.log('Seeding completed!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map