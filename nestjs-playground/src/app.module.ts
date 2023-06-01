import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OuterModule } from './modules/outer-module';
import { ConsumerModule } from './modules/consumer-module';
import { ConfigModule } from './modules/config-module';

@Module({
  imports: [OuterModule.forRootAsync(), ConsumerModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
