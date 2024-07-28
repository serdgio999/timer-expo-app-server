import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

import { LogsService } from './logs.service';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../user/user.decorator';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create') // TODO: Seems it makes sense to decompose. One endpoint for updating one for creating.
  @Auth()
  async createOrUpdate(
    @CurrentUser('id') userId: number,
    @Body() logsDto: CreateLogDto
  ) {
    return await this.logsService.createOrUpdate(logsDto, userId);
  }

  @HttpCode(200)
  @Get('statistics')
  @Auth()
  async getLogsStatistics(@CurrentUser('id') userId: number) {
    return await this.logsService.getStatistics(userId);
  }
}
