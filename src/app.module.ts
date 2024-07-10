import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserModule } from './user';
import { OptionsModule } from './options';

@Module({
  imports: [UserModule, OptionsModule],
  controllers: [AppController]
  // providers: [PrismaService]
  // controllers: [UserController, OptionsController, LogsController],
  // providers: [UserService, OptionsService, LogsController]
})
export class AppModule {}
