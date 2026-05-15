import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string) {
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

  async create(createTransactionDto: CreateTransactionDto) {
    const { userId, items } = createTransactionDto;

    // Verify user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Fetch products and calculate total
    const productIds = items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    let totalAmount = new Decimal(0);

    const transactionItems = items.map((item) => {
      const product = productMap.get(item.productId)!;
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
}
