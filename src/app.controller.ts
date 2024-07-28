import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async get(): Promise<string> {
    return 'Hello!';
  }
}
