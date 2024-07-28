import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { PrismaService } from '../prisma.service';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(dto: CreateLogDto, userId: number) {
    const now = DateTime.local();
    const startDate = now.startOf('day').toISO();
    const endDate = now.endOf('day').toISO();

    const where = {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    };

    let log = await this.prisma.logs.findFirst({ where });

    if (log) {
      log = await this.prisma.logs.update({
        where: { id: log.id },
        data: {
          sessionCount: dto.sessionCount
        }
      });
    } else {
      log = await this.prisma.logs.create({
        data: {
          userId,
          sessionCount: dto.sessionCount
        }
      });
    }

    return log;
  }

  async getStatistics(userId: number) {
    return this.prisma.$queryRaw`
        SELECT DATE_TRUNC('month', created_at) as month,
        SUM(sessionCount) as sessionCount from logs
        WHERE userId = ${userId} GROUP BY month
      `;
  }
}
