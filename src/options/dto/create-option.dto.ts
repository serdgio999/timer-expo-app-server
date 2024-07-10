import { IsNumber } from 'class-validator';

export class CreateOptionDto {
  @IsNumber()
  flowDuration: number;

  @IsNumber()
  breakDuration: number;

  @IsNumber()
  sessionCount: number;
}
