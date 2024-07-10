import { IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsNumber()
  sessionCount: number;
}
