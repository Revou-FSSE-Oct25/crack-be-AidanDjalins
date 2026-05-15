import { InquiryType } from '@prisma/client';
export declare class CreateInquiryDto {
    name: string;
    email: string;
    phone: string;
    type: InquiryType;
    message: string;
    eventDate?: string;
}
