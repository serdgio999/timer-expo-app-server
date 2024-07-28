import { Injectable } from '@nestjs/common';
import { Options } from '@prisma/client';

import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createOptionDto: CreateOptionDto): Promise<Options> {
    return this.prisma.options.create({
      data: {
        userId,
        ...createOptionDto
      }
    });
  }

  async findOne(id: number, userId: number): Promise<Options> {
    return this.prisma.options.findFirst({
      where: { id, userId }
    });
  }

  async update(
    userId: number,
    updateOptionDto: UpdateOptionDto
  ): Promise<Options> {
    const updateQuery: UpdateOptionDto = {};

    if (updateOptionDto.sessionCount) {
      updateQuery.sessionCount = updateOptionDto.sessionCount;
    }

    if (updateOptionDto.breakDuration) {
      updateQuery.breakDuration = updateOptionDto.breakDuration;
    }

    if (updateOptionDto.flowDuration) {
      updateQuery.flowDuration = updateOptionDto.flowDuration;
    }

    return this.prisma.options.update({
      where: { userId },
      data: updateQuery
    });
  }
}
