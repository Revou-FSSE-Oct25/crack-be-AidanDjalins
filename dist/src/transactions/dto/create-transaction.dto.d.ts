export declare class TransactionItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateTransactionDto {
    userId: string;
    items: TransactionItemDto[];
}
