import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(createInquiryDto: CreateInquiryDto, userId?: string) {
    return this.prisma.inquiry.create({
      data: {
        ...createInquiryDto,
        userId: userId || null,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.inquiry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    id: string,
    updateInquiryDto: UpdateInquiryDto,
    requesterId: string,
    requesterRole: Role,
  ) {
    const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    if (requesterRole !== Role.ADMIN && inquiry.userId !== requesterId) {
      throw new ForbiddenException();
    }
    return this.prisma.inquiry.update({ where: { id }, data: updateInquiryDto });
  }

  async remove(id: string, requesterId: string, requesterRole: Role) {
    const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    if (requesterRole !== Role.ADMIN && inquiry.userId !== requesterId) {
      throw new ForbiddenException();
    }
    return this.prisma.inquiry.delete({ where: { id } });
  }
}
