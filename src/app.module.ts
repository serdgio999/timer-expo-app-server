import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OptionsModule } from './options/options.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [UserModule, OptionsModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
