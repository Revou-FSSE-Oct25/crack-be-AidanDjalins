import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findMyTransactions(req: {
        user: {
            id: string;
        };
    }): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                category: string | null;
                isAvailable: boolean;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            transactionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
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
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                category: string | null;
                isAvailable: boolean;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            transactionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.TransactionStatus;
        userId: string;
    }>;
}
