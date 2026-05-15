import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.location.findMany();
  }

  async create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: string) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    await this.prisma.location.delete({ where: { id } });
    return { message: 'Location deleted successfully' };
  }
}
