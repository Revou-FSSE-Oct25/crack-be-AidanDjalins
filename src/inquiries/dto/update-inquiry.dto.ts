import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInquiryDto {
  @ApiPropertyOptional({ example: 'Updated message.' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ example: '2026-06-15' })
  @IsString()
  @IsOptional()
  eventDate?: string;
}
