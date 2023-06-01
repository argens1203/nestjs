import { DynamicModule, Global, Module } from '@nestjs/common';
import { InnerModule } from '../inner-module';
import { ConfigService } from '../config-module';
import { ConfigModule } from '../config-module';

@Global()
@Module({})
export class OuterModule {
  static forRootAsync(): DynamicModule {
    return {
      module: OuterModule,
      imports: [
        InnerModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            main: configService.getMain(),
          }),
          inject: [ConfigService],
          imports: [ConfigModule],
        }),
      ],
      exports: [InnerModule],
    };
  }
}
