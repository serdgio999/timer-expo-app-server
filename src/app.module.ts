import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user';
import { OptionsModule } from './options';
import { LogsModule } from './logs';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    OptionsModule,
    LogsModule,
    AuthModule
  ],
  controllers: [AppController]
  // providers: [PrismaService]
  // controllers: [UserController, OptionsController, LogsController],
  // providers: [UserService, OptionsService, LogsController]
})
export class AppModule {}
