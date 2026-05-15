import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InquiryType } from '@prisma/client';

export class CreateInquiryDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: InquiryType, example: 'QUESTION' })
  @IsEnum(InquiryType)
  @IsNotEmpty()
  type: InquiryType;

  @ApiProperty({ example: 'I would like to know more about your catering services.' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({ example: '2026-06-15' })
  @IsString()
  @IsOptional()
  eventDate?: string;
}
