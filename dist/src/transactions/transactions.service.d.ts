import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUser(userId: string): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: Decimal;
                imageUrl: string | null;
                category: string | null;
                isAvailable: boolean;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: Decimal;
            productId: string;
            transactionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        totalAmount: Decimal;
        status: import(".prisma/client").$Enums.TransactionStatus;
        userId: string;
    })[]>;
    create(createTransactionDto: CreateTransactionDto): Promise<{
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: Decimal;
                imageUrl: string | null;
                category: string | null;
                isAvailable: boolean;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: Decimal;
            productId: string;
            transactionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        totalAmount: Decimal;
        status: import(".prisma/client").$Enums.TransactionStatus;
        userId: string;
    }>;
}
