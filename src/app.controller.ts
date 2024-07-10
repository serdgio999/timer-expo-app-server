import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async getUsers(): Promise<string> {
    return 'Hello!';
  }
}
