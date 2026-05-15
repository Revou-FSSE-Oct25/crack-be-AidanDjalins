import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
export declare class InquiriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInquiryDto: CreateInquiryDto, userId?: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        userId: string | null;
        type: import(".prisma/client").$Enums.InquiryType;
        phone: string;
        message: string;
        eventDate: string | null;
    }>;
    findByUser(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        userId: string | null;
        type: import(".prisma/client").$Enums.InquiryType;
        phone: string;
        message: string;
        eventDate: string | null;
    }[]>;
    update(id: string, updateInquiryDto: UpdateInquiryDto, requesterId: string, requesterRole: Role): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        userId: string | null;
        type: import(".prisma/client").$Enums.InquiryType;
        phone: string;
        message: string;
        eventDate: string | null;
    }>;
    remove(id: string, requesterId: string, requesterRole: Role): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        userId: string | null;
        type: import(".prisma/client").$Enums.InquiryType;
        phone: string;
        message: string;
        eventDate: string | null;
    }>;
}
