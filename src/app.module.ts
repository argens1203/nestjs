import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './providers/neo4j/core';
import { NodeModule } from './node';
import { Neo4jErrorFilter } from './providers/neo4j/core/neo4j-error.filter';
import { databaseConfig } from './configs/database.config';
import { RelatinoshipModule } from './relationship';
import { DebugModule } from './debug/debug.module';
import { SketchModule } from './modules/sketch/sketch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local.neo4j',
      load: [databaseConfig],
      isGlobal: true,
    }),
    Neo4jModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    NodeModule,
    RelatinoshipModule,
    DebugModule,
    SketchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: Neo4jErrorFilter,
    },
  ],
})
export class AppModule {}
