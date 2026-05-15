import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Chinoss Downtown' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 40.7128 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -74.006 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ example: '123 Main Street, New York, NY 10001' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'Our flagship location in the heart of the city' })
  @IsString()
  @IsOptional()
  description?: string;
}
