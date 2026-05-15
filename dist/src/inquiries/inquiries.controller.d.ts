import { Role } from '@prisma/client';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
export declare class InquiriesController {
    private readonly inquiriesService;
    constructor(inquiriesService: InquiriesService);
    create(createInquiryDto: CreateInquiryDto, req: {
        user?: {
            id: string;
        };
    }): Promise<{
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
    findMyInquiries(req: {
        user: {
            id: string;
        };
    }): Promise<{
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
    update(id: string, updateInquiryDto: UpdateInquiryDto, req: {
        user: {
            id: string;
            role: Role;
        };
    }): Promise<{
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
    remove(id: string, req: {
        user: {
            id: string;
            role: Role;
        };
    }): Promise<{
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
