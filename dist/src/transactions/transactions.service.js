"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUser(userId) {
        return this.prisma.transaction.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(createTransactionDto) {
        const { userId, items } = createTransactionDto;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const productIds = items.map((item) => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });
        if (products.length !== productIds.length) {
            throw new common_1.NotFoundException('One or more products not found');
        }
        const productMap = new Map(products.map((p) => [p.id, p]));
        let totalAmount = new library_1.Decimal(0);
        const transactionItems = items.map((item) => {
            const product = productMap.get(item.productId);
            const priceAtPurchase = product.price;
            totalAmount = totalAmount.add(priceAtPurchase.mul(item.quantity));
            return {
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase,
            };
        });
        return this.prisma.transaction.create({
            data: {
                userId,
                totalAmount,
                items: {
                    create: transactionItems,
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map