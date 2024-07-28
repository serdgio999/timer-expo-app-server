import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../user/user.decorator';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @Auth()
  async create(
    @CurrentUser() userId: number,
    @Body() createOptionDto: CreateOptionDto
  ) {
    return await this.optionsService.create(userId, createOptionDto);
  }

  @Get(':id')
  @Auth()
  async getOne(@Param('id') id: number, @CurrentUser() userId: number) {
    return await this.optionsService.findOne(id, userId);
  }

  @Patch() // TODO: Think about parameter.
  @Auth()
  async update(
    @CurrentUser('id') userId: number,
    @Body() updateOptionDto: UpdateOptionDto
  ) {
    return await this.optionsService.update(userId, updateOptionDto);
  }
}
