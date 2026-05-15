import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string | null;
        isAvailable: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string | null;
        isAvailable: boolean;
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string | null;
        isAvailable: boolean;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string | null;
        isAvailable: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
