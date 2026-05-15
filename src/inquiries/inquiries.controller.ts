import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard';

@ApiTags('Inquiries')
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an inquiry (public, optionally authenticated)' })
  @ApiResponse({ status: 201, description: 'Inquiry created successfully' })
  async create(
    @Body() createInquiryDto: CreateInquiryDto,
    @Request() req: { user?: { id: string } },
  ) {
    const userId = req.user?.id;
    return this.inquiriesService.create(createInquiryDto, userId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all inquiries for the logged-in user' })
  @ApiResponse({ status: 200, description: 'List of user inquiries returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findMyInquiries(@Request() req: { user: { id: string } }) {
    return this.inquiriesService.findByUser(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an inquiry (owner or admin)' })
  @ApiResponse({ status: 200, description: 'Inquiry updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  async update(
    @Param('id') id: string,
    @Body() updateInquiryDto: UpdateInquiryDto,
    @Request() req: { user: { id: string; role: Role } },
  ) {
    return this.inquiriesService.update(id, updateInquiryDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an inquiry (owner or admin)' })
  @ApiResponse({ status: 200, description: 'Inquiry deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  async remove(
    @Param('id') id: string,
    @Request() req: { user: { id: string; role: Role } },
  ) {
    return this.inquiriesService.remove(id, req.user.id, req.user.role);
  }
}
